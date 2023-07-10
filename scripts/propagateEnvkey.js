/* eslint-disable no-console */
const { readdir, copyFile } = require('fs-extra');
const { resolve, join } = require('path');

const run = async () => {
  const envKeyFile = resolve(__dirname, '../.envkey');
  const packagesDir = resolve(__dirname, '../packages');
  const packages = await readdir(packagesDir);

  try {
    await Promise.all(
      packages.map(async (packageName) => {
        if (packageName !== '.DS_Store') {
          const newEnvKey = join(packagesDir, packageName, '.envkey');
          await copyFile(envKeyFile, newEnvKey);
        }
      })
    );
  } catch (err) {
    console.log('PropagateEnvKey Error', err);
  }
};

run()
  .then(() => {
    console.log('successfully propagated .envkey file to packages');
    process.exit(0);
  })
  .catch((e) => {
    console.error(`Problem propagating .envkey file: ${e.message}`);
    process.exit(1);
  });
