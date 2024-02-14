#!/bin/bash

# ANSI Color Codes
RED='\033[0;31m'     # Red for errors
GREEN='\033[0;32m'   # Green for success messages
CYAN='\033[0;36m'    # Cyan for informational messages
NC='\033[0m'         # No Color, to reset to the default terminal color scheme

# Path to the root .env file
root_env_file=".env"

# Path to the packages directory and the specific 'web' directory
packages_dir="packages"

# Check if .env file exists
if [ ! -f "$root_env_file" ]; then
    echo -e "${RED}Root .env file not found.${NC}"
    exit 1
fi

# Iterate over subdirectories in the packages directory and copy to their roots
for package in "$packages_dir"/*; do
    if [ -d "$package" ]; then
        # Copy the .env file to the root of each package
        cp "$root_env_file" "$package/.env"
        echo -e "${CYAN}Copied .env file to the root of ${GREEN}$package${NC}"
    fi
done

echo -e "${GREEN}Successfully copied .env file to all package roots.${NC}"
