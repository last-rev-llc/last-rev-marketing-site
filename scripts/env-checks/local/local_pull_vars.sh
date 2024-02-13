#!/bin/bash

# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check for Envkey CLI tool
if ! command -v es &> /dev/null; then
    echo -e "${RED}Envkey CLI tool not found. Please install it before running this script.${NC}"
    exit 1
fi

echo -e "Do you want to pull environment variables from ${BLUE}Envkey${NC}?\n"
echo -e "\n${YELLOW}You have 20 seconds to decide.${NC}\n"
echo -e "${BLUE}  Option 1${NC} - ${YELLOW}Override your .env file now?${NC}"
echo -e "${BLUE}  Option 2${NC} - ${YELLOW}Append all environment variables to your current .env file?${NC}"
echo -e "\n${YELLOW}Press enter, or any other key, to skip this step${NC}\n"

if read -t 20 -p "Enter 1 or 2 or press Enter to skip: " action_choice; then
    case $action_choice in
        1)
            echo -e "${YELLOW}You've chosen to override your .env file. This will replace the existing file.${NC}"
            read -p "Are you sure? (y/N): " confirm && [[ $confirm == [yY] ]] || exit 1
            # Backup current .env file
            backup_file=".env.local.backup"
            echo -e "${GREEN}Backing up your current .env file to $backup_file...${NC}"

            # Copy .env to $backup_file, with a check for existing backup
            if [ -f "$backup_file" ]; then
                read -p "A backup file already exists. Overwrite? (y/N): " confirm
                if [[ $confirm != [yY] ]]; then
                    echo "Backup aborted."
                    exit 1
                fi
            fi

            cp .env "$backup_file"
            echo "Backup created successfully."

            # Check if $backup_file is already in .gitignore
            if ! grep -q "^$backup_file\$" .gitignore; then
                echo "$backup_file" >> .gitignore
                echo "$backup_file has been added to .gitignore."
            else
                echo "$backup_file is already in .gitignore."
            fi
            echo -e "${GREEN}Overriding your .env file with environment variables from ${BLUE}Envkey${GREEN}...${NC}"
            es --dot-env -f > .env
            echo -e "${GREEN}Your .env file has been overridden successfully.${NC}"
            ;;
        2)
            [[ $(tail -c1 .env) && -f .env ]] && echo "" >> .env  # Ensure newline at the end of .env before appending
            echo -e "${GREEN}Appending all environment variables to your current .env file...${NC}"
            es --dot-env -f >> .env
            echo -e "${GREEN}Environment variables appended successfully.${NC}"
            ;;
        *)
            echo -e "${RED}Invalid choice. No action taken, resulting in no changes to your .env file. Exiting...${NC}"
            exit 1
            ;;
    esac
else
    echo -e "\n\n${YELLOW}You did not respond in time, no action taken. Exiting gracefully...${NC}"
    exit 0
fi
