# README

## TODO Items
- None

## Known Issues
- None

## Description
This is a Bash script that starts a development server. It sources environment variables from a `.env` file and runs a cleanup function upon exit. It also syncs CMS data if the `GRAPHQL_RUNNER_STRATEGY` environment variable is set to `fs` or is empty.

## Usage
1. Ensure that a `.env` file is present in the same directory as the script.
2. Run the script using `bash script.sh`.

## Dependencies
- yarn
- turbo-cli

## Contributors
- [Your Name](https://github.com/yourusername)