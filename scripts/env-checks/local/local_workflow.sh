#!/bin/bash
# local_workflow.sh

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Function to run environment variable check directly
run_var_check() {
    echo -e "${CYAN}Running environment variable check...${NC}"
    
    # Determine the directory in which this script is located
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

    # Directly use dotenv to run the validator
    dotenv -- node "$DIR/../env_validator.js"
    
    if [ $? -eq 0 ]; then
        # Success, the output of the validator will be printed to the console
        return 0
    else
        # Failure, the output of the validator will be printed to the console
        return 1
    fi
}

# Function to attempt to resolve setup issues
resolve_setup_issues() {
    echo -e "${YELLOW}Attempting to resolve environment setup issues...${NC}"
    
    bash ./scripts/env-checks/local/local_setup_check.sh || { echo -e "${RED}EnvKey setup failed.${NC}"; return 1; }
    
    bash ./scripts/env-checks/local/local_auth_check.sh || { echo -e "${RED}Local authentication check failed.${NC}"; return 1; }
    
    bash ./scripts/env-checks/local/local_pull_vars.sh || { echo -e "${RED}Environment variable pull failed.${NC}"; return 1; }

    return 0
}

# Main script logic
if run_var_check; then
    exit 0
else
    resolve_setup_issues
    # Re-run the variable check after attempting to resolve issues
    if run_var_check; then
        exit 0
    else
        echo -e "${RED}Variable check failed after resolution attempts. Please resolve the issue and try again.${NC}"
        exit 1
    fi
fi
