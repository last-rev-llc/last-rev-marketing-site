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
      execSync('sh scripts/bws-secure/bws-installer.sh', { stdio: 'inherit' });
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
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  const ivBase64 = iv.toString('base64');
  return `${ivBase64}:${encrypted}`;
}

function decryptContent(encrypted, encryptionKey) {
  const [ivBase64, data] = encrypted.split(':');
  const iv = Buffer.from(ivBase64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), iv);
  let decrypted = decipher.update(data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function loadBwsSecrets(encryptionKey) {
  // Always load from .env file first
  const envConfig = dotenv.config();
  const envToken = envConfig.parsed?.BWS_ACCESS_TOKEN;

  // Override any existing token with the one from .env
  if (envToken) {
    process.env.BWS_ACCESS_TOKEN = envToken;
  }

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
    return '';
  }

  try {
    ensureBwsInstalled();
    let mergedVars = {};

    // First, try to load global secrets (auth tokens)
    try {
      console.log('Debug: Loading global secrets...');

      const output = execSync(
        `./node_modules/.bin/bws secret list -t ${process.env.BWS_ACCESS_TOKEN} -o env`,
        {
          encoding: 'utf-8',
          env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' }
        }
      );

      // Always clean the output, even without DEBUG
      const cleanOutput = output.replace(/\u001b\[\d+m/g, '').trim();
      const globalSecrets = cleanOutput.split('\n').reduce((acc, line) => {
        const [key, value] = line.split('=');
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {});

      // Only include auth tokens in mergedVars
      globalSecrets.forEach(({ key, value }) => {
        if (key === 'NETLIFY_AUTH_TOKEN' || key === 'VERCEL_AUTH_TOKEN') {
          mergedVars[key] = value;
          console.log('Debug: Found auth token:', key);
        }
      });
    } catch (globalError) {
      console.warn('Warning: Failed to load global secrets:', globalError.message);
    }

    // Then, if we have a project ID, load project-specific secrets
    if (process.env.BWS_PROJECT_ID) {
      try {
        console.log('Debug: Loading project secrets for:', process.env.BWS_PROJECT_ID);

        const projectOutput = execSync(
          `./node_modules/.bin/bws secret list ${process.env.BWS_PROJECT_ID} -t ${process.env.BWS_ACCESS_TOKEN} -o env`,
          {
            encoding: 'utf-8',
            env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' }
          }
        );

        const projectSecrets = projectOutput.split('\n').reduce((acc, line) => {
          const [key, value] = line.split('=');
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {});

        projectSecrets.forEach(({ key, value }) => {
          if (key && value) mergedVars[key] = value;
        });
        console.log('Debug: Loaded project secrets:', Object.keys(mergedVars).length);
      } catch (projectError) {
        console.warn('Warning: Failed to load project secrets:', projectError.message);
      }
    }

    const envContent = Object.entries(mergedVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Only create .env.secure if we have content
    if (encryptionKey && envContent) {
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

    return envContent;
  } catch (error) {
    if (process.env.BWS_ACCESS_TOKEN) {
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
