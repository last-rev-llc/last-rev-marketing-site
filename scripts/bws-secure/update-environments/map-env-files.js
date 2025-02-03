#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { log } = require('./utils');

// Debug logging for environment variables
if (process.env.DEBUG === 'true') {
  log('debug', 'Environment variables in map-env-files:');
  log('debug', `DEBUG: ${process.env.DEBUG}`);
  log('debug', `SHOW_DECRYPTED: ${process.env.SHOW_DECRYPTED}`);
  log('debug', `BWS_EPHEMERAL_KEY: ${process.env.BWS_EPHEMERAL_KEY ? '✓ Present' : '❌ Missing'}`);
}

function decryptContent(encrypted, encryptionKey) {
  const [ivBase64, authTagBase64, data] = encrypted.split(':');
  const iv = Buffer.from(ivBase64, 'base64');
  const authTag = Buffer.from(authTagBase64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(encryptionKey, 'hex'), iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function createSymlink(source, target) {
  try {
    if (fs.existsSync(target)) {
      fs.unlinkSync(target);
    }
    fs.symlinkSync(source, target);
    log('info', `Created symlink: ${target} -> ${source}`);
  } catch (error) {
    log('error', `Failed to create symlink ${target}: ${error.message}`);
  }
}

async function mapEnvironmentFiles() {
  try {
    const configPath = path.join(__dirname, '../../../bwsconfig.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    const currentProject = config.projects.find((p) => p.projectName === process.env.BWS_PROJECT);
    if (!currentProject) {
      log('warn', `Project ${process.env.BWS_PROJECT} not found in config`);
      return;
    }

    const env = process.env.BWS_ENV || 'local';
    const projectId = currentProject.bwsProjectIds[env];
    const sourceFile = `.env.secure.${projectId}`;
    const target = `.env.secure.${currentProject.projectName}.${env}`;

    // Create symlink for current environment
    if (fs.existsSync(sourceFile)) {
      createSymlink(sourceFile, target);

      // Show decrypted contents if debug and show_decrypted are enabled
      if (
        process.env.DEBUG === 'true' &&
        process.env.SHOW_DECRYPTED === 'true' &&
        process.env.BWS_EPHEMERAL_KEY
      ) {
        try {
          const content = fs.readFileSync(sourceFile, 'utf8');
          const decrypted = decryptContent(content, process.env.BWS_EPHEMERAL_KEY);

          // Calculate max width needed for the box
          const lines = decrypted.split('\n');
          const titleLine = `Decrypted contents of ${sourceFile}`;
          const maxContentWidth = Math.max(...lines.map((line) => line.length), titleLine.length);
          const boxWidth = maxContentWidth + 4;

          // Output the box
          console.log(`\n\x1b[36m╔${'═'.repeat(boxWidth - 2)}╗`);
          console.log(`║ ${titleLine.padEnd(boxWidth - 3)}║`);
          console.log(`║${'═'.repeat(boxWidth - 2)}║`);
          lines.forEach((line) => {
            console.log(`║ ${line.padEnd(boxWidth - 3)}║`);
          });
          console.log(`╚${'═'.repeat(boxWidth - 2)}╝\x1b[0m\n`);
        } catch (error) {
          log('error', `Error decrypting ${sourceFile}:`, error.message);
        }
      }
    } else {
      log('debug', `Source file not found: ${sourceFile}`);
    }

    // Create symlinks for other environments (needed for platform deployments)
    Object.entries(currentProject.bwsProjectIds).forEach(([envName, id]) => {
      if (envName !== env) {
        const otherSource = `.env.secure.${id}`;
        const otherTarget = `.env.secure.${currentProject.projectName}.${envName}`;
        if (fs.existsSync(otherSource)) {
          createSymlink(otherSource, otherTarget);
        }
      }
    });
  } catch (error) {
    log('error', 'Error mapping environment files:', error.message);
    process.exit(1);
  }
}

mapEnvironmentFiles();
