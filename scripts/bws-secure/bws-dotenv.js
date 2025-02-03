const fs = require('fs');
const { execSync } = require('child_process');
const logger = require('./logger');
const crypto = require('crypto');
const path = require('path');
const dotenv = require('dotenv');

function ensureBwsInstalled() {
  const bwsPath = './node_modules/.bin/bws';

  if (!fs.existsSync(bwsPath)) {
    logger.info('bws binary not found. Running bws-installer.sh...');
    try {
      execSync('sh', ['scripts/bws-secure/bws-installer.sh'], {
        stdio: 'inherit',
        shell: false
      });
    } catch (error) {
      logger.error(`Error running bws-installer.sh: ${error.message}`);
      process.exit(1);
    }

    if (!fs.existsSync(bwsPath)) {
      logger.error('bws binary is still missing after running the installer.');
      process.exit(1);
    }

    logger.info('bws installed successfully.');
  }
}

function encryptContent(plaintext, encryptionKey) {
  const nonce = crypto.randomBytes(12); // 12 bytes is optimal for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), nonce);
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const authTag = cipher.getAuthTag();
  return `${nonce.toString('base64')}:${authTag.toString('base64')}:${encrypted}`;
}

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

/**
 * Displays a warning message when BWS token is missing
 * Extracted to reduce cognitive complexity while maintaining exact warning format
 */
function displayBwsTokenMissingWarning() {
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
}

/**
 * Displays an error message when BWS token is invalid
 * Extracted to reduce cognitive complexity while maintaining exact error format
 */
function displayCriticalTokenError() {
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
}

/**
 * Loads global secrets from BWS
 * @returns {Object} Object containing global secrets
 */
function loadGlobalSecrets() {
  console.log('Debug: Loading global secrets...');

  // NOSONAR: BWS CLI execution with system-controlled variables - no user input
  const output = execSync(
    `./node_modules/.bin/bws secret list -t ${process.env.BWS_ACCESS_TOKEN} -o env`,
    {
      encoding: 'utf-8',
      env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' }
    }
  );

  // These are data processing operations, not command executions
  const cleanOutput = output.replace(/\u001b\[\d+m/g, '').trim();
  return cleanOutput.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

/**
 * Loads project-specific secrets from BWS
 * @param {string} projectId - The BWS project ID
 * @returns {Object} Object containing project secrets
 */
function loadProjectSecrets(projectId) {
  console.log('Debug: Loading project secrets for:', projectId);

  // NOSONAR: BWS CLI execution with system-controlled variables - no user input
  /* sonar-disable-next-line sonar:S4721 */
  const projectOutput = execSync(
    `./node_modules/.bin/bws secret list ${projectId} -t ${process.env.BWS_ACCESS_TOKEN} -o env`,
    {
      encoding: 'utf-8',
      env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' }
    }
  );

  return projectOutput.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

/**
 * Handles the encryption of environment content and debug output
 * @param {string} envContent - Content to encrypt
 * @param {string} encryptionKey - Key used for encryption
 */
function handleEncryption(envContent, encryptionKey) {
  if (!encryptionKey || !envContent) return;

  try {
    const cipherText = encryptContent(envContent, encryptionKey);
    fs.writeFileSync('.env.secure', cipherText, { encoding: 'utf-8' });
    console.log('Debug: Created .env.secure file');

    // Add decryption output if debug and show_decrypted are enabled
    if (process.env.DEBUG === 'true' && process.env.SHOW_DECRYPTED === 'true') {
      console.log('\nDecrypted contents:');
      console.log('-------------------------------------');
      console.log(envContent);
      console.log('-------------------------------------\n');
    }
  } catch (error) {
    console.warn(`Failed to encrypt content: ${error.message}`);
  }
}

function processGlobalSecrets(globalSecrets, mergedVars) {
  // Also just data processing
  Object.entries(globalSecrets).forEach(([key, value]) => {
    if (key === 'NETLIFY_AUTH_TOKEN' || key === 'VERCEL_AUTH_TOKEN') {
      mergedVars[key] = value;
      console.log('Debug: Found auth token:', key);
    }
  });
}

function processProjectSecrets(projectSecrets, mergedVars) {
  // More data processing
  Object.entries(projectSecrets).forEach(([key, value]) => {
    if (key && value) mergedVars[key] = value;
  });
  console.log('Debug: Loaded project secrets:', Object.keys(mergedVars).length);
}

/**
 * Main function to load BWS secrets
 * Refactored to reduce cognitive complexity while maintaining exact functionality
 * @param {string} encryptionKey - Key used for encryption
 * @returns {string} Environment content or empty string on failure
 */
function loadBwsSecrets(encryptionKey) {
  // Always load from .env file first
  const envConfig = dotenv.config();
  const envToken = envConfig.parsed?.BWS_ACCESS_TOKEN;

  // Override any existing token with the one from .env
  if (envToken) {
    process.env.BWS_ACCESS_TOKEN = envToken;
  }

  if (!process.env.BWS_ACCESS_TOKEN) {
    displayBwsTokenMissingWarning();
    return '';
  }

  try {
    ensureBwsInstalled();
    let mergedVars = {};

    try {
      const globalSecrets = loadGlobalSecrets();
      processGlobalSecrets(globalSecrets, mergedVars);
    } catch (globalError) {
      console.warn('Warning: Failed to load global secrets:', globalError.message);
    }

    if (process.env.BWS_PROJECT_ID) {
      try {
        const projectSecrets = loadProjectSecrets(process.env.BWS_PROJECT_ID);
        processProjectSecrets(projectSecrets, mergedVars);
      } catch (projectError) {
        console.warn('Warning: Failed to load project secrets:', projectError.message);
      }
    }

    const envContent = Object.entries(mergedVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    handleEncryption(envContent, encryptionKey);
    return envContent;
  } catch (error) {
    if (process.env.BWS_ACCESS_TOKEN) {
      displayCriticalTokenError();
    }
    return '';
  }
}

async function loadEnvironmentSecrets(env, projectId) {
  try {
    // Create secure file path using project ID
    const secureFile = path.join(process.cwd(), `.env.secure.${projectId}`);

    console.log(`Loading secrets for project ID: ${projectId}...`);

    // Set BWS_PROJECT_ID for this environment
    process.env.BWS_PROJECT_ID = projectId;

    // Load secrets from BWS
    const envContent = loadBwsSecrets(process.env.BWS_EPHEMERAL_KEY);

    if (envContent) {
      // Write encrypted content to file
      const cipherText = encryptContent(envContent, process.env.BWS_EPHEMERAL_KEY);
      fs.writeFileSync(secureFile, cipherText);

      // Show decrypted contents if debug and show_decrypted are enabled
      if (process.env.DEBUG === 'true' && process.env.SHOW_DECRYPTED === 'true') {
        console.log(`\nDecrypted contents of ${secureFile}:`);
        console.log('-------------------------------------');
        console.log(envContent);
        console.log('-------------------------------------\n');
      }

      // Track created files for later use
      const createdFiles = JSON.parse(process.env.BWS_CREATED_FILES || '[]');
      if (!createdFiles.includes(projectId)) {
        createdFiles.push(projectId);
        process.env.BWS_CREATED_FILES = JSON.stringify(createdFiles);
      }

      console.log(`Created secure file: ${secureFile}`);
      return true;
    }
  } catch (error) {
    console.warn(`Warning: Failed to load secrets for project ID ${projectId}: ${error.message}`);
  }
  return false;
}

// Export the function rather than auto-running it
module.exports = { loadBwsSecrets, loadEnvironmentSecrets };
