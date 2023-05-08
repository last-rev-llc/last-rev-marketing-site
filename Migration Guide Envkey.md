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

```
## Ignore .envkey in all directories except root directory
\*\*/.envkey
!.envkey
```

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

## Add fs-extra to dependencies

```
nvm use
yarn add fs-extra -W
```

# Check the contents of the files in build.sh and dev.sh and see if they can be updated directly

# Start of Updated build.sh Script

```
#!/bin/bash

# Installing Envkey on Server, skips if it assumes it's running locally.
yarn installEnvkey

# Load the environment variables into all packages for the monorepo
yarn copyEnvkey

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

# Installing Envkey on Server, skips if it assumes it's running locally.
yarn installEnvkey

# Load the environment variables into all packages for the monorepo
yarn copyEnvkey

# Function to run on exit, kills pm2 process and exits with the same exit code as the previous command
function cleanup() {
    rv=$?
    yarn gql:pm2:kill
    exit $rv
}

# Run cleanup function on exit
trap "cleanup" EXIT

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

# Start of NEW File called installEnvkey.sh Script

```
#!/bin/bash

# Function to install envkey-source
# Parameters:
#   $1 - A string representing the sed command to modify the installation script
install_envkey_source() {
  # Get the latest version of envkey-source
  local version=$(curl -s https://envkey-releases.s3.amazonaws.com/latest/envkeysource-version.txt)

  # Modify the installation script using the sed command passed as a parameter
  local install_cmd=$1

  # Execute the modified installation script and check if the installation was successful
  if curl -s https://envkey-releases.s3.amazonaws.com/envkeysource/release_artifacts/$version/install.sh | sed "$install_cmd" | bash > /dev/null 2>&1; then
    echo -e "\033[32m\033[1menvkey-source installed successfully.\033[0m"
  else
    echo -e "\033[31m\033[1m\033[5menvkey-source installation failed.\033[0m"
  fi
}

# Check if the script is running on Netlify
if [[ ! -z "${NETLIFY_BUILD_BASE}" ]]; then
  # Get the current working directory
  current_dir=$(pwd)

  # Call the install_envkey_source function with a sed command to adjust the installation directory
  install_envkey_source "s|/usr/local/bin|$current_dir/node_modules/.bin|g"

# Check if the script is running on Vercel
elif [[ ! -z "${VERCEL_ENV}" ]]; then
  # Call the install_envkey_source function with a sed command to remove the sudo command for Vercel
  install_envkey_source 's/sudo mv/mv/g'

# If not running on Netlify or Vercel, assume it's running locally and skip the installation
else
  echo "Install Skipped, assuming it's running locally."
fi

```

# End of NEW File called installEnvkey.sh Script

## Update all build scripts to be executable again

`chmod +x script.sh`

```
chmod +x scripts/installEnvkey.sh
chmod +x scripts/build.sh
chmod +x scripts/dev.sh
```
