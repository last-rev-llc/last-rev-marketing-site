# Migration Guide to Envkey

## Appropriate Permissions Required or IT Help

In order to start you'll need to make sure that you have all of the environment variables copied over to Envkey and have initalized / created the .envkey file on your branch. If you do not have the permissions but are attempting to add a new app/repo to Envkey just submit a request through ISD. I can provide you with a new .envkey as necessary.

If the app exists already within your Envkey account but you do not have the .envkey file yet. You will need to use the following command and following the easy to use prompts for it to 'intialize' your project.

```
envkey init
```

---

## Update the scripts within the package.json file

We need to modify current build command(s). See the standard/example below, we change the old build commands to prefix with `es -- `after installing Envkey. Also, note the new installEnvkey script for use in Netlify and Vercel and other servers.

Quick Reference Example: `"es -- build-command"`

### Full Example to be Used in package.json

```
    "dev": "es -- yarn build:dev",
    "build": "es -- yarn build:prod",
    "installEnvkey": "./scripts/installEnvkey.sh",
```

---
### Modify Netlify.toml or Vercel Json Build file(s)

```
   "Prod:" -- "yarn installEnvkey && es -- yarn build"

   "Dev:" -- "yarn installEnvkey && es -- yarn dev"
```

---

## Create a New Shell Script File

Within the `scripts` folder create a new file named `installEnvkey.sh` and then run the following command to make the new shell script executable.

```
chmod -x /scripts/installEnvkey.sh
```

The above command assumes that the scripts folder is on root.

---

## New installEnvkey.sh File Contents

```
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
  echo "$(tput setaf 6)$(tput bold)Envkey Install Skipped, we're assuming it's running locally.$(tput sgr0)"

fi
```

---

## Remove old code

Remove `propagate.env` / `propagate:env` scripts, files and commands. There should be, within the build.sh and dev.sh scripts the following lines that should be removed.

```
set -a
source .env || echo "No .env file found"
set +a
```

and

```
yarn propagate:env
```

---

## Update the root README.md
## ENVKEY - Environment Variables

Envkey is now used for storing environment variables securely. You will need to follow the following documentation located at [docs-v2-envkey.com](https://docs-v2.envkey.com/docs/install) before proceeding to run the repo locally and be granted access to Envkey.

### GUI Install
Visit [Envkey](https://envkey.com), download the appropriate installer, install on your local machine.

You may also try using the following commands locally as these are the two items that need installed. If you run in to any issues, please refer to the documentation above.

### CLI Install only

- Step 1 - Install envkey, copy and paste to your terminal.

```
LATEST_VERSION=$(curl https://envkey-releases.s3.amazonaws.com/latest/cli-version.txt) && curl -s https://envkey-releases.s3.amazonaws.com/cli/release_artifacts/$LATEST_VERSION/install.sh | bash
```

- Step 2 - Install envkey-source, copy and paste to your terminal.

```
VERSION=$(curl https://envkey-releases.s3.amazonaws.com/latest/envkeysource-version.txt) && curl -s https://envkey-releases.s3.amazonaws.com/envkeysource/release_artifacts/$VERSION/install.sh | bash
```
