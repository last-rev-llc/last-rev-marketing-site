/**
 * vercel.js
 *
 * This module contains all Vercel-specific operations for reading and updating
 * environment variables. It provides the following functions:
 *
 *   readVars(project, token) -> { found: {}, missing: [], excluded: [] }
 *   updateVars(project, token, vars) -> { updated: {} }
 *
 * The code interacts with Vercel via the CLI commands "vercel env ls --json" and
 * "vercel env add".
 */

const util = require('util');
const { exec } = require('child_process');
const execPromise = util.promisify(exec);
const {
  log,
  handleError,
  determineEnvironmentMapping,
  loadEnvironmentVariables,
  validateDeployment
} = require('./utils');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Cache for Vercel project IDs and environment variables
const vercelEnvCache = new Map();

/**
 * Helper function to retrieve a properly formatted Vercel token
 */
function getVercelToken(token) {
  // First try token parameter
  if (token) {
    log('debug', 'Using provided token parameter');
    return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }

  // Then try VERCEL_AUTH_TOKEN (new)
  const authToken = process.env.VERCEL_AUTH_TOKEN;
  if (authToken) {
    log('debug', 'Using VERCEL_AUTH_TOKEN from environment');
    return authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;
  }

  // Finally try VERCEL_TOKEN (legacy)
  const envToken = process.env.VERCEL_TOKEN;
  if (!envToken) {
    throw new Error(
      'No Vercel token found. Set VERCEL_AUTH_TOKEN env variable or provide token parameter.'
    );
  }

  log('debug', 'Using VERCEL_TOKEN from environment');
  return envToken.startsWith('Bearer ') ? envToken : `Bearer ${envToken}`;
}

/**
 * Attempts to read project details from .vercel/project.json
 * @returns {Promise<{projectId: string, orgId: string, projectName: string} | null>}
 */
async function getVercelProjectConfig() {
  try {
    const projectJsonPath = path.join(process.cwd(), '.vercel', 'project.json');
    const configStr = await fs.promises.readFile(projectJsonPath, 'utf8');
    const config = JSON.parse(configStr);

    log('debug', `Found Vercel project config: ${JSON.stringify(config)}`);
    return {
      projectId: config.projectId,
      orgId: config.orgId, // This is the team ID
      projectName: config.name || null
    };
  } catch (error) {
    log('debug', 'No .vercel/project.json found, will try to fetch project details from API');
    return null;
  }
}

/**
 * Helper to fetch the project from Vercel by project name.
 */
async function getProjectIdFromName(project, token) {
  const vercelToken = getVercelToken(token);
  const teamSlug = process.env.VERCEL_TEAM_SLUG || 'cameron-last-revs-projects';

  try {
    // First try to get team ID
    let teamId = null;
    try {
      const teamsResp = await axios.get('https://api.vercel.com/v2/teams', {
        headers: { Authorization: vercelToken }
      });
      const team = teamsResp.data.teams?.find((t) => t.slug === teamSlug);
      if (team) {
        teamId = team.id;
        log('debug', `Found team ID ${teamId} for slug ${teamSlug}`);
      }
    } catch (error) {
      log('debug', `Error getting teams: ${error.message}`);
      if (error.response?.data) {
        log('debug', `Teams API response: ${JSON.stringify(error.response.data)}`);
      }
    }

    // Try to get projects (with teamId if we found one)
    const projectsUrl = 'https://api.vercel.com/v9/projects';
    const config = {
      headers: { Authorization: vercelToken },
      ...(teamId ? { params: { teamId } } : {})
    };

    const projectsResp = await axios.get(projectsUrl, config);
    const projects = projectsResp.data.projects || [];

    log('debug', `Found ${projects.length} projects: ${projects.map((p) => p.name).join(', ')}`);

    const matched = projects.find((p) => p.name === project.projectName);
    if (matched) {
      log('debug', `Found project ${project.projectName} with ID ${matched.id}`);
      vercelEnvCache.set(project.projectName, {
        projectId: matched.id,
        teamId,
        teamSlug,
        vars: {}
      });
      return matched.id;
    }

    throw new Error(`Project ${project.projectName} not found`);
  } catch (error) {
    const msg = error.response?.data?.error?.message || error.message;
    throw new Error(`Failed to get project ID: ${msg}`);
  }
}

/**
 * Retrieve current environment variables from the Vercel API
 */
async function getCurrentVercelEnvVars(projectId, token) {
  const vercelToken = getVercelToken(token);
  const cached = vercelEnvCache.get(projectId);
  const teamId = cached?.teamId;

  try {
    const url = `https://api.vercel.com/v9/projects/${projectId}/env`;
    const config = {
      headers: { Authorization: vercelToken },
      ...(teamId ? { params: { teamId } } : {})
    };

    const resp = await axios.get(url, config);
    const envs = resp.data.envs || [];
    log('debug', `Fetched ${envs.length} environment variables`);

    const envVars = {};
    envs.forEach((entry) => {
      envVars[entry.key] = entry.value || '';
    });

    return envVars;
  } catch (error) {
    const msg = error.response?.data?.error?.message || error.message;
    throw new Error(`Failed to fetch environment vars: ${msg}`);
  }
}

/**
 * Encrypt a value using a project-specific key
 */
function encryptValue(value, projectId) {
  const keyBase = `${projectId}_bws_secure_salt`;
  const key = crypto.createHash('sha256').update(keyBase).digest();
  const nonce = crypto.randomBytes(12); // 12 bytes is optimal for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, nonce);
  let encrypted = cipher.update(value, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const authTag = cipher.getAuthTag();
  return `BWS_ENC_${nonce.toString('base64')}:${authTag.toString('base64')}:${encrypted}`;
}

/**
 * Read environment variables for a Vercel project
 */
async function readVars(project, token) {
  const result = {
    found: {},
    missing: [],
    excluded: project.exclusions || []
  };

  try {
    const projectId = await getProjectIdFromName(project, token);
    if (!projectId) {
      throw new Error(`Could not resolve projectId for ${project.projectName}`);
    }

    const platformVars = await getCurrentVercelEnvVars(projectId, token);
    Object.entries(platformVars).forEach(([key, value]) => {
      result.found[key] = value;
    });
  } catch (error) {
    log('warn', `Failed to fetch Vercel environment: ${error.message}`);
  }

  return result;
}

/**
 * Delete an environment variable from Vercel
 */
async function deleteVercelEnvVar(projectId, envId, token) {
  const vercelToken = getVercelToken(token);
  const cached = vercelEnvCache.get(projectId);
  const teamId = cached?.teamId;

  try {
    const url = `https://api.vercel.com/v9/projects/${projectId}/env/${envId}`;
    const config = {
      headers: { Authorization: vercelToken },
      ...(teamId ? { params: { teamId } } : {})
    };

    await axios.delete(url, config);
    log('debug', `Deleted env var ${envId}`);
  } catch (error) {
    if (error.response?.status === 404) return;
    const msg = error.response?.data?.error?.message || error.message;
    throw new Error(`Failed to delete env var ${envId}: ${msg}`);
  }
}

/**
 * Finds the environment variable (by key) from the /v9/projects/:id/env response array
 * so we can update or remove it. Returns the entire object if found, or null if not.
 */
function findVercelEnvByKey(envsArray, key) {
  return envsArray.find((item) => item.key === key) || null;
}

/**
 * Create a shared environment variable at the team level
 */
async function createSharedSecret(key, value, token, teamId) {
  const vercelToken = getVercelToken(token);

  try {
    const url = 'https://api.vercel.com/v2/env';
    const payload = {
      key,
      value,
      type: 'secret',
      teamId
    };

    const config = {
      headers: {
        'Authorization': vercelToken,
        'Content-Type': 'application/json'
      }
    };

    await axios.post(url, payload, config);
    log('debug', `Created shared secret ${key}`);
    return true;
  } catch (error) {
    const msg = error.response?.data?.error?.message || error.message;
    throw new Error(`Failed to create shared secret: ${msg}`);
  }
}

/**
 * Create a new environment variable in Vercel
 */
async function createVercelEnvVar(projectId, key, value, token, target) {
  const vercelToken = getVercelToken(token);
  const cached = vercelEnvCache.get(projectId);
  const teamId = cached?.teamId;

  try {
    const url = `https://api.vercel.com/v9/projects/${projectId}/env`;
    const payload = {
      key,
      value,
      target: target,
      type: 'encrypted',
      gitBranch: null,
      sensitive: true,
      hashedValue: crypto.createHash('sha256').update(value).digest('hex')
    };

    const config = {
      headers: {
        'Authorization': vercelToken,
        'Content-Type': 'application/json'
      },
      ...(teamId ? { params: { teamId } } : {})
    };

    await axios.post(url, payload, config);
    log('debug', `Created sensitive env var ${key}`);
  } catch (error) {
    const msg = error.response?.data?.error?.message || error.message;
    throw new Error(`Failed to create env var ${key}: ${msg}`);
  }
}

/**
 * Helper function to decrypt a value at runtime
 * This should be used in your application code
 */
function decryptEnvVar(encryptedValue, projectId) {
  if (!encryptedValue.startsWith('BWS_ENC_')) {
    return encryptedValue;
  }
  try {
    const [nonceBase64, authTagBase64, encrypted] = encryptedValue
      .replace('BWS_ENC_', '')
      .split(':');
    const nonce = Buffer.from(nonceBase64, 'base64');
    const authTag = Buffer.from(authTagBase64, 'base64');
    const keyBase = `${projectId}_bws_secure_salt`;
    const key = crypto.createHash('sha256').update(keyBase).digest();
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, nonce);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    log('error', `Failed to decrypt value: ${error.message}`);
    return encryptedValue;
  }
}

/**
 * Update environment variables for a Vercel project
 */
async function updateVars(project, token, vars, target) {
  const updated = {};

  try {
    const projectId = await getProjectIdFromName(project, token);
    if (!projectId) {
      throw new Error(`Could not resolve projectId for ${project.projectName}`);
    }

    const vercelToken = getVercelToken(token);

    // Get current env vars
    const url = `https://api.vercel.com/v9/projects/${projectId}/env`;
    const cached = vercelEnvCache.get(projectId);
    const teamId = cached?.teamId;
    const config = {
      headers: { Authorization: vercelToken },
      ...(teamId ? { params: { teamId } } : {})
    };

    const resp = await axios.get(url, config);
    const existingEnvs = resp.data.envs || [];

    log('debug', `Setting variables for ${target.join(', ')} environment(s)`);

    // Delete existing vars unless excluded/preserved
    for (const { key, id, target: envTarget } of existingEnvs) {
      // Skip if excluded/preserved
      if (project.exclusions?.includes(key) || project.preserveVars?.includes(key)) {
        log('debug', `Skipping ${key} (excluded/preserved)`);
        continue;
      }

      // Only delete if the variable is for our current target environment(s)
      const shouldDelete = envTarget.some((t) => target.includes(t));
      if (shouldDelete) {
        await deleteVercelEnvVar(projectId, id, vercelToken);
        log('debug', `Deleted ${key} from ${envTarget.join(', ')}`);
      }
    }

    // Create new vars
    for (const [key, value] of Object.entries(vars)) {
      if (project.exclusions?.includes(key)) {
        log('debug', `Skipping excluded var ${key}`);
        continue;
      }
      if (project.preserveVars?.includes(key)) {
        log('debug', `Skipping preserved var ${key}`);
        continue;
      }

      try {
        await createVercelEnvVar(projectId, key, value, vercelToken, target);
        log('debug', `Created ${key} for ${target.join(', ')}`);
        updated[key] = value;
      } catch (error) {
        log('error', `Failed to create ${key}: ${error.message}`);
      }
    }

    return { updated };
  } catch (error) {
    const msg = error.response?.data?.error?.message || error.message;
    throw new Error(`Failed to update environment variables: ${msg}`);
  }
}

async function updateVercelEnvVars(project) {
  const validation = validateDeployment(project);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  try {
    // Load ALL variables into process.env first
    const prodVars = loadEnvironmentVariables('.env.secure.prod', process.env.BWS_EPHEMERAL_KEY);
    const devVars = loadEnvironmentVariables('.env.secure.dev', process.env.BWS_EPHEMERAL_KEY);

    // After loading all vars
    log(
      'debug',
      `Loaded ${Object.keys(prodVars || {}).length} total production variables into process.env`
    );
    log(
      'debug',
      `Loaded ${Object.keys(devVars || {}).length} total development variables into process.env`
    );

    // Now load required vars from requiredVars.env
    const requiredVarsPath = path.join(__dirname, '..', 'requiredVars.env');
    const requiredVarsContent = await fs.promises.readFile(requiredVarsPath, 'utf8');

    // Parse required vars (excluding comments and empty lines)
    const requiredVars = new Set(
      requiredVarsContent
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('#'))
        .map((line) => line.trim())
    );

    // Filter vars to only include required ones for Vercel upload
    const filteredProdVars = Object.fromEntries(
      Object.entries(prodVars || {}).filter(([key]) => requiredVars.has(key))
    );
    const filteredDevVars = Object.fromEntries(
      Object.entries(devVars || {}).filter(([key]) => requiredVars.has(key))
    );

    // After filtering
    log(
      'debug',
      `Filtered to ${
        Object.keys(filteredProdVars).length
      } required production variables for Vercel upload`
    );
    log(
      'debug',
      `Filtered to ${
        Object.keys(filteredDevVars).length
      } required development variables for Vercel upload`
    );

    // Add BWS_PROJECT and BWS_ENV to the filtered vars
    filteredProdVars.BWS_PROJECT = project.projectName;
    filteredProdVars.BWS_ENV = 'prod';
    filteredDevVars.BWS_PROJECT = project.projectName;
    filteredDevVars.BWS_ENV = 'dev';

    // Update Vercel project
    const projectId = project.projectId || (await getProjectIdFromName(project));
    if (!projectId) {
      throw new Error('Could not determine Vercel project ID');
    }

    // First, get all current variables to delete
    const vercelToken = getVercelToken(null);
    const url = `https://api.vercel.com/v9/projects/${projectId}/env`;
    const cached = vercelEnvCache.get(projectId);
    const teamId = cached?.teamId;
    const config = {
      headers: { Authorization: vercelToken },
      ...(teamId ? { params: { teamId } } : {})
    };

    const resp = await axios.get(url, config);
    const existingEnvs = resp.data.envs || [];

    // Delete all existing variables (except excluded/preserved)
    for (const { key, id } of existingEnvs) {
      if (project.exclusions?.includes(key) || project.preserveVars?.includes(key)) {
        log('debug', `Skipping ${key} (excluded/preserved)`);
        continue;
      }
      await deleteVercelEnvVar(projectId, id, vercelToken);
      log('debug', `Deleted ${key}`);
    }

    // Create production variables
    if (filteredProdVars) {
      log('info', 'Creating production environment variables...');
      await updateVars(project, null, filteredProdVars, ['production']);
    }

    // Create preview variables (not development)
    if (filteredDevVars) {
      log('info', 'Creating preview environment variables...');
      await updateVars(project, null, filteredDevVars, ['preview']);
    }

    // Replace the success log with a boxed version
    console.log('\x1b[32m╔════════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                    ║');
    console.log('║                Successfully updated Vercel project                 ║');
    console.log(`║                      ${project.projectName.padEnd(46)}║`);
    console.log('║                                                                    ║');
    console.log('╚════════════════════════════════════════════════════════════════════╝\x1b[0m');
  } catch (error) {
    log('error', `Failed to update Vercel project ${project.projectName}: ${error.message}`);
    throw error;
  }
}

module.exports = {
  readVars,
  updateVars,
  getProjectIdFromName,
  getCurrentVercelEnvVars,
  deleteVercelEnvVar,
  decryptEnvVar,
  updateVercelEnvVars
};
