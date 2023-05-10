#!/bin/bash
yarn installEnvkey

function cleanup() {
    rv=$?
    bash "es -w -- $PWD/scripts/post_build.sh"
    if [[ "$rv" != "0" ]]; then
        echo "Build failed."
        # if node env is buprodild do this
        if [[ "$NODE_ENV" == "prod" ]]; then
            es -w -- yarn pm2 logs --nostream --lines=1000
        fi
        
    fi
    exit $rv
}

trap "cleanup" EXIT

bash "es -w -- $PWD/scripts/pre_build.sh"

# Run build and cleanup pm2 if it fails
echo "Building..."
STAGE=build es -w -- yarn turbo:build --output-logs=new-only $1
