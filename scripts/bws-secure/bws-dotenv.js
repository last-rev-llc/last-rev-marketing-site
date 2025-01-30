const fs = require('fs');
const { execSync } = require('child_process');
const logger = require('./logger');
const crypto = require('crypto');
const path = require('path');

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
  if (!process.env.BWS_ACCESS_TOKEN) {
    // prettier-ignore
    {
      console.warn('\x1b[33m╔════════════════════════════════════════════════════════╗\x1b[0m');
      console.warn('\x1b[33m║                                                        ║\x1b[0m');
      console.warn('\x1b[33m║                                                        ║\x1b[0m');
      console.warn('\x1b[33m║             WARNING: BWS TOKEN MISSING                 ║\x1b[0m');
      console.warn('\x1b[33m║     BWS_ACCESS_TOKEN is not set; skipping secrets.     ║\x1b[0m');
      console.warn('\x1b[33m║                                                        ║\x1b[0m');
      console.warn('\x1b[33m║                                                        ║\x1b[0m');
      console.warn('\x1b[33m╚════════════════════════════════════════════════════════╝\x1b[0m');
    }
    return '';
  }

  try {
    ensureBwsInstalled();
    let mergedVars = {};

    // First, if we're on a platform, load the auth tokens
    if (process.env.NETLIFY === 'true' || process.env.VERCEL === '1') {
      // Load global secrets (auth tokens)
      const globalOutput = execSync('./node_modules/.bin/bws secret list --output json', {
        encoding: 'utf-8',
        env: {
          ...process.env,
          NO_COLOR: '1',
          FORCE_COLOR: '0'
        }
      });

      const globalSecrets = JSON.parse(globalOutput);

      // Check for platform-specific tokens
      if (process.env.NETLIFY === 'true') {
        const hasNetlifyToken = globalSecrets.some((s) => s.key === 'NETLIFY_AUTH_TOKEN');
        if (hasNetlifyToken) {
          mergedVars['NETLIFY_AUTH_TOKEN'] = globalSecrets.find(
            (s) => s.key === 'NETLIFY_AUTH_TOKEN'
          ).value;
          logger.info('Netlify auth token loaded successfully.');
        } else {
          logger.warn('Netlify auth token not found in global secrets.');
        }
      }

      if (process.env.VERCEL === '1') {
        const hasVercelToken = globalSecrets.some((s) => s.key === 'VERCEL_AUTH_TOKEN');
        if (hasVercelToken) {
          mergedVars['VERCEL_AUTH_TOKEN'] = globalSecrets.find(
            (s) => s.key === 'VERCEL_AUTH_TOKEN'
          ).value;
          logger.info('Vercel auth token loaded successfully.');
        } else {
          logger.warn('Vercel auth token not found in global secrets.');
        }
      }

      // Additional debug info if needed
      if (process.env.DEBUG) {
        // Only check for tokens relevant to the current platform
        if (process.env.NETLIFY === 'true') {
          const hasNetlifyToken = globalSecrets.some((s) => s.key === 'NETLIFY_AUTH_TOKEN');
          console.log('Auth token status:', {
            netlify: hasNetlifyToken ? 'found' : 'missing'
          });
        }
        if (process.env.VERCEL === '1') {
          const hasVercelToken = globalSecrets.some((s) => s.key === 'VERCEL_AUTH_TOKEN');
          console.log('Auth token status:', {
            vercel: hasVercelToken ? 'found' : 'missing'
          });
        }
      }
    }

    // Then, if we have a project ID, load project-specific secrets
    if (process.env.BWS_PROJECT_ID) {
      const projectOutput = execSync(
        `./node_modules/.bin/bws secret list -t ${process.env.BWS_ACCESS_TOKEN} ${process.env.BWS_PROJECT_ID} --output json`,
        {
          encoding: 'utf-8',
          env: {
            ...process.env,
            NO_COLOR: '1',
            FORCE_COLOR: '0'
          }
        }
      );

      const projectSecrets = JSON.parse(projectOutput);
      projectSecrets.forEach(({ key, value }) => {
        if (key && value) mergedVars[key] = value;
      });
      logger.info(`Project secrets loaded successfully for ${process.env.BWS_PROJECT_ID}`);
    }

    const envContent = Object.entries(mergedVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Only create .env.secure if we're not loading project-specific secrets
    if (!process.env.BWS_PROJECT_ID && encryptionKey && envContent) {
      try {
        const cipherText = encryptContent(envContent, encryptionKey);
        fs.writeFileSync('.env.secure', cipherText, { encoding: 'utf-8' });
        logger.info('Secret .env.secure file created.');
      } catch (error) {
        logger.warn(`Failed to encrypt content: ${error.message} - continuing without encryption`);
      }
    }

    return envContent;
  } catch (error) {
    if (process.env.BWS_ACCESS_TOKEN) {
      // prettier-ignore
      {
        console.error('\x1b[31m╔════════════════════════════════════════════════════════╗\x1b[0m');
        console.error('\x1b[31m║                                                        ║\x1b[0m');
        console.error('\x1b[31m║                                                        ║\x1b[0m');
        console.error('\x1b[31m║             CRITICAL BWS TOKEN ERROR                   ║\x1b[0m');
        console.error('\x1b[31m║     BWS_ACCESS_TOKEN is present but invalid!           ║\x1b[0m');
        console.error('\x1b[31m║                                                        ║\x1b[0m');
        console.error('\x1b[31m║                                                        ║\x1b[0m');
        console.error('\x1b[31m╚════════════════════════════════════════════════════════╝\x1b[0m');
      }
      console.error('Continuing anyway despite the invalid token...');
    } else {
      console.warn(
        `[WARNING] BWS_ACCESS_TOKEN not set; skipping BWS secrets. Error: ${error.message}`
      );
    }
    return '';
  }
}

async function loadEnvironmentSecrets(env, projectId) {
  try {
    // Create secure file path
    const secureFile = path.join(process.cwd(), `.env.secure.${env}`);

    console.log(`Loading secrets for ${env} environment (${projectId})...`);

    // Set BWS_PROJECT_ID for this environment
    process.env.BWS_PROJECT_ID = projectId;

    // Load secrets from BWS
    const envContent = loadBwsSecrets(process.env.BWS_EPHEMERAL_KEY);

    if (envContent) {
      // Write encrypted content to file
      const cipherText = encryptContent(envContent, process.env.BWS_EPHEMERAL_KEY);
      fs.writeFileSync(secureFile, cipherText);

      // Track created files for later use
      const createdFiles = JSON.parse(process.env.BWS_CREATED_FILES || '[]');
      if (!createdFiles.includes(env)) {
        createdFiles.push(env);
        process.env.BWS_CREATED_FILES = JSON.stringify(createdFiles);
      }

      return true;
    }
  } catch (error) {
    console.warn(`Warning: Failed to load secrets for ${env}: ${error.message}`);
  }
  return false;
}

// Export the function rather than auto-running it
module.exports = { loadBwsSecrets, loadEnvironmentSecrets };
