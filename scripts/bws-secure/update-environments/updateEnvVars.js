#!/usr/bin/env node

/**
 * updateEnvVars.js
 *
 * Entry point for the environment variable update script. This file:
 * 1. Parses CLI arguments.
 * 2. Loads configuration from bwsconfig.json.
 * 3. Reads required environment variables from requiredVars.env.
 * 4. Delegates tasks to Netlify and Vercel modules for reading/updating variables.
 * 5. Logs and summarizes the results.
 *
 * Usage:
 *   node updateEnvVars.js --platform netlify
 *   node updateEnvVars.js --platform vercel
 *   node updateEnvVars.js --help
 *
 * @module main
 */

const path = require('path');
const fs = require('fs'); // Regular fs for sync operations
const fsPromises = require('fs').promises; // For async operations
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const dotenv = require('dotenv');
require('dotenv').config();

const {
  log,
  handleError,
  readEnvFile,
  validateValue,
  shouldPreserveVar,
  getBuildOrAuthToken,
  validatePlatform,
  decryptContent
} = require('./utils');
const {
  readVars: readNetlifyVars,
  updateVars: updateNetlifyVars,
  getSiteIdFromSlug,
  getCurrentNetlifyEnvVars,
  testNetlifyEnvVars,
  updateNetlifyEnvVars
} = require('./netlify');
const {
  readVars: readVercelVars,
  updateVars: updateVercelVars,
  updateVercelEnvVars,
  determineVercelEnvironment
} = require('./vercel.js');

function isRunningOnPlatform() {
  const isPlatform = process.env.VERCEL === '1' || process.env.NETLIFY === 'true';
  log(
    'debug',
    `Platform check: VERCEL=${process.env.VERCEL}, NETLIFY=${process.env.NETLIFY}, isPlatform=${isPlatform}`
  );
  return isPlatform;
}

/**
 * Reads the bwsconfig.json file (shared by both Netlify and Vercel operations)
 * @returns {Object} config object containing array of projects
 */
async function readConfigFile() {
  try {
    // bwsconfig.json is expected to be located one level up, e.g.: scripts/bws-secure/bwsconfig.json
    const configPath = path.join(__dirname, '../../../bwsconfig.json');
    const data = await fsPromises.readFile(configPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    handleError(error, 'Failed to read configuration file');
  }
}

/**
 * Gathers environment variables by reading both local env files and
 * platform variables depending on project settings.
 *
 * @param {string[]} requiredVars - List of required variables from requiredVars.env
 * @param {Object[]} projects - Array of project configs (from bwsconfig.json)
 * @returns {Object} An object containing a mapping of found: {}, missing: [], excluded: []
 */
async function gatherAllVars(requiredVars, projects) {
  const found = {};
  const missing = [];
  const excluded = [];

  // Skip local environment variables when running on a platform
  const isPlatform = process.env.VERCEL === '1' || process.env.NETLIFY === 'true';

  for (const varLine of requiredVars) {
    const varCandidate = varLine.trim();
    if (!varCandidate || varCandidate.startsWith('#')) {
      continue;
    }

    // Only check local environment if not running on a platform
    if (!isPlatform && process.env[varCandidate]) {
      log('debug', `Found locally: ${varCandidate} (local development only)`);
      found[varCandidate] = process.env[varCandidate];
    } else {
      missing.push(varCandidate);
    }
  }

  // For each platform (netlify or vercel), read environment variables and see if we can fill in the missing pieces
  for (const project of projects) {
    const platform = project.platform.toLowerCase();
    let platformVars = null;

    try {
      // Decide which readVars function to call
      if (platform === 'netlify') {
        platformVars = await readNetlifyVars(project);
      } else if (platform === 'vercel') {
        platformVars = await readVercelVars(project);
      } else {
        log('warn', `Unknown platform: ${platform}`);
        continue;
      }

      // The readVars function returns an object like:
      // { found: { VAR1: '', VAR2: '' }, missing: [], excluded: [] }
      // We'll use it to fill in found vars if they are still missing
      if (platformVars && platformVars.found) {
        for (const [key, val] of Object.entries(platformVars.found)) {
          // Only fill in if we previously didn't have a local value
          if (!found[key] && !excluded.includes(key)) {
            found[key] = val;
            // If key was in missing, remove it
            const mIndex = missing.indexOf(key);
            if (mIndex >= 0) {
              missing.splice(mIndex, 1);
            }
          }
        }
      }

      // Combine excluded variables for logging
      if (platformVars && platformVars.excluded) {
        for (const exVar of platformVars.excluded) {
          if (!excluded.includes(exVar)) {
            excluded.push(exVar);
          }
        }
      }
    } catch (err) {
      log('warn', `Failed reading environment for project (${project.platform}): ${err.message}`);
    }
  }

  return { found, missing, excluded };
}

/**
 * For each project in bwsconfig.json, attempts to update the remote platform with relevant environment variables.
 *
 * @param {Object[]} projects - Array of project configs
 * @param {Object} baseVars - Object of all environment variables that we have found so far
 */
async function updateProjects(projects, baseVars) {
  for (const project of projects) {
    const platform = project.platform.toLowerCase();
    const varsToUpdate = {};

    // netlify or vercel
    // Filter out excluded and preserved variables for that project
    for (const [varName, value] of Object.entries(baseVars)) {
      // Exclusion
      if (project.exclusions && project.exclusions.includes(varName)) {
        log(
          'debug',
          `Excluding var ${varName} for project ${project.siteSlug || project.projectName}`
        );
        continue;
      }

      // Preservation
      if (shouldPreserveVar(varName, project)) {
        log(
          'debug',
          `Preserving var ${varName} for project ${project.siteSlug || project.projectName}`
        );
        continue;
      }

      // Validate value correctness
      const check = validateValue(varName, value);
      if (!check.isValid) {
        log('warn', `Skipping update for var ${varName} due to invalid format (${check.error})`);
        continue;
      }

      // Passed all checks, queue for update
      varsToUpdate[varName] = check.value;
    }

    // If no vars to update, skip
    if (Object.keys(varsToUpdate).length === 0) {
      log(
        'info',
        `No environment variables to update for project: ${project.siteSlug || project.projectName}`
      );
      continue;
    }

    // Update time
    try {
      let result = null;
      if (platform === 'netlify') {
        const token = getBuildOrAuthToken();
        const site = await getSiteIdFromSlug(project.siteSlug, token);

        const currentNetlifyVars = await getCurrentNetlifyEnvVars(site, token);

        result = await updateNetlifyVars(project, token, varsToUpdate);
      } else if (platform === 'vercel') {
        result = await updateVercelVars(project, process.env.VERCEL_TOKEN, varsToUpdate);
      }

      // Log the result if returned
      if (result && result.updated) {
        log(
          'info',
          `Updated variables for project ${project.siteSlug || project.projectName}: ${Object.keys(
            result.updated
          ).join(', ')}`
        );
      }
    } catch (err) {
      log('error', `Failed to update environment variables for project: ${err.message}`);
    }
  }
}

/**
 * Main function that orchestrates reading config, gathering variables, running validations,
 * and delegating read/update operations across platforms.
 */
async function main() {
  try {
    log('debug', 'Checking if running on platform...');
    if (!isRunningOnPlatform()) {
      log('debug', 'Not running on platform, exiting');
      process.exit(0);
    }

    // Load platform tokens ONCE at the start
    if (fs.existsSync('.env.secure')) {
      try {
        const content = fs.readFileSync('.env.secure', 'utf8');
        const key = process.env.BWS_PLATFORM_KEY || process.env.BWS_EPHEMERAL_KEY;
        log('debug', `Attempting to decrypt platform tokens with key: ${key.substring(0, 8)}...`);

        const decrypted = decryptContent(content, key);
        const platformTokens = dotenv.parse(decrypted);

        // Set tokens in environment
        Object.assign(process.env, platformTokens);

        if (process.env.DEBUG === 'true') {
          log('debug', 'Loaded platform tokens:');
          log(
            'debug',
            `NETLIFY_AUTH_TOKEN: ${process.env.NETLIFY_AUTH_TOKEN ? '✓ Present' : '❌ Missing'}`
          );
          log(
            'debug',
            `VERCEL_AUTH_TOKEN: ${process.env.VERCEL_AUTH_TOKEN ? '✓ Present' : '❌ Missing'}`
          );
        }
      } catch (error) {
        log('warn', `Failed to load platform tokens: ${error.message}`);
      }
    }

    log('info', 'Starting platform variable sync...');
    const config = await readConfigFile();

    // Filter projects based on current platform
    const currentPlatform =
      process.env.NETLIFY === 'true' ? 'netlify' : process.env.VERCEL === '1' ? 'vercel' : null;

    // Get current project from environment
    const currentProjectName = process.env.BWS_PROJECT;
    const currentProject = config.projects.find(
      (project) =>
        project.platform.toLowerCase() === currentPlatform &&
        project.projectName === currentProjectName
    );

    if (!currentProject) {
      log('warn', `No matching project found for ${currentPlatform}/${currentProjectName}`);
      process.exit(0);
    }

    // Visual separator for clarity
    console.log('\n' + '='.repeat(80));
    console.log(`Starting update for project: ${currentProject.projectName}`);
    console.log('='.repeat(80) + '\n');

    try {
      if (currentProject.platform === 'vercel' && process.env.VERCEL === '1') {
        await updateVercelEnvVars(currentProject);
      } else if (currentProject.platform === 'netlify' && process.env.NETLIFY === 'true') {
        await updateNetlifyEnvVars(currentProject);
      }
    } catch (platformError) {
      // Handle Vercel auth errors
      if (
        currentProject.platform === 'vercel' &&
        (platformError.message.includes('Not authorized') ||
          platformError.message.includes('forbidden'))
      ) {
        // prettier-ignore
        {
          console.warn('\x1b[33m╔════════════════════════════════════════════════════════╗\x1b[0m');
          console.warn('\x1b[33m║                                                        ║\x1b[0m');
          console.warn('\x1b[33m║           WARNING: VERCEL TOKEN INVALID                ║\x1b[0m');
          console.warn('\x1b[33m║    Update VERCEL_AUTH_TOKEN in BWS for auto-sync       ║\x1b[0m');
          console.warn('\x1b[33m║        Platform variables may be out of sync           ║\x1b[0m');
          console.warn('\x1b[33m║                                                        ║\x1b[0m');
          console.warn('\x1b[33m╚════════════════════════════════════════════════════════╝\x1b[0m');
        }
        // Handle Netlify auth errors
      } else if (
        currentProject.platform === 'netlify' &&
        (platformError.message.includes('unauthorized') || platformError.message.includes('403'))
      ) {
        // prettier-ignore
        {
          console.warn('\x1b[33m╔════════════════════════════════════════════════════════╗\x1b[0m');
          console.warn('\x1b[33m║                                                        ║\x1b[0m');
          console.warn('\x1b[33m║           WARNING: NETLIFY TOKEN INVALID               ║\x1b[0m');
          console.warn('\x1b[33m║    Update NETLIFY_AUTH_TOKEN in BWS for auto-sync      ║\x1b[0m');
          console.warn('\x1b[33m║        Platform variables may be out of sync           ║\x1b[0m');
          console.warn('\x1b[33m║                                                        ║\x1b[0m');
          console.warn('\x1b[33m╚════════════════════════════════════════════════════════╝\x1b[0m');
        }
      } else {
        log('warn', `Platform sync skipped: ${platformError.message}`);
      }
    }
  } catch (error) {
    log('warn', `Unable to sync platform variables: ${error.message}`);
  }
}

// Run the main function
main().catch((error) => {
  handleError(error, 'An unexpected error occurred in updateEnvVars.js');
});
