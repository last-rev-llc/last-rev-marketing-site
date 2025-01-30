/**
 * netlify.js
 *
 * This module contains all Netlify-specific operations for reading and updating
 * environment variables. We do a single multi-context update for each variable key:
 *
 *   - If a key has a production value from .env.secure.prod, that goes to context: "production"
 *   - If a key has a dev value from .env.secure.dev, that goes to contexts: "branch-deploy" & "deploy-preview"
 *   - We only delete old Netlify variables that are not in requiredVars and not excluded/preserved.
 */

const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const {
  log,
  handleError,
  getBuildOrAuthToken,
  loadEnvironmentVariables,
  validateDeployment
} = require('./utils');

// Local in-memory cache for Netlify environment variables
const netlifyEnvCache = new Map();

/**
 * Main function to update Netlify environment variables
 */
async function updateNetlifyEnvVars(project) {
  // Validate
  const validation = validateDeployment(project);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  try {
    // 1) Load .env.secure.prod
    const prodVarsAll =
      loadEnvironmentVariables('.env.secure.prod', process.env.BWS_EPHEMERAL_KEY) || {};

    // 2) Load .env.secure.dev
    const devVarsAll =
      loadEnvironmentVariables('.env.secure.dev', process.env.BWS_EPHEMERAL_KEY) || {};

    log(
      'debug',
      `Loaded ${Object.keys(prodVarsAll).length} prod vars, ${
        Object.keys(devVarsAll).length
      } dev vars`
    );

    // 3) Load requiredVars
    const requiredVarsPath = path.join(__dirname, '..', 'requiredVars.env');
    const requiredVarsContent = await fs.promises.readFile(requiredVarsPath, 'utf8');
    const requiredVars = new Set(
      requiredVarsContent
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('#'))
        .map((line) => line.trim())
    );

    // Ensure BWS_PROJECT and BWS_ENV are always included
    requiredVars.add('BWS_PROJECT');
    requiredVars.add('BWS_ENV');

    // 4) Gather all unique keys
    const allKeys = new Set([
      ...Object.keys(prodVarsAll),
      ...Object.keys(devVarsAll),
      'BWS_PROJECT',
      'BWS_ENV'
    ]);

    // 5) Netlify site + token + existing envs
    const netlifyToken = getBuildOrAuthToken();
    const site = await getSiteIdFromSlug(project.projectName, netlifyToken);
    if (!site) {
      throw new Error('Could not determine Netlify site ID');
    }

    const existingKeys = await getCurrentNetlifyEnvVars(site, netlifyToken);

    // 6) Delete old Netlify vars that were removed from BWS (but are not preserved/excluded)
    for (const existingKey of existingKeys) {
      // Always keep BWS_ACCESS_TOKEN or anything listed in preserveVars/exclusions
      const isPreserved = project.preserveVars?.includes(existingKey);
      const isExcluded = project.exclusions?.includes(existingKey);
      if (existingKey === 'BWS_ACCESS_TOKEN' || isPreserved || isExcluded) {
        log('debug', `Skipping deletion of ${existingKey}`);
        continue;
      }

      // Otherwise, delete it
      await deleteNetlifyEnvVar(site, netlifyToken, existingKey);
      log('debug', `Deleted ${existingKey} (cleanup unneeded var)`);
    }

    // 7) For each key in allKeys => if required & not excluded => do one multi-context update
    for (const key of allKeys) {
      // skip if not required
      if (!requiredVars.has(key)) {
        continue;
      }

      // skip if excluded/preserved
      if (project.exclusions?.includes(key) || project.preserveVars?.includes(key)) {
        log('debug', `Skipping ${key} (excluded/preserved)`);
        continue;
      }

      // Assign values for BWS_PROJECT and BWS_ENV
      let prodVal = prodVarsAll[key];
      let devVal = devVarsAll[key];

      if (key === 'BWS_PROJECT') {
        prodVal = project.projectName;
        devVal = project.projectName; // Ensure both contexts get the same project name
      }

      if (key === 'BWS_ENV') {
        prodVal = 'prod';
        devVal = 'dev'; // Explicitly set to 'dev' for deploy-preview and branch-deploy
      }

      // If both are missing => skip
      if (prodVal === undefined && devVal === undefined) {
        log('debug', `Key=${key} has no prod or dev value, skipping.`);
        continue;
      }

      // Ensure BWS_ENV and BWS_PROJECT are always updated correctly
      if (key === 'BWS_ENV' || key === 'BWS_PROJECT') {
        log('debug', `Ensuring ${key} is correctly set: prod=${prodVal}, dev=${devVal}`);
      }

      // We'll build an array of contexts
      // If we have prodVal => push { context: 'production', value: prodVal }
      // If we have devVal => push { context: 'branch-deploy', value: devVal } etc.
      const allContexts = [];
      if (prodVal !== undefined) {
        allContexts.push({ context: 'production', value: prodVal });
      }

      // For dev contexts, check custom bwsProjectIds?
      let devContexts = ['deploy-preview', 'branch-deploy'];

      if (project.bwsProjectIds?.deploy_preview || project.bwsProjectIds?.branch_deploy) {
        devContexts = [];
        if (project.bwsProjectIds.deploy_preview) {
          devContexts.push('deploy-preview');
        }
        if (project.bwsProjectIds.branch_deploy) {
          devContexts.push('branch-deploy');
        }
        if (!devContexts.length) {
          devContexts.push('deploy-preview', 'branch-deploy');
        }
      }

      if (devVal !== undefined) {
        for (const c of devContexts) {
          allContexts.push({ context: c, value: devVal });
        }
      }

      // Now do a single PUT or POST
      await updateSingleKey(
        site,
        netlifyToken,
        key,
        allContexts,
        project.exclusions,
        project.preserveVars
      );
    }

    // done
    console.log('\x1b[32m╔════════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                    ║');
    console.log('║               Successfully updated Netlify project                 ║');
    console.log(`║                      ${project.projectName.padEnd(46)}║`);
    console.log('║                                                                    ║');
    console.log('╚════════════════════════════════════════════════════════════════════╝\x1b[0m');
  } catch (error) {
    log('error', `Failed to update Netlify site ${project.projectName}: ${error.message}`);
    throw error;
  }
}

/**
 * updateSingleKey => does a single PUT or POST with an array of {context, value} for a given key
 */
async function updateSingleKey(
  site,
  netlifyToken,
  key,
  contextsArray,
  exclusions = [],
  preserves = []
) {
  try {
    // If the var exists => PUT, else => POST
    const url = `https://api.netlify.com/api/v1/accounts/${site.account_id}/env/${key}`;

    // check if exists
    let varExists = false;
    try {
      const existing = await axios.get(url, {
        headers: { Authorization: netlifyToken },
        params: { site_id: site.id }
      });
      if (existing.data) {
        varExists = true;
      }
    } catch (err) {
      if (err.response?.status === 404) {
        varExists = false;
      } else {
        throw err;
      }
    }

    // Make BWS_ENV and BWS_PROJECT non-secret
    const isSecret = !(key === 'BWS_ENV' || key === 'BWS_PROJECT');

    if (!varExists) {
      // POST
      await axios.post(
        `https://api.netlify.com/api/v1/accounts/${site.account_id}/env`,
        [
          {
            key,
            scopes: ['builds', 'functions', 'runtime'],
            values: contextsArray,
            is_secret: false
          }
        ],
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': netlifyToken
          },
          params: { site_id: site.id }
        }
      );
      log('debug', `Created new var ${key} with contexts: ${contextsArray.length}`);
    } else {
      // PUT
      await axios.put(
        url,
        {
          key,
          scopes: ['builds', 'functions', 'runtime'],
          values: contextsArray,
          is_secret: false
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': netlifyToken
          },
          params: { site_id: site.id }
        }
      );
      log('debug', `Updated existing var ${key} with contexts: ${contextsArray.length}`);
    }
  } catch (error) {
    log('error', `Failed to update single key=${key}: ${error.message}`);
    if (error.response?.data) {
      log('debug', `API Error Details: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

/**
 * Fetches the Netlify site info
 */
async function getSiteIdFromSlug(projectName, token) {
  try {
    const response = await axios.get('https://api.netlify.com/api/v1/sites', {
      headers: { Authorization: token }
    });

    const site = response.data.find((s) => s.name === projectName || s.url.includes(projectName));
    if (!site) {
      throw new Error(`Site not found with name: ${projectName}`);
    }

    return site;
  } catch (error) {
    throw new Error(`Failed to get Netlify site ID: ${error.message}`);
  }
}

/**
 * Returns a list of existing env variable keys
 */
async function getCurrentNetlifyEnvVars(site, token) {
  try {
    const url = `https://api.netlify.com/api/v1/accounts/${site.account_id}/env`;
    const response = await axios.get(url, {
      headers: { Authorization: token },
      params: { site_id: site.id }
    });

    if (!Array.isArray(response.data)) {
      return [];
    }
    const existingKeys = response.data.map((envVar) => envVar.key);
    return existingKeys;
  } catch (error) {
    if (error.response?.status === 404) {
      log('warn', `404 fetching env for site ${site.id}, returning []`);
      return [];
    }
    throw new Error(`Failed to fetch Netlify environment variables: ${error.message}`);
  }
}

/**
 * Deletes an environment variable from Netlify
 */
async function deleteNetlifyEnvVar(site, token, key) {
  try {
    const url = `https://api.netlify.com/api/v1/accounts/${site.account_id}/env/${key}`;
    const config = {
      headers: { Authorization: token },
      params: { site_id: site.id }
    };

    try {
      await axios.get(url, config);
    } catch (error) {
      if (error.response?.status === 404) {
        log('debug', `Variable ${key} not found, skipping delete`);
        return;
      }
      throw error;
    }

    await axios.delete(url, config);
    log('debug', `Deleted Netlify env var: ${key}`);
  } catch (error) {
    if (error.response?.status === 404) {
      return;
    }
    throw new Error(`Failed to delete Netlify env var ${key}: ${error.message}`);
  }
}

/**
 * Stub readVars
 */
async function readVars(project, token) {
  const result = {
    found: {},
    missing: [],
    excluded: []
  };

  // Not heavily used
  return result;
}

module.exports = {
  updateNetlifyEnvVars,
  readVars
};
