/* eslint-disable no-console */
const { readdir, copyFile, existsSync, unlinkSync, writeFileSync } = require('fs-extra');
const { resolve, join } = require('path');

const run = async () => {
  const envKeyFile = resolve(__dirname, '../.envkey');
  const rootEnvFile = resolve(__dirname, '../.env');
  const packagesDir = resolve(__dirname, '../packages');
  const packages = await readdir(packagesDir);
  const removeEnvFirstRunFile = resolve(__dirname, './removeEnvFirstRun');
  const firstRun = !existsSync(removeEnvFirstRunFile);

  try {
    await Promise.all(
      packages.map(async (packageName) => {
        if (packageName !== '.DS_Store') {
          const newEnvKey = join(packagesDir, packageName, '.envkey');
          const oldEnv = join(packagesDir, packageName, '.env');

          // If it's the first run, delete the existing .env file in the package directory
          if (firstRun && existsSync(oldEnv)) {
            unlinkSync(oldEnv);
            console.log(`Removed .env file in package: ${packageName}`);
          }

          await copyFile(envKeyFile, newEnvKey);
        }
      })
    );

    // If it's the first run, delete the root .env file
    if (firstRun && existsSync(rootEnvFile)) {
      unlinkSync(rootEnvFile);
      console.log('Removed root .env file');
    }

    // If it's the first run, create the removeEnvFirstRun file
    if (firstRun) {
      writeFileSync(removeEnvFirstRunFile, 'This file is created after the first run of the script');
      console.log('First run completed. Set removeEnvFirstRun flag.');
      console.log('If necessary, this flag can be removed by deleting the file: /scripts/removeEnvFirstRun');
    }
  } catch (err) {
    console.log('\x1b[31m', 'PropagateEnvKey Error', err, '\x1b[0m');
  }
};

run()
  .then(() => {
    console.log('\x1b[34m%s\x1b[0m', 'Successfully propagated .envkey file to packages');
    process.exit(0);
  })
  .catch((e) => {
    console.error('\x1b[31m%s\x1b[0m', `Problem propagating .envkey file: ${e.message}`);
    process.exit(1);
  });
