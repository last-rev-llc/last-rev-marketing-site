#!/bin/bash

function cleanup() {
    rv=$?
    yarn gql:pm2:kill
    exit $rv
}

trap "cleanup" EXIT

echo "Preparing environment..."
yarn propagate:envkey

echo "Starting develop server..."
if [[ "${GRAPHQL_RUNNER_STRATEGY}" == "fs" ]] || [[ -z "${GRAPHQL_RUNNER_STRATEGY}" ]]; then
    echo "Syncing CMS data..."
    turbo run sync:cms
fi
turbo run dev --output-logs=new-only
