// Validate the required environment variables before starting the build process.
const fs = require('fs');
const path = require('path');

// Define the path for the skip validator flag
const skipValidatorFlagPath = path.join(__dirname, 'flags', 'skip_validator.flag');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m' // Added for skip flag instructions
};

// Immediately exit if skip flag exists
if (fs.existsSync(skipValidatorFlagPath)) {
  console.log(
    `${colors.yellow}Environment validation is skipped by flag. To re-enable validation, remove '${colors.green}${skipValidatorFlagPath}'.${colors.reset}`
  );
  process.exit(0);
}

// Check if the script is running in a Continuous Integration (CI) environment like Netlify or Vercel
const isCIEnvironment = process.env.NETLIFY === 'true' || process.env.VERCEL === 'true';

// Common environment variables that are not directly related to the app's configuration and can be excluded.
const envCheckExclusions = ['DEPLOY_URL', 'VERCEL_URL', 'CONTENTFUL_SETTINGS_ID', 'SITE_ID', 'SITE_SETTINGS'];

// Function to read and parse turbo.json to get required environment variables
const getRequiredEnvVars = () => {
  try {
    const turboConfigPath = path.join(__dirname, '../../turbo.json');
    const turboConfig = JSON.parse(fs.readFileSync(turboConfigPath, 'utf8'));
    return turboConfig.globalEnv;
  } catch (error) {
    console.error(`${colors.red}Failed to read or parse 'turbo.json':${error}${colors.reset}`);
    process.exit(1); // Exit if there's an error reading the config
  }
};

// Function to get missing environment variables
const getMissingEnvVars = () => {
  const requiredEnvVars = getRequiredEnvVars();
  return requiredEnvVars.filter((varName) => !process.env[varName] && !envCheckExclusions.includes(varName));
};

console.log(`${colors.cyan}Starting environment checks...${colors.reset}`);

const missingVars = getMissingEnvVars();

// Check for any missing environment variables and display an error if any are found.
if (missingVars.length > 0) {
  console.error(
    `${colors.red}ERROR: The following required environment variables are missing or empty:${colors.reset}`
  );
  missingVars.forEach((varName) => console.error(`${colors.yellow}  - ${varName}${colors.reset}`));

  console.error(
    colors.red +
      '\nExiting due to missing environment variables.\nPlease update your environment and try again.\n ' +
      colors.reset +
      colors.blue +
      '\nIf you believe that this is an error, please add an exception to the envCheckExclusions array in env_validator.js and try again.' +
      colors.reset +
      '\n'
  );

  process.exit(1);
} else {
  console.log(`${colors.green}All required environment variables are set. Continuing build...${colors.reset}`);
}
