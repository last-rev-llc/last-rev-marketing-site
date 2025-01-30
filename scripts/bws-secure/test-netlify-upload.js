const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { updateNetlifyEnvVars } = require('./update-environments/netlify.js');
const { log, validatePlatform } = require('./update-environments/utils.js');
const dotenv = require('dotenv');

// Load .env file if it exists
dotenv.config();

async function testNetlifyUpload() {
  try {
    // Load bwsconfig.json
    const configPath = path.join(__dirname, 'bwsconfig.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    // Find Netlify project
    const netlifyProject = config.projects.find((p) => p.platform === 'netlify');
    if (!netlifyProject) {
      throw new Error('No Netlify project found in bwsconfig.json');
    }

    const project = {
      platform: 'netlify',
      projectName: netlifyProject.projectName,
      bwsProjectIds: netlifyProject.bwsProjectIds,
      preserveVars: netlifyProject.preserveVars || ['BWS_ACCESS_TOKEN']
    };

    // Set up Netlify environment
    process.env.NETLIFY = 'true';
    process.env.CONTEXT = 'production';
    process.env.BWS_ENV = 'prod'; // This is key for getting the right secrets

    // Test production environment
    await updateNetlifyEnvVars(project);

    log('info', 'All Netlify environment tests completed successfully');
  } catch (error) {
    log('error', `Test failed: ${error.message}`);
    throw error;
  }
}

// Update validation to only require BWS_ACCESS_TOKEN
function validateEnvironment() {
  const requiredVars = ['BWS_ACCESS_TOKEN'];
  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    console.error('\nMissing required environment variables:');
    console.error(missing.map((v) => `  - ${v}`).join('\n'));
    console.error('\nPlease set these variables before running the test.\n');
    process.exit(1);
  }
}

// Main execution
if (require.main === module) {
  validateEnvironment();
  testNetlifyUpload().catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  });
}

module.exports = { testNetlifyUpload };
