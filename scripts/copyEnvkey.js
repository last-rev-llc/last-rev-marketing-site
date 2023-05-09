/* eslint-disable no-console */

// Import the required modules
const { readdir, copyFile } = require('fs-extra');
const { resolve } = require('path');

// Define the paths to the root directory, the directory containing the packages, and the .envkey file
const rootDir = resolve(__dirname, '..');
const packagesDir = resolve(rootDir, 'packages');
const envkeyFile = resolve(rootDir, '.envkey');

// Define a function that copies the .envkey file to each package directory
async function copyEnvkeyFile() {
  try {
    // Get the list of packages in the packages directory
    const packages = await readdir(packagesDir);

    // Initialize an empty array to store any errors that occur during copying
    const errors = [];

    // Use Promise.all to copy the .envkey file to each package directory in parallel
    await Promise.all(
      packages.map(async (packageName) => {
        const packageDir = resolve(packagesDir, packageName);
        const packageEnvkeyFile = resolve(packageDir, '.envkey');

        try {
          await copyFile(envkeyFile, packageEnvkeyFile);
        } catch (err) {
          // If an error occurs while copying, add it to the errors array
          errors.push(`${packageName}: ${err.message}`);
        }
      })
    );

    if (errors.length > 0) {
      // If there are any errors, output a failure message with a list of the directories that failed to copy the .envkey file
      console.log(`\x1b[31m\x1b[1m\x1b[5mError: Failed to copy .envkey file to the following directories:\x1b[0m`);
      console.log(errors.join('\n'));
      // Set the exit code to indicate failure
      process.exitCode = 1;
    } else {
      // If there are no errors, output a success message
      console.log('\x1b[32m\x1b[1m\x1b[5mSuccess: .envkey file copied to all directories.\x1b[0m');
    }
  } catch (err) {
    // If an error occurs during the copy operation, log the error and set the exit code to indicate failure
    console.log('CopyEnvkey Error', err);
    process.exitCode = 1;
  }
}

// Call the copyEnvkeyFile function to copy the .envkey file to each package directory
copyEnvkeyFile().catch((err) => {
  // If an unhandled error occurs, log the error and set the exit code to indicate failure
  console.error(err);
  process.exitCode = 1;
});
