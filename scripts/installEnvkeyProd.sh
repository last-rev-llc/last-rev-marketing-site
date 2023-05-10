#!/bin/bash

# Function to install envkey-source
# Parameters:
#   $1 - A string representing the sed command to modify the installation script
install_envkey_source() {
  # Get the latest version of envkey-source
  local version=$(curl -s https://envkey-releases.s3.amazonaws.com/latest/envkeysource-version.txt)

  # Modify the installation script using the sed command passed as a parameter
  local install_cmd=$1

  # Execute the modified installation script and check if the installation was successful
  if curl -s https://envkey-releases.s3.amazonaws.com/envkeysource/release_artifacts/$version/install.sh | sed "$install_cmd" | bash > /dev/null 2>&1; then
    echo -e "\033[32m\033[1menvkey-source installed successfully.\033[0m"
  else
    echo -e "\033[31m\033[1m\033[5menvkey-source installation failed.\033[0m"
  fi
}

# Check if the script is running on Netlify
if [[ ! -z "${NETLIFY_BUILD_BASE}" ]]; then
  # Get the current working directory
  current_dir=$(pwd)

  # Call the install_envkey_source function with a sed command to adjust the installation directory
  install_envkey_source "s|/usr/local/bin|$current_dir/node_modules/.bin|g"

# Check if the script is running on Vercel
elif [[ ! -z "${VERCEL_ENV}" ]]; then
  # Call the install_envkey_source function with a sed command to remove the sudo command for Vercel
  install_envkey_source 's/sudo mv/mv/g'

# If not running on Netlify or Vercel, assume it's running locally and skip the installation
else
  echo "Install Skipped, assuming it's running locally."
fi

es -- yarn build:Prod
