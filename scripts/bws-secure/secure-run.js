#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');
const fsPromises = require('fs').promises;

// Load local .env so that BWS_ACCESS_TOKEN, ENCRYPTION_KEY, etc. become available
require('dotenv').config();

const { loadBwsSecrets } = require('./bws-dotenv.js');
const { validateDeployment } = require('./update-environments/utils.js');

// Platform detection
const isNetlify = process.env.NETLIFY === 'true';
const isVercel = process.env.VERCEL === '1';

// Add this near the top of the file with other imports
function log(level, message) {
  const colors = {
    info: '\x1b[36m', // Cyan
    debug: '\x1b[90m', // Gray
    warn: '\x1b[33m', // Yellow
    error: '\x1b[31m' // Red
  };
  const color = colors[level] || '';
  const reset = '\x1b[0m';
  console.log(`${color}${message}${reset}`);
}

// Add this function before setupEnvironment
async function ensureRequiredVarsFile() {
  log('info', 'Scanning codebase for required environment variables...');

  const scanResult = spawnSync(
    'node',
    [path.join(__dirname, 'check-vars', 'requiredRuntimeVars.js')],
    {
      stdio: 'inherit',
      env: process.env
    }
  );

  if (scanResult.status !== 0) {
    throw new Error('Failed to scan for required environment variables');
  }

  const requiredVarsPath = path.join(__dirname, 'requiredVars.env');
  if (!fs.existsSync(requiredVarsPath)) {
    throw new Error('Required variables file was not generated');
  }

  log('info', 'Required variables file generated successfully');
}

// After loading dotenv but before setupEnvironment
async function createRequiredVarsFile() {
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
      log('warn', 'No .env file found to create requiredVars.env');
      return;
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');
    const vars = envContent
      .split('\n')
      .filter((line) => {
        // Keep only non-empty lines that aren't comments and contain an equals sign
        return line.trim() && !line.trim().startsWith('#') && line.includes('=');
      })
      .map((line) => line.split('=')[0].trim()); // Extract just the variable names

    // Create the requiredVars.env file in the correct location
    const requiredVarsPath = path.join(__dirname, 'requiredVars.env');
    const requiredVarsContent = vars.join('\n');

    fs.writeFileSync(requiredVarsPath, requiredVarsContent);
    log('info', `Created requiredVars.env with ${vars.length} variables`);
  } catch (error) {
    log('error', `Failed to create requiredVars.env: ${error.message}`);
    throw error;
  }
}

// Update the promptForProject function to remove platform information
async function promptForProject(projects) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\nAvailable projects:');
  projects.forEach((p, i) => {
    console.log(`${i + 1}. ${p.projectName}`);
  });

  try {
    const answer = await new Promise((resolve) => {
      rl.question('\nSelect a project number: ', resolve);
    });

    rl.close();
    const selection = parseInt(answer) - 1;

    if (selection >= 0 && selection < projects.length) {
      const selectedProject = projects[selection];

      // Create content for .env file with all projects
      let envContent = '\n# Added by bws-secure project selector\n';
      envContent += '# Available projects (uncomment to switch):\n\n';

      // Add all projects as comments except the selected one
      projects.forEach((p) => {
        if (p.projectName === selectedProject.projectName) {
          envContent += `BWS_PROJECT=${p.projectName}\n`;
        } else {
          envContent += `# BWS_PROJECT=${p.projectName}\n`;
        }
      });

      // Add a blank line at the end
      envContent += '\n';

      try {
        const envPath = path.join(process.cwd(), '.env');
        await fsPromises.appendFile(envPath, envContent);
        log(
          'info',
          `Added BWS_PROJECT=${selectedProject.projectName} to your .env file with commented alternatives`
        );
      } catch (err) {
        log('warn', 'Could not update .env file. You may want to add BWS_PROJECT manually.');
      }

      return selectedProject;
    }

    throw new Error('Invalid selection');
  } catch (err) {
    rl.close();
    throw new Error('Project selection failed');
  }
}

// Add helper to validate BWS token
async function validateBwsToken() {
  if (!process.env.BWS_ACCESS_TOKEN) {
    return false;
  }

  try {
    // Try a simple bws command to validate the token
    execSync(`./node_modules/.bin/bws project list -t ${process.env.BWS_ACCESS_TOKEN}`, {
      stdio: 'ignore',
      env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' }
    });
    return true;
  } catch (err) {
    return false;
  }
}

// Add this near the top with other helper functions
async function readConfigFile() {
  try {
    const configPath = path.join(__dirname, '../../bwsconfig.json');
    if (!fs.existsSync(configPath)) {
      throw new Error('bwsconfig.json not found');
    }
    const configContent = await fsPromises.readFile(configPath, 'utf8');
    return JSON.parse(configContent);
  } catch (error) {
    throw new Error(`Failed to read bwsconfig.json: ${error.message}`);
  }
}

// Add this helper function to standardize environment names
function normalizeEnvironment(envName) {
  if (!envName) return 'local'; // Default to local if no environment specified

  // Convert to lowercase for consistent matching
  const env = envName.toLowerCase();

  // Map various environment names to our standard ones
  if (env === 'production' || env === 'prod') {
    return 'prod';
  }

  if (
    [
      'develop',
      'development',
      'preview',
      'deploy-preview',
      'branch-deploy',
      'deploy/preview',
      'branch',
      'test',
      'staging'
    ].includes(env)
  ) {
    return 'dev';
  }

  if (env === 'local' || env === 'development-local') {
    return 'local';
  }

  // If no match found, warn but return the original to help with debugging
  console.warn(`Unknown environment "${envName}" - will try to load .env.secure.${env}`);
  return env;
}

// Also fix the setupEnvironment function to use the correct variable name
async function setupEnvironment() {
  log('info', 'Creating environment-specific secure files...');

  // Initialize tracking of created files
  process.env.BWS_CREATED_FILES = '[]';

  // Generate ephemeral encryption key if not exists
  if (!process.env.BWS_EPHEMERAL_KEY) {
    process.env.BWS_EPHEMERAL_KEY = crypto.randomBytes(32).toString('hex');
  }

  try {
    const config = await readConfigFile();
    if (!config || !config.projects) {
      throw new Error('Invalid configuration file');
    }

    // Get the correct project based on BWS_PROJECT or platform
    let project = null;
    log('debug', `Config loaded with ${config.projects.length} project(s)`);
    log('debug', `Project platforms: ${config.projects.map((p) => p.platform).join(', ')}`);
    if (process.env.BWS_PROJECT) {
      project = config.projects.find((p) => p.projectName === process.env.BWS_PROJECT);
    } else if (isNetlify) {
      project = config.projects.find((p) => p.platform === 'netlify');
    } else if (isVercel) {
      project = config.projects.find((p) => p.platform === 'vercel');
    } else {
      // Not on a platform and no BWS_PROJECT set - either use single project or prompt
      if (config.projects.length === 1) {
        project = config.projects[0];
        process.env.BWS_PROJECT = project.projectName;
        log('info', `Using only available project: ${project.projectName}`);
      } else {
        try {
          project = await promptForProject(config.projects);
          process.env.BWS_PROJECT = project.projectName;
        } catch (err) {
          throw new Error(`Project selection required: ${err.message}`);
        }
      }
    }

    if (!project) {
      throw new Error('No suitable project found in bwsconfig.json');
    }

    // Always create all environment files
    const environments = ['prod', 'dev', 'local'];
    for (const env of environments) {
      const projectId = project.bwsProjectIds[env];
      if (!projectId) {
        log('warn', `No project ID found for ${env} environment`);
        continue;
      }
      await loadEnvironmentSecrets(env, projectId);
    }

    // Determine which environment to load into process.env
    let activeEnvironment;
    if (process.env.BWS_ENV) {
      activeEnvironment = normalizeEnvironment(process.env.BWS_ENV);
    } else if (isNetlify) {
      activeEnvironment = normalizeEnvironment(process.env.CONTEXT || 'dev');
    } else if (isVercel) {
      activeEnvironment = normalizeEnvironment(process.env.VERCEL_ENV || 'dev');
    } else {
      activeEnvironment = 'local';
      log('info', 'Local development detected, using local environment');
    }

    // Load the active environment's variables
    console.log(`Loading environment variables from ${activeEnvironment} environment`);

    const secureFile = `.env.secure.${activeEnvironment}`;
    if (fs.existsSync(secureFile)) {
      // Read and decrypt the secure file
      const encryptedContent = fs.readFileSync(secureFile, 'utf-8');
      const decryptedContent = decryptContent(encryptedContent, process.env.BWS_EPHEMERAL_KEY);

      // Load decrypted variables into process.env
      decryptedContent.split('\n').forEach((line) => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      });
      log('info', `Loaded variables from ${secureFile} into process.env`);
    } else {
      console.warn(`Environment file ${secureFile} not found`);
    }

    // If we're on a platform, also load auth tokens
    if (isNetlify || isVercel) {
      // Load global secrets (without project ID) to get auth tokens
      process.env.BWS_PROJECT_ID = ''; // Clear project ID temporarily
      const globalSecrets = loadBwsSecrets(process.env.BWS_EPHEMERAL_KEY);
      if (globalSecrets) {
        globalSecrets.split('\n').forEach((line) => {
          const [key, ...valueParts] = line.split('=');
          if (key && valueParts.length > 0) {
            // Only set auth tokens
            if (
              (key.trim() === 'NETLIFY_AUTH_TOKEN' && isNetlify) ||
              (key.trim() === 'VERCEL_AUTH_TOKEN' && isVercel)
            ) {
              process.env[key.trim()] = valueParts.join('=').trim();
            }
          }
        });
      }
    }

    // Add platform variable sync here
    if (process.env.NETLIFY === 'true' || process.env.VERCEL === '1') {
      log('info', 'Syncing platform variables...');
      const updateResult = spawnSync(
        'node',
        [path.join(__dirname, 'update-environments', 'updateEnvVars.js')],
        {
          stdio: 'inherit',
          env: process.env
        }
      );
    }
  } catch (error) {
    throw new Error(`Failed to setup environment: ${error.message}`);
  }
}

// 4) If you also want to demonstrate decrypting from .env.secure, do it now in memory:
function decryptContent(encrypted, encryptionKey) {
  const [ivBase64, data] = encrypted.split(':');
  const iv = Buffer.from(ivBase64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), iv);
  let decrypted = decipher.update(data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Make the .env.secure verification optional
if (fs.existsSync('.env.secure') && process.env.BWS_ACCESS_TOKEN && process.env.BWS_EPHEMERAL_KEY) {
  try {
    const encryptedText = fs.readFileSync('.env.secure', 'utf-8');
    const checkPlain = decryptContent(encryptedText, process.env.BWS_EPHEMERAL_KEY);
    console.log('Verified .env.secure decryption in memory...');
  } catch (error) {
    console.warn(`[WARN] Decryption from .env.secure failed. Skipping this step: ${error.message}`);
  }
}

// Add this function near the other crypto functions
function encryptContent(content, encryptionKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), iv);
  let encrypted = cipher.update(content, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return `${iv.toString('base64')}:${encrypted}`;
}

// New function to handle environment-specific secrets
async function loadEnvironmentSecrets(env, projectId) {
  if (!projectId || !env) {
    console.warn(
      `\x1b[33mSkipping invalid environment config - missing projectId or environment name\x1b[0m`
    );
    return false;
  }

  if (!process.env.BWS_ACCESS_TOKEN) {
    console.warn(`\x1b[33mSkipping ${env} environment - BWS_ACCESS_TOKEN not set\x1b[0m`);
    return false;
  }

  try {
    console.log(`Loading secrets for ${env} environment (${projectId})...`);

    const output = execSync(
      `./node_modules/.bin/bws secret list -t ${process.env.BWS_ACCESS_TOKEN} ${projectId} --output json`,
      {
        encoding: 'utf-8',
        env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' }
      }
    );

    // Handle empty or invalid JSON response
    let bwsSecrets;
    try {
      bwsSecrets = JSON.parse(output || '[]');
    } catch (parseError) {
      console.warn(`\x1b[33mWarning: No valid secrets found for ${env} environment\x1b[0m`);
      return false;
    }

    // If this is dev or prod environment, always load VERCEL_AUTH_TOKEN into memory
    if ((env === 'dev' || env === 'prod') && process.env.VERCEL === '1') {
      const vercelToken = bwsSecrets.find((s) => s.key === 'VERCEL_AUTH_TOKEN')?.value;
      if (vercelToken) {
        process.env.VERCEL_AUTH_TOKEN = vercelToken;
      }
    }

    // Continue with normal environment file creation...
    const envContent = bwsSecrets.map(({ key, value }) => `${key}=${value}`).join('\n');

    if (process.env.BWS_EPHEMERAL_KEY && envContent) {
      const cipherText = encryptContent(envContent, process.env.BWS_EPHEMERAL_KEY);
      fs.writeFileSync(`.env.secure.${env}`, cipherText, {
        encoding: 'utf-8'
      });
      console.log(
        `Created .env.secure.${env} file for ${env} environment with ${bwsSecrets.length} secrets`
      );
      return true;
    }
    return false;
  } catch (error) {
    // Handle 404 errors more gracefully
    if (error?.message?.includes('404 Not Found')) {
      console.warn(
        `\x1b[33mWarning: Project ${projectId} (${env}) no secrets found, does not exist, or no access\x1b[0m`
      );
      return false;
    }

    // Add more detailed error logging for other errors
    console.warn(`\x1b[33mWarning: Failed to load secrets for ${env}:\x1b[0m`);
    if (process.env.DEBUG === 'true') {
      if (error?.stdout) console.warn('stdout:', error.stdout.toString());
      if (error?.stderr) console.warn('stderr:', error.stderr.toString());
      console.warn('Error:', error?.message || 'Unknown error');
    }
    return false;
  }
}

// Add this helper function to handle loading the secure env file
function loadSecureEnv(env) {
  const secureFile = `.env.secure.${env}`;
  if (fs.existsSync(secureFile)) {
    console.log(`Loading ${env} environment secrets...`);
    const encryptedText = fs.readFileSync(secureFile, 'utf-8');
    const decrypted = decryptContent(encryptedText, process.env.BWS_EPHEMERAL_KEY);

    // Load decrypted vars into process.env
    decrypted.split('\n').forEach((line) => {
      const [k, ...rest] = line.split('=');
      if (k && rest.length > 0) {
        process.env[k.trim()] = rest.join('=').trim();
      }
    });
    console.log(`${env} environment secrets loaded into process.env`);
  } else {
    console.warn(`\x1b[33mWarning: No ${env} environment secrets found (${secureFile})\x1b[0m`);
  }
}

// Move cleanup function to top level
function cleanupSecureFiles() {
  try {
    // Clean up all .env.secure.* files
    const files = fs.readdirSync(process.cwd());
    files.forEach((file) => {
      if (file.startsWith('.env.secure.')) {
        fs.unlinkSync(path.join(process.cwd(), file));
        if (process.env.DEBUG) {
          log('debug', `Cleaned up ${file}`);
        }
      }
    });
  } catch (error) {
    console.warn('\x1b[33m[WARN] Error during cleanup:', error.message, '\x1b[0m');
  }
}

// Main execution
(async () => {
  try {
    // -----------------------------------------------------------------------
    // ADD/CHANGE START
    // -----------------------------------------------------------------------
    const requiredVarsPath = path.join(__dirname, 'requiredVars.env');
    const isNetlify = process.env.NETLIFY === 'true';
    const isVercel = process.env.VERCEL === '1';
    const isDebug = process.env.DEBUG === 'true';

    if (fs.existsSync(requiredVarsPath) && !isNetlify && !isVercel && !isDebug) {
      log(
        'info',
        'Skipping environment scan because requiredVars.env exists and we are not on Netlify/Vercel/DEBUG'
      );
    } else {
      log('info', 'Scanning for required variables...');
      const scanResult = spawnSync(
        'node',
        [path.join(__dirname, 'check-vars', 'requiredRuntimeVars.js')],
        { stdio: 'inherit' }
      );
      if (scanResult.status !== 0) {
        throw new Error('Failed to scan for required variables');
      }
    }
    // -----------------------------------------------------------------------
    // ADD/CHANGE END
    // -----------------------------------------------------------------------

    // Now that the file is ready or skipped, do environment setup
    await setupEnvironment();

    log('info', 'Running environment validation now that secrets are loaded...');
    const validator = spawnSync('node', [path.join(__dirname, 'env_validator.js')], {
      stdio: 'inherit',
      env: process.env
    });

    const command = process.argv.slice(2);
    if (command.length === 0) {
      console.log('\x1b[33mWarning: No command provided to execute\x1b[0m');
      process.exit(0);
    }

    // Execute the command but DON'T clean up after
    const result = spawnSync(command[0], command.slice(1), {
      stdio: 'inherit',
      env: process.env
    });

    process.exit(result.status);
  } catch (error) {
    console.error('\x1b[31mError during execution:', error.message, '\x1b[0m');
    process.exit(1);
  }
})();

// Add cleanup ONLY on process exit events
process.on('exit', () => {
  cleanupSecureFiles();
});

process.on('SIGINT', () => {
  process.exit(0);
});

process.on('SIGTERM', () => {
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
