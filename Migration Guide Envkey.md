Modify package.json scripts
ADD:

```
    "copyEnvkey": "node scripts/copyEnvkey.js",
```

Remove:

```
    "propagate:env": "node scripts/propagateEnv.js",
```

## Update gitignore file(s) with the following

## Ignore .envkey in all directories except root directory

\*\*/.envkey
!.envkey

## Update build scripts after copy to be executable again

chmod +x script.sh

## ADD the .envkey file!!

```
es init
```

Initialize the correct app in Envkey which will add the .envkey file

## Do a find and replace on the repo for the following 2 items

### Item 1 - requiring envkey instead of dotenv

Replace:

```
require('dotenv').config();
```

With:

```
require('envkey');
```

### Item 2 - package.json Update(s) -> Make sure there aren't other dotenv versions

Replace:

```
"dotenv": "^10.0.0",
```

With:

```
"envkey": "^2.3.2",
```

## Yarn on Root - Update the yarn.lock file on root

# Check the contents of the files in build.sh and dev.sh and see if they can be updated directly

# Start of Updated build.sh Script

```
#!/bin/bash

# Installing Envkey on Server, skips if it assume it's running locally.
bash $PWD/scripts/installEnvkey.sh

# Load the environment variables from EnvKey
set -a
eval $(envkey-source)
set +a

# Function to run on exit, runs post-build script and handles build failure
function cleanup() {
    rv=$?
    bash "$PWD/scripts/post_build.sh"
    if [[ "$rv" != "0" ]]; then
        # Print error message if build fails
        echo "Build failed."

        # If the environment is production, print PM2 logs
        if [[ "$NODE_ENV" == "production" ]]; then
            echo "Printing PM2 logs..."
            yarn pm2 logs --nostream --lines=1000
        fi
    fi
    exit $rv
}

# Run cleanup function on exit
trap "cleanup" EXIT

# Load the environment variables into all packages for the monorepo
yarn copyEnvkey

# Run pre-build script
bash "$PWD/scripts/pre_build.sh"

# Run build and cleanup pm2 if it fails
echo "Building..."
STAGE=build yarn turbo:build --output-logs=new-only $1 || echo "Build failed. Please check logs for more information."
```

# END of Updated build.sh Script

# Start of Updated dev.sh Script

```
#!/bin/bash

# Installing Envkey on Server, skips if it assume it's running locally.
bash $PWD/scripts/installEnvkey.sh

# Load the environment variables from EnvKey, and fail the script if it fails
set -a
eval $(envkey-source) || { echo "Error: Failed to load environment variables from EnvKey. Please make sure EnvKey is set up properly and try again."; exit 1; }
set +a

# Function to run on exit, kills pm2 process and exits with the same exit code as the previous command
function cleanup() {
    rv=$?
    yarn gql:pm2:kill
    exit $rv
}

# Run cleanup function on exit
trap "cleanup" EXIT

# Load the environment variables into all packages for the monorepo
yarn copyEnvkey

# Start the develop server
echo "Starting develop server..."

# If using the fs runner strategy, sync the CMS data
if [[ "${GRAPHQL_RUNNER_STRATEGY}" == "fs" ]] || [[ -z "${GRAPHQL_RUNNER_STRATEGY}" ]]; then
    echo "Syncing CMS data..."
    turbo run sync:cms
fi

# Start the develop server and output logs
turbo run dev --output-logs=new-only || { echo "Error: Failed to start develop server. Please check logs for more information."; exit 1; }
```

# END of Updated dev.sh Script

# Start of NEW File called copyEnvkey.js Script

```
/* eslint-disable no-console */

// Import the required modules
const { readdir, copyFile } = require('fs-extra');
const { resolve } = require('path');

// Define the paths to the root directory, the directory containing the packages, and the .envkey file
const rootDir = resolve(__dirname, '..');
const packagesDir = resolve(rootDir, 'packages');
const envkeyFile = resolve(rootDir, '.envkey');

// Define a function that copies the .envkey file to each package directory
const run = async () => {
  // Get the list of packages in the packages directory
  const packages = await readdir(packagesDir);

  // Initialize an empty array to store any errors that occur during copying
  const errors = [];

  try {
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
  } catch (err) {
    // If an error occurs during the copy operation, exit the process with a non-zero code
    console.log('CopyEnvkey Error', err);
    process.exit(1);
  }

  if (errors.length > 0) {
    // If there are any errors, output a failure message with a list of the directories that failed to copy the .envkey file
    console.log(`\x1b[31m\x1b[1m\x1b[5mError: Failed to copy .envkey file to the following directories:\x1b[0m`);
    console.log(errors.join('\n'));
    process.exit(1);
  } else {
    // If there are no errors, output a success message
    console.log('\x1b[32m\x1b[1m\x1b[5mSuccess: .envkey file copied to all directories.\x1b[0m');
    process.exit(0);
  }
};

// Call the run function to copy the .envkey file to each package directory
run();
```

# End of NEW File called copyEnvkey.js Script
