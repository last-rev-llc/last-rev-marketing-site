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
node $PWD/scripts/copyEnvkey.js 

# Start the develop server
echo "Starting develop server..."

# If using the fs runner strategy, sync the CMS data
if [[ "${GRAPHQL_RUNNER_STRATEGY}" == "fs" ]] || [[ -z "${GRAPHQL_RUNNER_STRATEGY}" ]]; then
    echo "Syncing CMS data..."
    turbo run sync:cms
fi

# Start the develop server and output logs
turbo run dev --output-logs=new-only || { echo "Error: Failed to start develop server. Please check logs for more information."; exit 1; }
