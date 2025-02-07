#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');
const fsPromises = require('fs').promises;
const dotenv = require('dotenv');

// 1) Explicitly load .env from the repo root (../../.env) in case we're running from a subdirectory
const dotenvPath = path.join(__dirname, '../../.env');
dotenv.config({ path: dotenvPath });

const { loadBwsSecrets } = require('./bws-dotenv.js');
const { validateDeployment } = require('./update-environments/utils.js');

// Platform detection
const isNetlify = process.env.NETLIFY === 'true';
const isVercel = process.env.VERCEL === '1';
const isDebug = process.env.DEBUG === 'true';

// Add this near the top of the file with other imports
const DEBUG = process.env.DEBUG === 'true';

function log(level, message) {
  if (level === 'debug' && !DEBUG) return;

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

// Update the updateEnvBwsSection function to handle both cases
async function updateEnvBwsSection(project, environment, onlyToggleEnv = false) {
  const envPath = path.join(process.cwd(), '.env');

  try {
    // Read current .env content
    let content = '';
    if (fs.existsSync(envPath)) {
      content = await fsPromises.readFile(envPath, 'utf-8');
    }

    let lines = content.split('\n').map((line) => line.trimEnd());

    if (onlyToggleEnv) {
      // Just toggle environment comments when BWS_ENV is explicitly set
      const envSectionStart = lines.findIndex((line) =>
        line.includes('Environment options (uncomment to switch)')
      );

      if (envSectionStart !== -1) {
        for (let i = envSectionStart + 1; i < lines.length; i++) {
          const line = lines[i];
          if (!line.includes('BWS_ENV=')) continue;
          if (
            line === '' ||
            (line.trim() !== '' && !line.includes('#') && !line.includes('BWS_ENV='))
          )
            break;

          if (line.includes('BWS_ENV=')) {
            if (line.includes(`BWS_ENV=${environment}`)) {
              lines[i] = line.replace(/^#\s*/, '');
            } else if (!line.startsWith('#')) {
              lines[i] = `# ${line}`;
            }
          }
        }
      }
    } else {
      // Find BWS section boundaries
      const startIndex = lines.findIndex((line) =>
        line.includes('Added by bws-secure project selector')
      );

      // Find the end of the BWS section
      let endIndex = -1;
      if (startIndex !== -1) {
        // Look for the first empty line after the environment options
        for (let i = startIndex; i < lines.length; i++) {
          if (lines[i].includes('Environment options (uncomment to switch)')) {
            // Find the next empty line after environment options
            for (let j = i + 1; j < lines.length; j++) {
              if (lines[j].trim() === '') {
                endIndex = j;
                break;
              }
              // Also stop if we hit a line that doesn't look like an environment option
              if (!lines[j].includes('BWS_ENV=') && !lines[j].startsWith('#')) {
                endIndex = j;
                break;
              }
            }
            break;
          }
        }
        // If we didn't find a clear end, use the next empty line
        if (endIndex === -1) {
          endIndex = lines.findIndex((line, idx) => idx > startIndex && line.trim() === '');
        }
      }

      // Prepare BWS section content
      const bwsSection = [];

      // Add an empty line before BWS section if we're not at the start of the file
      if (startIndex > 0) {
        bwsSection.push('');
      }

      bwsSection.push('# Added by bws-secure project selector');

      const config = await readConfigFile();
      config.projects.forEach((p) => {
        if (p.projectName === project.projectName) {
          bwsSection.push(`BWS_PROJECT=${p.projectName}`);
        } else {
          bwsSection.push(`# BWS_PROJECT=${p.projectName}`);
        }
      });

      bwsSection.push('', '# Environment options (uncomment to switch):');

      // Add standard environments
      const standardEnvs = {
        local: 'For local development',
        dev: 'For development/staging',
        prod: 'For production'
      };

      // Add current environment if it's not standard
      if (!standardEnvs.hasOwnProperty(environment)) {
        bwsSection.push(`BWS_ENV=${environment}     # Custom environment`);
      }

      // Add standard environments (commented unless they match current)
      Object.entries(standardEnvs).forEach(([env, comment]) => {
        const line = `BWS_ENV=${env}     # ${comment}`;
        bwsSection.push(env === environment ? line : `# ${line}`);
      });

      // Add an empty line after the BWS section
      bwsSection.push('');

      // Update the file content
      if (startIndex === -1) {
        // If no existing BWS section, try to find the best place to insert it
        const accessTokenIndex = lines.findIndex((line) => line.includes('BWS_ACCESS_TOKEN='));

        // Insert after access token if found, otherwise after first line
        const insertIndex = accessTokenIndex !== -1 ? accessTokenIndex + 1 : 1;

        // Ensure there's an empty line before insertion if we're not at the start
        if (insertIndex > 0 && lines[insertIndex - 1].trim() !== '') {
          lines.splice(insertIndex, 0, '');
        }

        lines.splice(insertIndex, 0, ...bwsSection);
      } else {
        // Replace existing BWS section while preserving content before and after
        const beforeSection = lines.slice(0, startIndex);
        const afterSection = endIndex !== -1 ? lines.slice(endIndex) : [];

        // Filter out any trailing empty lines from beforeSection
        while (beforeSection.length > 0 && beforeSection[beforeSection.length - 1].trim() === '') {
          beforeSection.pop();
        }

        // Filter out any leading empty lines from afterSection
        while (afterSection.length > 0 && afterSection[0].trim() === '') {
          afterSection.shift();
        }

        lines = [...beforeSection, ...bwsSection, ...afterSection];
      }
    }

    // Clean up consecutive empty lines
    for (let i = lines.length - 1; i > 0; i--) {
      if (lines[i] === '' && lines[i - 1] === '') {
        lines.splice(i, 1);
      }
    }

    // Ensure file ends with a newline
    if (lines[lines.length - 1] !== '') {
      lines.push('');
    }

    await fsPromises.writeFile(envPath, lines.join('\n'));
    log('debug', `Updated BWS section in .env file`);
  } catch (error) {
    log('warn', `Failed to update BWS section in .env: ${error.message}`);
  }
}

// Replace the existing promptForProject function with this updated version
async function promptForProject(projects) {
  // If BWS_PROJECT is already set and valid, use it
  if (process.env.BWS_PROJECT) {
    const existingProject = projects.find((p) => p.projectName === process.env.BWS_PROJECT);
    if (existingProject) {
      // If BWS_ENV was explicitly set, only toggle comments
      const onlyToggleEnv = process.env.BWS_ENV !== undefined;
      await updateEnvBwsSection(existingProject, process.env.BWS_ENV || 'local', onlyToggleEnv);
      return existingProject;
    }
  }

  // If single project, use it automatically
  if (projects.length === 1) {
    const selectedProject = projects[0];
    process.env.BWS_PROJECT = selectedProject.projectName;
    await updateEnvBwsSection(selectedProject, process.env.BWS_ENV || 'local');
    return selectedProject;
  }

  // For platform builds, use first project as default
  const isNetlify = process.env.NETLIFY === 'true';
  const isVercel = process.env.VERCEL === '1';
  if (isNetlify || isVercel) {
    const selectedProject = projects[0];
    process.env.BWS_PROJECT = selectedProject.projectName;
    await updateEnvBwsSection(selectedProject, process.env.BWS_ENV || 'local');
    return selectedProject;
  }

  // Multiple projects in local development - need to prompt
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\nAvailable projects:');
  projects.forEach((p, i) => {
    console.log(`${i + 1}. ${p.projectName} (${p.platform})`);
  });

  try {
    const answer = await new Promise((resolve) => {
      rl.question('\nSelect a project number: ', resolve);
    });

    rl.close();
    const selection = parseInt(answer) - 1;

    if (selection >= 0 && selection < projects.length) {
      const selectedProject = projects[selection];
      process.env.BWS_PROJECT = selectedProject.projectName;
      await updateEnvBwsSection(selectedProject, process.env.BWS_ENV || 'local');
      return selectedProject;
    }

    throw new Error('Invalid selection');
  } catch (err) {
    rl.close();
    throw new Error('Project selection failed: ' + err.message);
  }
}

// 1) Add this helper function *before* any place you call spawnSync or execSync with "bws"
function getBwsCommand() {
  const binDir = path.join(process.cwd(), 'node_modules', '.bin');
  const exePath = path.join(binDir, 'bws.exe');

  if (process.platform === 'win32' && fs.existsSync(exePath)) {
    return exePath; // Use bws.exe on Windows
  }

  // Otherwise fallback to the script name "bws" for non-Windows
  return path.join(binDir, 'bws');
}

// Add helper to validate BWS token
async function validateBwsToken() {
  if (!process.env.BWS_ACCESS_TOKEN) {
    // prettier-ignore
    {
      console.warn('\x1b[33m╔════════════════════════════════════════════════════════╗\x1b[0m');
      console.warn('\x1b[33m║                                                        ║\x1b[0m');
      console.warn('\x1b[33m║             WARNING: BWS TOKEN MISSING                 ║\x1b[0m');
      console.warn('\x1b[33m║                                                        ║\x1b[0m');
      console.warn('\x1b[33m║ To use BWS features:                                   ║\x1b[0m');
      console.warn('\x1b[33m║ 1. Log in to vault.bitwarden.com                       ║\x1b[0m');
      console.warn('\x1b[33m║ 2. Go to Secrets Manager > Machine Accounts            ║\x1b[0m');
      console.warn('\x1b[33m║ 3. Create or copy your machine access token            ║\x1b[0m');
      console.warn('\x1b[33m║ 4. Add to .env: BWS_ACCESS_TOKEN=your_token            ║\x1b[0m');
      console.warn('\x1b[33m║                                                        ║\x1b[0m');
      console.warn('\x1b[33m║ For now, continuing with only .env values...           ║\x1b[0m');
      console.warn('\x1b[33m║                                                        ║\x1b[0m');
      console.warn('\x1b[33m╚════════════════════════════════════════════════════════╝\x1b[0m');
      console.warn(
        '\nVisit the link below to create your token: \n' +
          '\nhttps://vault.bitwarden.com/#/sm/22479128-f194-460a-884b-b24a015686c6/machine-accounts\n'
      );
    }
    return false;
  }

  try {
    // 2) Replace "./node_modules/.bin/bws" with the helper function
    execSync(`${getBwsCommand()} project list -t ${process.env.BWS_ACCESS_TOKEN}`, {
      stdio: 'ignore',
      env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' }
    });
    return true;
  } catch (err) {
    // prettier-ignore
    {
      console.error('\x1b[31m╔════════════════════════════════════════════════════════╗\x1b[0m');
      console.error('\x1b[31m║                                                        ║\x1b[0m');
      console.error('\x1b[31m║             CRITICAL BWS TOKEN ERROR                   ║\x1b[0m');
      console.error('\x1b[31m║                                                        ║\x1b[0m');
      console.error('\x1b[31m║ Your BWS_ACCESS_TOKEN appears to be invalid:           ║\x1b[0m');
      console.error('\x1b[31m║ 1. Check if token has expired                          ║\x1b[0m');
      console.error('\x1b[31m║ 2. Verify token permissions in vault.bitwarden.com     ║\x1b[0m');
      console.error('\x1b[31m║ 3. Generate new token if needed                        ║\x1b[0m');
      console.error('\x1b[31m║ 4. Ensure token has read access to required projects   ║\x1b[0m');
      console.error('\x1b[31m║                                                        ║\x1b[0m');
      console.error('\x1b[31m║ For now, continuing with only .env values...           ║\x1b[0m');
      console.error('\x1b[31m║                                                        ║\x1b[0m');
      console.error('\x1b[31m╚════════════════════════════════════════════════════════╝\x1b[0m');
      console.error(
        '\nVisit the link below to check or regenerate your token: \n' +
          '\nhttps://vault.bitwarden.com/#/sm/22479128-f194-460a-884b-b24a015686c6/machine-accounts\n'
      );
    }
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

  if (env === 'dev' || env === 'develop' || env === 'development') {
    return 'dev';
  }

  // Check other development-like environments
  const devEnvironments = [
    'preview',
    'deploy-preview',
    'branch-deploy',
    'deploy/preview',
    'branch',
    'test',
    'staging'
  ];

  if (devEnvironments.includes(env)) {
    return 'dev';
  }

  if (env === 'local' || env === 'development-local') {
    return 'local';
  }

  // If no match found, warn but return the original to help with debugging
  console.warn(`Unknown environment "${envName}" - will try to load .env.secure.${env}`);
  return env;
}

// Determine environment based on platform or defaults
function determineEnvironment() {
  // Platform-specific environment detection
  if (process.env.NETLIFY === 'true') {
    return normalizeEnvironment(process.env.CONTEXT || 'dev');
  }

  if (process.env.VERCEL === '1') {
    return normalizeEnvironment(process.env.VERCEL_ENV || 'dev');
  }

  // Check explicit BWS_ENV setting
  if (process.env.BWS_ENV) {
    const env = normalizeEnvironment(process.env.BWS_ENV);
    // Update BWS section if project is set
    if (process.env.BWS_PROJECT) {
      const config = require('../../bwsconfig.json');
      const project = config.projects.find((p) => p.projectName === process.env.BWS_PROJECT);
      if (project) {
        updateEnvBwsSection(project, env).catch(console.error);
      }
    }
    return env;
  }

  // Check NODE_ENV
  if (process.env.NODE_ENV) {
    return normalizeEnvironment(process.env.NODE_ENV);
  }

  // Default to local if nothing else matches
  return 'local';
}

// Add this helper function for environment status display
function printEnvironmentSummary() {
  const env = process.env.BWS_ENV || 'local';
  const project = process.env.BWS_PROJECT || 'none';
  const testVar = process.env.BWS_SECRET_TEST_VAR || 'not set';
  const projectId = process.env.BWS_PROJECT_ID || 'none';

  // Increased BOX_WIDTH by 10 characters (from 80 to 90)
  const BOX_WIDTH = 90;
  const CONTENT_START = 25; // Position where values start

  // Helper to pad content
  const padContent = (label, value) => {
    const padding = ' '.repeat(CONTENT_START - label.length);
    const available = BOX_WIDTH - CONTENT_START - 4; // -4 for borders and spacing
    const truncated = value.substring(0, available);
    return `║ ${label}${padding}: ${truncated}${' '.repeat(available - truncated.length)} ║`;
  };

  const lines = [
    `╔${'═'.repeat(BOX_WIDTH - 0)}╗`,
    `║${' Environment Summary'.padEnd(BOX_WIDTH - 1)} ║`,
    `╟${'─'.repeat(BOX_WIDTH - 0)}╢`,
    padContent('Project', project),
    `║${' '.repeat(BOX_WIDTH - 0)}║`,
    padContent('BWS_ENV', env),
    `║${' '.repeat(BOX_WIDTH - 0)}║`,
    padContent('BWS Project ID', projectId),
    `║${' '.repeat(BOX_WIDTH - 0)}║`,
    padContent('BWS_SECRET_TEST_VAR', testVar),
    `╚${'═'.repeat(BOX_WIDTH - 0)}╝`
  ];

  // Add a blank line before and after the box
  log('info', '');
  lines.forEach((line) => log('info', line));
  log('info', '');
}

// At the start of execution, store ALL original environment variables
const originalEnvironment = { ...process.env };

// Keep original setupEnvironment but enhance with platform support
async function setupEnvironment(options = { isPlatformBuild: false }) {
  log('info', 'Creating project-specific secure files...');

  if (options.isPlatformBuild) {
    log('debug', 'Running platform-specific setup...');
  }

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

    // Determine environment early
    const env = determineEnvironment();
    process.env.BWS_ENV = env;
    log('debug', `Using environment: ${env}`);

    // Update BWS section in .env if we have a project set
    if (process.env.BWS_PROJECT) {
      const project = config.projects.find((p) => p.projectName === process.env.BWS_PROJECT);
      if (project) {
        await updateEnvBwsSection(project, env);
      } else {
        // If current project not found in config, prompt for new selection
        const selectedProject = await promptForProject(config.projects);
        process.env.BWS_PROJECT = selectedProject.projectName;
        await updateEnvBwsSection(selectedProject, env);
      }
    } else {
      // No project set, prompt for selection
      const selectedProject = await promptForProject(config.projects);
      process.env.BWS_PROJECT = selectedProject.projectName;
      await updateEnvBwsSection(selectedProject, env);
    }

    // Get unique platforms from config
    const platforms = new Set(config.projects.map((p) => p.platform.toLowerCase()));

    // Create global .env.secure with platform tokens
    if (process.env.BWS_ACCESS_TOKEN) {
      try {
        const result = spawnSync(
          getBwsCommand(),
          ['secret', 'list', '-t', process.env.BWS_ACCESS_TOKEN],
          {
            encoding: 'utf8',
            env: {
              ...process.env,
              NO_COLOR: '1',
              FORCE_COLOR: '0',
              TERM: 'dumb' // Add this to further discourage color output
            }
          }
        );

        if (result.status === 0) {
          // Always clean the output, even without DEBUG
          const cleanOutput = result.stdout.replace(/\u001b\[\d+m/g, '').trim();

          try {
            const secrets = JSON.parse(cleanOutput);
            const platformTokens = {};
            let platformsFound = [];

            // Only load tokens for the platform we're on
            if (isNetlify && platforms.has('netlify')) {
              const netlifyToken = secrets.find((s) => s.key === 'NETLIFY_AUTH_TOKEN');
              if (netlifyToken) {
                platformTokens.NETLIFY_AUTH_TOKEN = netlifyToken.value;
                platformsFound.push('Netlify');
              }
            }
            if (isVercel && platforms.has('vercel')) {
              const vercelToken = secrets.find((s) => s.key === 'VERCEL_AUTH_TOKEN');
              if (vercelToken) {
                platformTokens.VERCEL_AUTH_TOKEN = vercelToken.value;
                platformsFound.push('Vercel');
              }
            }

            // Only create .env.secure if we found tokens for our platform
            if (Object.keys(platformTokens).length > 0) {
              const content = Object.entries(platformTokens)
                .map(([key, value]) => `${key}=${value}`)
                .join('\n');
              const cipherText = encryptContent(content, process.env.BWS_EPHEMERAL_KEY);
              fs.writeFileSync('.env.secure', cipherText);
              log('info', `✓ Successfully loaded auth tokens for: ${platformsFound.join(', ')}`);
            }
          } catch (error) {
            log('warn', `Failed to parse secrets: ${error.message}`);
          }
        }
      } catch (error) {
        log('warn', `Failed to create global .env.secure: ${error.message}`);
      }
    }

    // First, create all project ID based files
    const projectIds = new Set();
    config.projects.forEach((project) => {
      Object.values(project.bwsProjectIds).forEach((id) => {
        if (id) projectIds.add(id);
      });
    });

    // Create project ID based files
    for (const projectId of projectIds) {
      await loadEnvironmentSecrets(projectId, projectId);
    }

    // For platform builds, process each project
    if (isNetlify || isVercel) {
      // Save original environment values if they exist
      const originalEnv = {
        BWS_ENV: process.env.BWS_ENV,
        BWS_PROJECT: process.env.BWS_PROJECT,
        BWS_PROJECT_ID: process.env.BWS_PROJECT_ID,
        BWS_ACCESS_TOKEN: process.env.BWS_ACCESS_TOKEN
      };

      for (const project of config.projects) {
        log('info', `\n=== Processing ${project.projectName} ===`);

        // Create the standard environment files for this project
        const envMappings = {
          prod: project.bwsProjectIds.prod,
          dev: project.bwsProjectIds.dev,
          local: project.bwsProjectIds.local
        };

        // Create environment files for this project
        for (const [env, projectId] of Object.entries(envMappings)) {
          const sourceFile = `.env.secure.${projectId}`;
          const targetFile = `.env.secure.${env}`;
          if (fs.existsSync(sourceFile)) {
            fs.copyFileSync(sourceFile, targetFile);
            log('debug', `Created ${targetFile} from ${sourceFile}`);
          }
        }

        // Set current project in environment
        process.env.BWS_PROJECT = project.projectName;

        // Enhanced platform operations
        log('info', `Syncing platform variables for ${project.projectName}...`);
        const updateResult = spawnSync(
          'node',
          [path.join(__dirname, 'update-environments', 'updateEnvVars.js')],
          {
            stdio: 'inherit',
            env: process.env
          }
        );

        // Clean up the standard environment files after processing this project
        if (!process.env.DEBUG) {
          ['prod', 'dev', 'local'].forEach((env) => {
            const file = `.env.secure.${env}`;
            if (fs.existsSync(file)) {
              fs.unlinkSync(file);
              log('debug', `Cleaned up ${file}`);
            }
          });
        }
      }

      // After all platform operations, restore original values if they existed
      if (
        originalEnv.BWS_ENV ||
        originalEnv.BWS_PROJECT ||
        originalEnv.BWS_PROJECT_ID ||
        originalEnv.BWS_ACCESS_TOKEN
      ) {
        if (originalEnv.BWS_ENV) process.env.BWS_ENV = originalEnv.BWS_ENV;
        if (originalEnv.BWS_PROJECT) process.env.BWS_PROJECT = originalEnv.BWS_PROJECT;
        if (originalEnv.BWS_PROJECT_ID) process.env.BWS_PROJECT_ID = originalEnv.BWS_PROJECT_ID;
        if (originalEnv.BWS_ACCESS_TOKEN)
          process.env.BWS_ACCESS_TOKEN = originalEnv.BWS_ACCESS_TOKEN;

        // Load the environment based on restored values
        if (originalEnv.BWS_PROJECT && originalEnv.BWS_ENV) {
          const project = config.projects.find((p) => p.projectName === originalEnv.BWS_PROJECT);
          if (project) {
            const projectId = project.bwsProjectIds[originalEnv.BWS_ENV];
            if (projectId) {
              process.env.BWS_PROJECT_ID = projectId;
              const sourceFile = `.env.secure.${projectId}`;
              if (fs.existsSync(sourceFile)) {
                const content = fs.readFileSync(sourceFile, 'utf8');
                const decrypted = decryptContent(content, process.env.BWS_EPHEMERAL_KEY);
                Object.assign(process.env, dotenv.parse(decrypted));
                log(
                  'info',
                  `Restored environment from ${sourceFile} for ${originalEnv.BWS_ENV} environment`
                );
              }
            }
          }
        }
      }

      // Print final environment state
      printEnvironmentSummary();
    } else {
      // For local development, handle single project
      // First validate BWS token before prompting
      const isValidToken = await validateBwsToken();

      if (!isValidToken) {
        log('info', 'No valid BWS_ACCESS_TOKEN found, continuing with .env values only');
        return;
      }

      if (!process.env.BWS_PROJECT) {
        await promptForProject(config.projects);
      }

      const projectName = process.env.BWS_PROJECT;
      const project = config.projects.find((p) => p.projectName === projectName);
      if (!project) {
        throw new Error(`Project ${projectName} not found in config`);
      }

      const env = process.env.BWS_ENV || 'local';
      const projectId = project.bwsProjectIds[env];
      if (!projectId) {
        throw new Error(`No project ID found for environment ${env}`);
      }

      // Set the project ID in process.env
      process.env.BWS_PROJECT_ID = projectId;

      // Load project-specific variables
      const sourceFile = `.env.secure.${projectId}`;
      if (fs.existsSync(sourceFile)) {
        const content = fs.readFileSync(sourceFile, 'utf8');
        const decrypted = decryptContent(content, process.env.BWS_EPHEMERAL_KEY);

        // Parse decrypted content but don't override existing env vars
        const decryptedVars = dotenv.parse(decrypted);
        Object.keys(decryptedVars).forEach((key) => {
          // Only set if not already defined in process.env
          if (!(key in process.env)) {
            process.env[key] = decryptedVars[key];
          }
        });

        log('info', `Loaded environment from ${sourceFile} for local development`);

        // Add environment summary
        printEnvironmentSummary();
      }
    }

    // After all BWS and platform operations, restore original environment variables
    Object.entries(originalEnvironment).forEach(([key, value]) => {
      process.env[key] = value;
    });
  } catch (error) {
    log('error', `Failed to setup environment: ${error.message}`);
  }
}

// 4) If you also want to demonstrate decrypting from .env.secure, do it now in memory:
function decryptContent(encrypted, encryptionKey) {
  const [nonceBase64, authTagBase64, data] = encrypted.split(':');
  const nonce = Buffer.from(nonceBase64, 'base64');
  const authTag = Buffer.from(authTagBase64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), nonce);
  decipher.setAuthTag(authTag);
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
  const nonce = crypto.randomBytes(12); // 12 bytes is optimal for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), nonce);
  let encrypted = cipher.update(content, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const authTag = cipher.getAuthTag();
  return `${nonce.toString('base64')}:${authTag.toString('base64')}:${encrypted}`;
}

// New function to handle environment-specific secrets
async function loadEnvironmentSecrets(env, projectId) {
  if (!projectId || !env) {
    log('warn', 'Skipping invalid environment config - missing projectId or environment name');
    return false;
  }

  if (!process.env.BWS_ACCESS_TOKEN) {
    log('warn', 'Skipping environment - BWS_ACCESS_TOKEN not set');
    return false;
  }

  try {
    // More concise logging
    log('debug', `Loading secrets for ${projectId}...`);

    // 3) Replace "./node_modules/.bin/bws" with getBwsCommand()
    const output = execSync(
      `${getBwsCommand()} secret list -t ${process.env.BWS_ACCESS_TOKEN} ${projectId} --output json`,
      {
        encoding: 'utf-8',
        env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' }
      }
    );

    let bwsSecrets;
    try {
      bwsSecrets = JSON.parse(output || '[]');
    } catch (parseError) {
      log('warn', `No valid secrets found for ${env}`);
      return false;
    }

    // Create the secure file
    const envContent = bwsSecrets.map(({ key, value }) => `${key}=${value}`).join('\n');
    if (process.env.BWS_EPHEMERAL_KEY && envContent) {
      const cipherText = encryptContent(envContent, process.env.BWS_EPHEMERAL_KEY);
      fs.writeFileSync(`.env.secure.${projectId}`, cipherText, { encoding: 'utf-8' });

      // Only show detailed counts in debug mode
      if (process.env.DEBUG === 'true') {
        log('debug', `Created .env.secure.${projectId} with ${bwsSecrets.length} secrets`);
      }
      return true;
    }
    return false;
  } catch (error) {
    if (error?.message?.includes('404 Not Found')) {
      log('warn', `Project ${projectId} (${env}): no secrets found or no access`);
      return false;
    }

    log('warn', `Failed to load secrets for ${env}`);
    if (process.env.DEBUG === 'true') {
      if (error?.stdout) log('debug', 'stdout:', error.stdout.toString());
      if (error?.stderr) log('debug', 'stderr:', error.stderr.toString());
      log('debug', 'Error:', error?.message || 'Unknown error');
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
    // Clean up all .env.secure.* files and .env.secure
    const files = fs.readdirSync(process.cwd());
    files.forEach((file) => {
      if (file === '.env.secure' || file.startsWith('.env.secure.')) {
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

// Update handleUploadCommand function to check for both formats
async function handleUploadCommand() {
  // Check if either --clearvars or --clear-vars was passed
  const clearVars = process.argv.includes('--clearvars') || process.argv.includes('--clear-vars');

  // Run the upload-secrets script with clearvars if specified
  const uploadScript = path.join(__dirname, 'upload-to-bws', 'upload-secrets.js');
  const args = clearVars ? ['--clearvars'] : [];

  const result = spawnSync('node', [uploadScript, ...args], {
    stdio: 'inherit',
    env: process.env
  });

  // Exit with the same status as the upload script
  process.exit(result.status);
}

// Main execution
(async () => {
  try {
    // Check for upload command
    const args = process.argv.slice(2);
    if (args[0] === '--upload-secrets') {
      await handleUploadCommand();
      return;
    }

    // 1. Always load base .env first (but don't override original env vars)
    dotenv.config({ override: false });
    log('debug', 'Loaded base environment from .env');

    // 2. Check if we need to scan for required vars
    const requiredVarsPath = path.join(__dirname, 'requiredVars.env');
    const isNetlify = process.env.NETLIFY === 'true';
    const isVercel = process.env.VERCEL === '1';
    const isDebug = process.env.DEBUG === 'true';

    // Only run environment scan for platform builds or debug mode
    if (!fs.existsSync(requiredVarsPath) || isNetlify || isVercel || isDebug) {
      log('info', 'Scanning for required variables...');
      const scanResult = spawnSync(
        'node',
        [path.join(__dirname, 'check-vars', 'requiredRuntimeVars.js')],
        {
          stdio: 'inherit'
        }
      );
      if (scanResult.status !== 0) {
        throw new Error('Failed to scan for required variables');
      }
    }

    // 3. Try BWS enhancement if possible
    try {
      const isValidToken = await validateBwsToken();
      if (isValidToken) {
        // Single setupEnvironment call that handles both cases
        await setupEnvironment({
          isPlatformBuild: isNetlify || isVercel
        });

        // Call map-env-files.js to show decrypted contents if requested
        const mapResult = spawnSync(
          'node',
          [path.join(__dirname, 'update-environments', 'map-env-files.js')],
          {
            stdio: 'inherit',
            env: process.env
          }
        );

        // Restore original variables after mapping
        Object.entries(originalEnvironment).forEach(([key, value]) => {
          process.env[key] = value;
        });
      } else {
        log('info', 'No valid BWS_ACCESS_TOKEN found, continuing with .env values only');
      }
    } catch (error) {
      log('warn', `BWS enhancement failed: ${error.message}`);
    }

    // 4. Run environment validation regardless
    log('info', 'Running environment validation...');
    const validator = spawnSync('node', [path.join(__dirname, 'env_validator.js')], {
      stdio: 'inherit',
      env: process.env
    });

    // 5. IMPORTANT: Restore original environment variables to ensure CLI-provided vars take precedence
    Object.entries(originalEnvironment).forEach(([key, value]) => {
      process.env[key] = value;
    });

    // 6. Execute the command
    const command = process.argv.slice(2);
    if (command.length === 0) {
      log('warn', 'No command provided to execute');
      process.exit(0);
    }

    const result = spawnSync(args.join(' '), [], {
      stdio: 'inherit',
      env: process.env,
      shell: true
    });

    process.exit(result.status);
  } catch (error) {
    log('error', error.message);
    process.exit(1);
  }
})();

// Comment out cleanup registrations
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
