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
