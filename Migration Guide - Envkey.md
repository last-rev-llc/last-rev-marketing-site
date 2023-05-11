# Migration Guide to Envkey

## Update the scripts within the package.json file

We need to provide additional build command(s). See the standard/example below, we change the old build commands to include the name of the new script and prefix with `es -- `after installing Envkey. It's also necessary to create the installEnvkey as it's own build script and invoke it use `yarn installEnvkey` before injecting the new/old command with `es -- `. I had issues doing it other ways so felt this would be the best way to accomplish this.

Quick Reference Example: `"yarn installEnvkey && es -- yarn new-build-command"`

### Full Example to be Used

```
    "dev": "yarn installEnvkey && es -- yarn build:dev",
    "build": "yarn installEnvkey && es -- yarn build:prod",
    "build:dev": "./scripts/dev.sh",
    "build:prod": "./scripts/build.sh",
    "installEnvkey": "./scripts/installEnvkey.sh",
```

---

## Add Envkey to the root package.json

```
yarn add envkey -W
```

Sometimes I've noticed that the yarn.lock file isn't updated, go ahead and run a `yarn` after install just in case so that the yarn.lock file gets update on your PR.

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
