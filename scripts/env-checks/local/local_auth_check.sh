#!/bin/bash

# ANSI Color Codes
RED='\033[0;31m'     # Red for errors
GREEN='\033[0;32m'   # Green for success
YELLOW='\033[1;33m'  # Yellow for warnings
BLUE='\033[0;34m'    # Blue for informational messages
NC='\033[0m'         # No Color - reset

# Purpose: Check and manage local CLI key for envkey for the project.

ENVKEY_FILE=".envkey"

# Check for the existence of .envkey file
if [ ! -f "$ENVKEY_FILE" ]; then
    echo -e "${RED}The .envkey file does not exist in the current directory.${NC}"
    exit 1
fi

# Extract appId for more precise parsing
APP_ID=$(grep "appId" "$ENVKEY_FILE" | awk -F'[:,]' '{print $2}' | tr -d ' "')

if [ -z "$APP_ID" ]; then
    echo -e "${RED}appId could not be found in .envkey file.${NC}"
    exit 1
fi

CLI_KEY_FILE="$HOME/.envkey/apps/$APP_ID.env"

# Check for the existence of the CLI key file
if [ -f "$CLI_KEY_FILE" ]; then
    echo -e "${BLUE}Local CLI key exists for appId: ${GREEN}$APP_ID${NC}"
    if grep -q "ENVKEY=" "$CLI_KEY_FILE"; then
        echo -e "${GREEN}ENVKEY found in the CLI key file.${NC}"
    else
        echo -e "${YELLOW}ENVKEY not found in the CLI key file at ${RED}$CLI_KEY_FILE${NC}."
        echo -e "${YELLOW}It's recommended to delete the file manually or try to authenticate again.${NC}"
        read -p "Would you like to remove the file and try again? (This will only be asked once) (y/N): " remove_and_retry
        if [[ "$remove_and_retry" =~ ^[Yy]$ ]]; then
            rm -f "$CLI_KEY_FILE"
            echo -e "${BLUE}File removed. Attempting to login to Envkey to create a local CLI key...${NC}"
            envkey-source > /dev/null
            if [ -f "$CLI_KEY_FILE" ]; then
                echo -e "${GREEN}Local CLI key created successfully for appId: $APP_ID.${NC}"
                echo -e "${BLUE}Restarting envkey...${NC}"
                envkey core stop
                envkey core start
            else
                echo -e "${RED}Failed to create local CLI key for appId: $APP_ID after removal attempt, please contact support for assistance.${NC}"
                exit 1
            fi
        else
            echo -e "${YELLOW}File was not removed. Please delete it manually if necessary and try again.${NC}"
        fi
    fi
else
    echo -e "${YELLOW}Local CLI key does not exist for appId: $APP_ID.${NC}"
    read -p "Would you like to attempt to authenticate with Envkey? (y/N): " proceed_auth
    if [[ "$proceed_auth" =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}Attempting to login to Envkey to create a local CLI key...${NC}"
        envkey-source > /dev/null
        if [ -f "$CLI_KEY_FILE" ]; then
            echo -e "${GREEN}Local CLI key created successfully for appId: $APP_ID.${NC}"
            echo -e "${BLUE}Restarting envkey...${NC}"
            envkey core stop
            envkey core start
        else
            echo -e "${RED}Failed to create local CLI key for appId: $APP_ID, please contact support for assistance.${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}Warning: Missing a local CLI key. This script may not work as intended. If you are unsure or encounter errors, please seek additional assistance.${NC}"
    fi
fi
