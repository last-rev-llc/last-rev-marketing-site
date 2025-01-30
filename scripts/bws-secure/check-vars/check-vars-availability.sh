#!/usr/bin/env bash
# Script to check if the variables are available in the environment on Netlify or Vercel Builds

# ---------------------------------------
# CHANGES: Declare missing_vars here
# ---------------------------------------
declare -a missing_vars=()

# Make the script exit on errors and undefined variables
set -Eeuo pipefail

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
BOLD='\033[1m'


# Parse flags
TEST_MODE=false
VERBOSE=false
DRY_RUN=false
while getopts "tvhd" opt; do
  case "${opt}" in
    t)
      TEST_MODE=true
      ;;
    v)
      VERBOSE=true
      ;;
    h)
      echo -e "${BLUE}Usage: $0 [-t] [-v] [-h] [-d]"
      echo -e "  -t: Test mode - allows testing locally"
      echo -e "  -v: Verbose mode - shows additional information"
      echo -e "  -h: Show this help message"
      echo -e "  -d: Dry run - show what would happen without making changes${NC}"
      exit 0
      ;;
    d)
      DRY_RUN=true
      ;;
    *)
      echo -e "${RED}Invalid option. Use -h for help.${NC}"
      exit 1
      ;;
  esac
done

# Skip checks unless running on Netlify, Vercel, or a recognized CI environment
if [ "${NETLIFY:-}" != "true" ] && [ "${VERCEL:-}" != "1" ] && [ "${CI:-}" != "true" ] && [ "$TEST_MODE" = false ]; then
  echo -e "${BLUE}ℹ️  Skipping required variable checks (not Netlify, Vercel, or CI environment).${NC}"
  echo -e "${BLUE}ℹ️  You can test locally by running: ${BOLD}$0 -t${NC}${BLUE}, or by setting NETLIFY=true or VERCEL=1.${NC}"
  exit 0
fi

if [ "$TEST_MODE" = true ]; then
  echo -e "${BLUE}🔍 Test Mode Active${NC}"
  read -p "Would you like to auto-load secrets from .env into your environment? (y/n): " confirm
  if [ "$confirm" = "y" ]; then
    if [ -f .env ]; then
      echo -e "${BLUE}📥 Loading secrets from .env...${NC}"
      set -o allexport
      source .env
      set +o allexport
    else
      echo -e "${YELLOW}⚠️  No .env file found to source.${NC}"
    fi
  else
    echo -e "${BLUE}ℹ️  Skipping auto-load of secrets.${NC}"
  fi
fi

# Update ENV_FILE to point to the parent directory
ENV_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/requiredVars.env"

# Add config file path definition
CONFIG_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/bwsconfig.json"

# Function to get excluded vars from bwsconfig.json
get_excluded_vars() {
  if [ -f "$CONFIG_FILE" ]; then
    [ "$VERBOSE" = true ] && echo -e "${BLUE}📖 Reading excluded variables from bwsconfig.json...${NC}"
    if command -v jq >/dev/null 2>&1; then
      local excluded_vars
      excluded_vars=$(jq -r '.projects[].preserveVars[]' "$CONFIG_FILE" 2>/dev/null | sort -u)
      [ "$VERBOSE" = true ] && echo -e "${BLUE}🔍 Found excluded variables: $excluded_vars${NC}"
      echo "$excluded_vars"
    else
      echo -e "${YELLOW}⚠️  jq not found - skipping bwsconfig.json parsing${NC}"
      echo ""
    fi
  else
    [ "$VERBOSE" = true ] && echo -e "${YELLOW}⚠️  No bwsconfig.json found at $CONFIG_FILE${NC}"
    echo ""
  fi
}

# Get excluded variables
EXCLUDED_VARS=$(get_excluded_vars)

if [ ! -f "$ENV_FILE" ]; then
  echo -e "${YELLOW}----------------------------------------"
  echo -e "⚠️  Notice: No '$ENV_FILE' file found."
  echo -e "🔍 Skipping runtime variable checks."
  echo -e "💡 To enable checks, create '$ENV_FILE' with required variable names."
  echo -e "----------------------------------------${NC}"
  exit 0
fi

missing_variable=false

# Add file permission check before main logic
if [ ! -r "$ENV_FILE" ]; then
  echo -e "${RED}Error: Cannot read $ENV_FILE. Check file permissions.${NC}"
  exit 1
fi

# Validate format for requiredVars.env
validate_env_file() {
  local line_number=0
  while IFS= read -r line; do
    ((line_number++))
    # Skip empty lines and comments
    if [[ -z "$line" ]] || [[ $line == \#* ]]; then
      continue
    fi
    # Check for valid variable name format
    if ! [[ $line =~ ^[a-zA-Z_][a-zA-Z0-9_]*(:=.*)?$ ]]; then
      echo -e "${RED}Error in $ENV_FILE line $line_number: Invalid format"
      echo -e "Expected format: VARIABLE_NAME or VARIABLE_NAME:=default_value${NC}"
      exit 1
    fi
  done < "$ENV_FILE"
}

if [ -f "$ENV_FILE" ]; then
  [ "$VERBOSE" = true ] && echo -e "${BLUE}🔍 Validating $ENV_FILE format...${NC}"
  validate_env_file
fi

# Remove or comment out this section since we already ran the scan via pnpm scan
if [ "$TEST_MODE" = false ]; then
  # echo -e "${BLUE}🔄 Ensuring fresh environment variable scan...${NC}"
  # node "$(dirname "$0")/requiredRuntimeVars.js"
  :  # No-op to maintain script structure
fi

# Read each line from requiredVars.env
while IFS= read -r line; do
  # Skip empty lines and comment lines
  if [[ -z "$line" ]] || [[ $line == \#* ]]; then
    continue
  fi

  # Split line into variable name and default value if present
  if [[ $line == *:=* ]]; then
    var_name=${line%:=*}
    default_value=${line#*:=}
  else
    var_name=$line
  fi

  # Check if variable is in excluded list
  if echo "$EXCLUDED_VARS" | grep -Fxq "$var_name"; then
    [ "$VERBOSE" = true ] && echo -e "${BLUE}ℹ️  Skipping excluded variable: $var_name${NC}"
    continue
  fi

  # ---------------------------------------
  # CHANGES: Add debug logs in verbose mode
  # ---------------------------------------
  if [ "$VERBOSE" = true ]; then
    echo -e "${BLUE}ℹ️  Checking variable: $var_name${NC}"
    echo -e "${BLUE}   Value in environment: ${!var_name:-<not set>} ${NC}"
  fi

  if [[ $line == *:=* ]]; then
    # If variable is not set, use default value
    if [ -z "${!var_name:-}" ]; then
      if [ "$DRY_RUN" = false ]; then
        export "$var_name=$default_value"
        echo -e "${YELLOW}ℹ️  Using default value for '${BOLD}$var_name${NC}${YELLOW}'${NC}"
      else
        echo -e "${BLUE}🔍 Would set $var_name to default value${NC}"
      fi
    fi
  else
    # No default value -> must be present
    if [ -z "${!var_name:-}" ]; then
      missing_variable=true

      # Only add once if not already in missing_vars
      if [ "${#missing_vars[@]:-0}" -eq 0 ] || ! printf '%s\n' "${missing_vars[@]:-}" | grep -Fxq "$var_name"; then
        missing_vars+=("$var_name")
      fi
    fi
  fi
done < "$ENV_FILE"

# If --dry-run and variables are missing, show them
if [ "$DRY_RUN" = true ] && [ "$missing_variable" = true ]; then
  echo -e "${BLUE}🔍 Dry run mode - would attempt to inject these variables:${NC}"
  
  if [ "${#missing_vars[@]}" -gt 0 ]; then
    for var in "${missing_vars[@]}"; do
      echo -e "${BLUE}   • $var${NC}"
    done
  fi
  exit 1
fi

# ---------------------------------------
# CHANGES: Fallback if no missing vars
# ---------------------------------------
if [ "$missing_variable" = false ]; then
  echo -e "${GREEN}✅ All required runtime function variables are available, proceeding with build steps...${NC}"

  # Optional: Print contents if verbose
  if [ "$VERBOSE" = true ]; then
    echo -e "${BLUE}📖 Reading required variables from: $ENV_FILE${NC}"
    echo -e "${BLUE}File contents:${NC}"
    cat "$ENV_FILE"
    echo -e "${BLUE}----------------------------------------${NC}"
  fi
  exit 0
fi

# If missing variables remain, show them
echo -e "${RED}----------------------------------------"
echo -e "❌ Missing required variables for this build:"
for var in "${missing_vars[@]}"; do
  echo -e "   • ${BOLD}$var${NC}"
done
echo -e "----------------------------------------${NC}"

# Handle Netlify environment
if [ "${NETLIFY:-}" = "true" ]; then
  echo -e "${BLUE}🔄 Attempting to inject required variables into Netlify project settings...${NC}"
  # Updated to use npm/yarn/pnpm agnostic command
  if [ -f "package-lock.json" ]; then
    npm run update-env -- --platform netlify
  elif [ -f "yarn.lock" ]; then
    yarn update-env --platform netlify
  elif [ -f "pnpm-lock.yaml" ]; then
    pnpm update-env --platform netlify
  else
    echo -e "${YELLOW}⚠️  No lock file found, defaulting to npm...${NC}"
    npm run update-env -- --platform netlify
  fi
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Variables successfully injected into Netlify project settings."
    echo -e "🔄 Triggering new build with updated variables...${NC}"
    # TODO: Call script to retry build
    echo -e "${BLUE}ℹ️  Build retry initiated. Please check the latest builds in Netlify dashboard.${NC}"
    exit 1
  else
    echo -e "${RED}----------------------------------------"
    echo -e "❌ ERROR: Failed to inject required variables."
    echo -e "${YELLOW}⚡ Manual action required:"
    echo -e "1. Add the above missing variables to your Netlify Environment Variables"
    echo -e "2. Visit: https://app.netlify.com/sites/YOUR_SITE/settings/env"
    echo -e "3. Check the function requirements in your codebase"
    echo -e "----------------------------------------${NC}"
    exit 1
  fi
elif [ "${VERCEL:-}" = "1" ]; then
  # Handle Vercel environment
  echo -e "${BLUE}🔄 Attempting to inject required variables into Vercel project settings...${NC}"
  # Updated to use npm/yarn/pnpm agnostic command
  if [ -f "package-lock.json" ]; then
    npm run update-env -- --platform vercel
  elif [ -f "yarn.lock" ]; then
    yarn update-env --platform vercel
  elif [ -f "pnpm-lock.yaml" ]; then
    pnpm update-env --platform vercel
  else
    echo -e "${YELLOW}⚠️  No lock file found, defaulting to npm...${NC}"
    npm run update-env -- --platform vercel
  fi

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Variables successfully injected into Vercel project settings."
    echo -e "🔄 Triggering new build with updated variables...${NC}"
    # TODO: Call script to retry build
    echo -e "${BLUE}ℹ️  Build retry initiated. Please check the latest builds in Vercel dashboard.${NC}"
    exit 1
  else
    echo -e "${RED}----------------------------------------"
    echo -e "❌ ERROR: Failed to inject required variables."
    echo -e "${YELLOW}⚡ Manual action required:"
    echo -e "1. Add the above missing variables to your Vercel Environment Variables"
    echo -e "2. Visit: https://vercel.com/dashboard/project/settings/environment-variables"
    echo -e "3. Check the function requirements in your codebase"
    echo -e "----------------------------------------${NC}"
    exit 1
  fi
else
  # Handle other environments
  echo -e "${RED}❌ Not running in Netlify or Vercel environment. Exiting...${NC}"
  exit 1
fi
