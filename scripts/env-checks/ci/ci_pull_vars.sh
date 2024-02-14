#!/bin/bash
# Automatically pull environment variables using EnvKey

# ANSI color codes
GREEN="\033[0;32m"
RED="\033[0;31m"
CYAN="\033[0;36m" # Informational color
NC="\033[0m" # No Color

echo -e "${CYAN}Pulling environment variables from Envkey...${NC}"

# Execute the command to pull environment variables and save them to .env file
es --dot-env -f > .env

# Check the exit status of the previous command
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Environment variables successfully pulled from Envkey.${NC}"
  exit 0
else
  echo -e "${RED}Failed to pull environment variables from Envkey.${NC}"
  exit 1
fi
