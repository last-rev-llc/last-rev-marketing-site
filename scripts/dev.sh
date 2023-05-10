#!/bin/bash
yarn installEnvkey

function cleanup() {
    rv=$?
    es -w -- yarn gql:pm2:kill
    exit $rv
}

trap "cleanup" EXIT

echo "Starting develop server..."
if [[ "${GRAPHQL_RUNNER_STRATEGY}" == "fs" ]] || [[ -z "${GRAPHQL_RUNNER_STRATEGY}" ]]; then
    echo "Syncing CMS data..."
    es -w -- turbo run sync:cms
fi
es -w -- turbo run dev --output-logs=new-only
