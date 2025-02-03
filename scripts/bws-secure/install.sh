#!/bin/bash

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Determine if we're in the monorepo root or the package directory
if [ -f "package.json" ] && [ ! -d "scripts/bws-secure" ]; then
  # We're in the package directory, need to go to monorepo root
  cd ../..
fi

echo -e "${BLUE}🔒 Setting up BWS Secure in $(pwd)/scripts/bws-secure ${NC}"

# Create scripts directory if it doesn't exist
mkdir -p scripts

# Clone BWS Secure using HTTPS (more universal than SSH)
if [ ! -d "scripts/bws-secure" ]; then
  git clone https://github.com/last-rev-llc/bws-secure.git scripts/bws-secure || {
    echo -e "${RED}❌ Failed to clone repository${NC}"
    exit 1
  }
fi

# Navigate to bws-secure directory
cd scripts/bws-secure || exit 1

# Create bin directory if it doesn't exist
mkdir -p bin

# Make scripts executable (only if they exist)
if [ -d "./bin" ] && [ "$(ls -A ./bin)" ]; then
  chmod +x ./bin/*
fi
[ -f "./bws-installer.sh" ] && chmod +x ./bws-installer.sh

# Detect package manager
if [ -f "../../pnpm-lock.yaml" ]; then
  PM="pnpm"
elif [ -f "../../yarn.lock" ]; then
  PM="yarn"
else
  PM="npm"
fi

# Install dependencies based on package manager
if [ "$PM" = "pnpm" ]; then
  $PM install --ignore-scripts --silent
elif [ "$PM" = "yarn" ]; then
  $PM install --ignore-scripts --silent --no-audit
else
  $PM install --ignore-scripts --quiet --no-audit
fi

# Return to project root (first and only time)
cd ../..

echo "Setting up BWS Secure in project root: $(pwd)"

# Copy example config if it doesn't exist
if [ ! -f "bwsconfig.json" ] && [ -f "scripts/bws-secure/examples/bwsconfig.example.json" ]; then
  echo "Creating bwsconfig.json from example..."
  cp scripts/bws-secure/examples/bwsconfig.example.json bwsconfig.json
else
  echo "Checking for bwsconfig.json in project root..."
  if [ -f "bwsconfig.json" ]; then
    echo "Found existing bwsconfig.json at: $(pwd)/bwsconfig.json"
  else
    # Create default config if example doesn't exist
    echo "Creating default bwsconfig.json..."
    cat > bwsconfig.json << EOF
{
  "projects": [
    {
      "platform": "vercel|netlify",
      "projectName": "firstProjectName",
      "bwsProjectIds": {
        "prod": "yourBWSProdProjectID",
        "dev": "yourBWSDevProjectID",
        "local": "yourBWSLocalProjectID"
      },
      "preserveVars": ["BWS_ACCESS_TOKEN"],
      "excludeVars": [
        "VERCEL_URL"
      ]
    },
    {
      "platform": "vercel|netlify",
      "projectName": "secondProjectName",
      "bwsProjectIds": {
        "prod": "yourBWSProdProjectID",
        "dev": "yourBWSDevProjectID",
        "local": "yourBWSLocalProjectID"
      },
      "preserveVars": ["BWS_ACCESS_TOKEN"],
      "excludeVars": [
        "DEPLOY_URL"
      ]
    }
  ]
}
EOF
  fi
fi

# Clean up git repository
rm -rf scripts/bws-secure/.git

echo "Checking .gitignore configuration..."
# Update .gitignore
GITIGNORE_ENTRIES=(
  " "
  "# BWS Secure"
  ".env"
  ".env.*"
  ".env.secure.*"
  "requiredVars.env"
  ".env-debug.html"
)

if [ ! -f ".gitignore" ]; then
  touch .gitignore
fi

# Check if entries already exist in .gitignore
for entry in "${GITIGNORE_ENTRIES[@]}"; do
  if ! grep -Fxq "$entry" .gitignore; then
    echo "$entry" >> .gitignore
  fi
done

echo "Setting up .npmrc for direct command execution..."

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
  cat > .env << EOF
# BWS Secure Configuration
BWS_ACCESS_TOKEN=your_token_here
EOF
fi

# Update root package.json (we're already in the right directory)
if [ -f "package.json" ]; then
  echo "Updating package.json at: $(pwd)/package.json"
  
  TMP_SCRIPT=$(mktemp)
  cat > "$TMP_SCRIPT" << EOF
const fs = require('fs');
try {
  // Use absolute path to package.json
  const packageJsonPath = '$(pwd)/package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Ensure scripts object exists
  packageJson.scripts = packageJson.scripts || {};

  // Add our core scripts
  packageJson.scripts['secure-run'] = 'node ./scripts/bws-secure/secure-run.js';
  packageJson.scripts['list-projects'] = 'node ./scripts/bws-secure/list-projects.js';
  packageJson.scripts['bws-deps'] = '[ -d node_modules/dotenv ] && [ -d node_modules/dotenv-cli ] && [ -f node_modules/.bin/bws ] || $PM install';
  // Add postinstall to run bws-installer.sh
  packageJson.scripts['postinstall'] = 'bash ./scripts/bws-secure/bws-installer.sh';

  // Add dependencies if they don't exist
  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.dependencies['dotenv'] = packageJson.dependencies['dotenv'] || '^16.4.7';
  packageJson.dependencies['dotenv-cli'] = packageJson.dependencies['dotenv-cli'] || '^8.0.0';
  packageJson.dependencies['yargs'] = packageJson.dependencies['yargs'] || '^17.7.2';

  // Write back to file
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  process.exit(0);
} catch (error) {
  console.error('Error updating package.json:', error);
  process.exit(1);
}
EOF

  # Run the temporary Node.js script
  if node "$TMP_SCRIPT"; then
    echo "Updated package.json successfully"
    echo "Added/Updated scripts and dependencies:"
    echo "  Scripts:"
    echo "    - secure-run"
    echo "    - list-projects"
    echo "    - bws-deps"
    echo "    - postinstall"
    echo "  Dependencies:"
    echo "    - dotenv"
    echo "    - dotenv-cli"
    echo "    - yargs"
  else
    echo -e "${RED}Warning: Failed to update package.json scripts. You may need to add them manually.${NC}"
  fi
  
  # Clean up temporary script
  rm -f "$TMP_SCRIPT"
fi

# Install dependencies with detected package manager
echo "Installing dependencies with $PM..."
if [ "$PM" = "pnpm" ]; then
  $PM install --silent
elif [ "$PM" = "yarn" ]; then
  $PM install --silent
else
  $PM install --quiet
fi

# Success message with box drawing characters
echo -e "
${GREEN}╔════════════════════════════════════════════════════════════╗
║             ✅ BWS Secure Setup Complete!                  ║
╚════════════════════════════════════════════════════════════╝${NC}

📋 Next Steps:

1. Configure your bwsconfig.json at:
   $(pwd)/bwsconfig.json
   - Set platform to 'vercel' or 'netlify'
   - Update projectName to match your deployment
   - Add your BWS project IDs for each environment

2. Add your BWS token to .env:
   BWS_ACCESS_TOKEN=your_token_here

3. Update your build scripts to use secure-run:
   \"dev\": \"secure-run next dev\"
   \"build\": \"secure-run next build\"
   \"start\": \"secure-run next start\"

🔧 Added Scripts:
   - secure-run: Runs commands with secure environment variables
   - list-projects: Lists available BWS projects
   - bws-deps: Ensures BWS dependencies are installed

📦 Dependencies:
   - BWS CLI will be installed automatically when needed
   - Required packages have been added to package.json
   - Run '$PM bws-deps' to verify BWS installation

🔒 Security:
   - Environment files are encrypted
   - .gitignore has been updated
   - Secrets are never logged

📚 Documentation: https://github.com/last-rev-llc/bws-secure

For help or issues:
1. Check the README.md in scripts/bws-secure/
2. Enable debug mode: DEBUG=true $PM build
3. Open an issue on GitHub
"

echo "Checking Prettier configuration..."
# Create or update .prettierignore
PRETTIER_ENTRIES=(
  "# BWS Secure - Environment Files"
  ".env"
  ".env.*"
  "*.env"
  "scripts/bws-secure/.env*"
  "scripts/bws-secure/**/.env*"
  ".env.secure"
  ".env.secure.*"
)

# Create .prettierignore if it doesn't exist
if [ ! -f ".prettierignore" ]; then
  touch .prettierignore
  echo "Created new .prettierignore file"
fi

# Check if entries already exist in .prettierignore
for entry in "${PRETTIER_ENTRIES[@]}"; do
  if ! grep -Fxq "$entry" .prettierignore; then
    echo "$entry" >> .prettierignore
    echo "Added $entry to .prettierignore"
  fi
done

# Add a blank line at the end if there isn't one
if [ -s ".prettierignore" ] && [ "$(tail -c1 .prettierignore)" != "" ]; then
  echo "" >> .prettierignore
fi

echo "Prettier ignore configuration updated successfully" 