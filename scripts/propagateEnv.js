/* eslint-disable no-console */
const { readdir, copyFile } = require('fs-extra');
const { resolve, join } = require('path');

const run = async () => {
  const rootDir = resolve(__dirname, '../');
  const packagesDir = resolve(rootDir, 'packages');
  const packages = await readdir(packagesDir);

  // Define files to copy
  const filesToCopy = ['.env', '.env.vault'];

  try {
    await Promise.all(
      packages.map(async (packageName) => {
        if (packageName !== '.DS_Store') {
          await Promise.all(
            filesToCopy.map(async (fileName) => {
              const sourceFile = join(rootDir, fileName);
              const destFile = join(packagesDir, packageName, fileName);
              await copyFile(sourceFile, destFile);
            })
          );
        }
      })
    );
  } catch (err) {
    console.log('PropagateEnv Error', err);
  }
};

run()
  .then(() => {
    console.log('successfully propagated .env and .env.vault files to packages');
    process.exit(0);
  })
  .catch((e) => {
    console.error(`Problem propagating files: ${e.message}`);
    process.exit(1);
  });
