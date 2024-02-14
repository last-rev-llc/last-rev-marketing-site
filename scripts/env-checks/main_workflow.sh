#!/bin/bash
# main_workflow.sh

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NO_COLOR='\033[0m'

# Function to print messages in colors
log() {
    case "$1" in
        info) echo -e "${CYAN}${2}${NO_COLOR}" ;;
        success) echo -e "${GREEN}${2}${NO_COLOR}" ;;
        warning) echo -e "${YELLOW}${2}${NO_COLOR}" ;;
        error) echo -e "${RED}${2}${NO_COLOR}" ;;
        *) echo -e "${2}" ;; # Default, no color
    esac
}

# Define path to flag file for local setup
SKIP_FLAG_FILE="./scripts/env-checks/flags/skip_envkey_setup.flag"

# Function to check if running in Netlify or Vercel environments
check_ci_environment() {
  if [[ ! -z "$NETLIFY" ]] || [[ ! -z "$VERCEL" ]]; then
    log info "Detected CI/CD environment..."
    return 0  # It's a CI/CD environment
  else
    return 1  # It's a local environment
  fi
}

# Function to check for skip flag for local development
check_skip_flag() {
  if [[ -f "$SKIP_FLAG_FILE" ]]; then
    log warning "Skipping envkey setup..."
    # Running validator only, no setup
    dotenv -- node ./scripts/env-checks/env_validator.js || { log error "Variable check failed."; exit 1; }
    return 0  # Skip flag is set
  else
    return 1  # Skip flag is not set
  fi
}

# Function to handle the CI/CD workflow
ci_workflow() {
  log info "Starting CI/CD workflow..."
  ./scripts/env-checks/ci/ci_install_envkey.sh || { log error "EnvKey install failed."; exit 1; }
  
  # Pull and propagate environment variables, warn but continue if failed
  ./scripts/env-checks/ci/ci_pull_vars.sh || log warning "Pulling variables failed. Continuing with variable check..."
  ./scripts/env-checks/ci/ci_propagate_env.sh || log warning "Propagating variables failed. Continuing with variable check..."
  
  # Check environment variables, exit if failed
  ./scripts/env-checks/ci/ci_var_check.sh || { log error "Variable check failed."; exit 1; }
}

# Function to handle the local development workflow
local_workflow() {
  log info "Starting local development workflow..."
  
  if ! check_skip_flag; then
    # Directly call local scripts since they are standalone
    log info "Local workflow initiated..."
    bash ./scripts/env-checks/local/local_workflow.sh
  else
    log info "Setup initiation is skipped."
  fi
}

# Main execution
if check_ci_environment; then
  ci_workflow
else
  local_workflow
fi
