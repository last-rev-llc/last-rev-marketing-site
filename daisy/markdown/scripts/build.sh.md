#!/bin/bash

function cleanup() {
    rv=$?
    bash "$PWD/scripts/post_build.sh"
    if [[ "$rv" != "0" ]]; then
        echo "Build failed."
        # if node env is prod, do this
        if [[ "$NODE_ENV" == "prod" ]]; then
            yarn pm2 logs --nostream --lines=1000
        fi
    fi
    exit $rv
}

trap "cleanup" EXIT

echo "Preparing environment..."
yarn propagate:envkey

bash "$PWD/scripts/pre_build.sh"

# Run build and cleanup pm2 if it fails
echo "Building..."
STAGE=build yarn turbo:build --output-logs=new-only $1
