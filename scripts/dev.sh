#!/bin/bash

function cleanup() {
    rv=$?
    yarn gql:pm2:kill
    exit $rv
}

trap "cleanup" EXIT

echo "Preparing environment..."

echo "Starting develop server..."
if [[ "${GRAPHQL_RUNNER_STRATEGY}" == "fs" ]] || [[ -z "${GRAPHQL_RUNNER_STRATEGY}" ]]; then
    echo "Syncing CMS data..."
    yarn secure-run turbo run sync:cms
fi
yarn secure-run turbo run dev --output-logs=new-only
