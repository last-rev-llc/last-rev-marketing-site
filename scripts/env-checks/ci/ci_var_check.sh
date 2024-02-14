#!/bin/bash
# ci_var_check.sh
# Verify all required variables are present

# Determine the directory in which this script is located
# This ensures that the path to env_validator.js is always correctly resolved
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

dotenv -- node "$DIR/../env_validator.js"

if [ $? -eq 0 ]; then
  exit 0
else
  exit 1
fi
