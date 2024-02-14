#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Flag to track overall success
overall_success=true

# Function to install or update EnvKey CLI
install_or_update_envkey_cli() {
    echo "Checking for EnvKey CLI..."
    local latest_version
    latest_version=$(curl -s -H "Cache-Control: no-cache" "https://envkey-releases.s3.amazonaws.com/latest/cli-version.txt")

    if [[ -z "$latest_version" || ! "$latest_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo -e "${RED}Failed to fetch the latest EnvKey CLI version. Check your internet connection or try again later.${NC}"
        overall_success=false
        return 1
    fi

    local installed_version=""
    if command -v envkey &> /dev/null; then
        installed_version=$(envkey --version)
    fi

    if [[ "$installed_version" != "$latest_version" ]]; then
        echo "Installing/Updating EnvKey CLI to version $latest_version..."
        if curl -s "https://envkey-releases.s3.amazonaws.com/cli/release_artifacts/$latest_version/install.sh" | bash > /dev/null; then
            echo -e "${GREEN}EnvKey CLI has been successfully updated/installed.${NC}"
        else
            echo -e "${RED}Failed to update/install EnvKey CLI.${NC}"
            overall_success=false
        fi
    else
        echo -e "${GREEN}EnvKey CLI is already up to date.${NC}"
    fi
}

# Function to install or update envkey-source
install_or_update_envkey_source() {
    echo "Checking for envkey-source..."
    local latest_version
    latest_version=$(curl -s -H "Cache-Control: no-cache" "https://envkey-releases.s3.amazonaws.com/latest/envkeysource-version.txt")

    if [[ -z "$latest_version" || ! "$latest_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo -e "${RED}Failed to fetch the latest envkey-source version. Check your internet connection or try again later.${NC}"
        overall_success=false
        return 1
    fi

    local installed_version=""
    if command -v envkey-source &> /dev/null; then
        installed_version=$(envkey-source --version)
    fi

    if [[ "$installed_version" != "$latest_version" ]]; then
        echo "Installing/Updating envkey-source to version $latest_version..."
        if curl -s "https://envkey-releases.s3.amazonaws.com/envkeysource/release_artifacts/$latest_version/install.sh" | bash > /dev/null; then
            echo -e "${GREEN}envkey-source has been successfully updated/installed.${NC}"
        else
            echo -e "${RED}Failed to update/install envkey-source.${NC}"
            overall_success=false
        fi
    else
        echo -e "${GREEN}envkey-source is already up to date.${NC}"
    fi
}

# Execute the update/installation functions
install_or_update_envkey_cli
install_or_update_envkey_source

# Final message based on success of operations
if $overall_success; then
    echo -e "${GREEN}EnvKey setup verification complete.${NC}"
else
    echo -e "${RED}EnvKey setup encountered some issues. Please check the messages above.${NC}"
fi
