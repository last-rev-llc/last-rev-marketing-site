# Environment Checks Project

This suite of scripts is designed to streamline the setup and validation of development environments for both local development and continuous integration (CI) processes. It ensures that the necessary environment variables and configurations are correctly established, providing a solid foundation for software development and deployment.

## Project Structure

The project is organized into several key areas:

- **CI Scripts**: Scripts tailored for CI environment setup and validation.
- **Local Scripts**: Scripts for setting up and validating local development environments.
- **Utility Scripts**: Includes the main workflow orchestrator and an environment validator.

## CI Scripts

### `ci_var_check.sh`
Verifies the necessary CI environment variables are set and correct, ensuring the CI process can proceed without configuration issues.

### `ci_propagate_env.sh`
Handles the propagation of environment variables through the CI pipeline, maintaining consistent environment configurations across stages.

### `ci_pull_vars.sh`
Retrieves environment variables required for the CI process, supporting dynamic configuration based on project needs.

### `ci_install_envkey.sh`
Installs and configures EnvKey for secure management of environment secrets, ensuring sensitive information is handled safely within CI environments.

## Local Scripts

### `local_auth_check.sh`
Checks for proper authentication configurations in the local development setup, including the presence of necessary authentication files and keys.

### `local_workflow.sh`
Coordinates the local development environment setup process, guiding through the necessary steps to prepare a local environment for development activities.

### `local_setup_check.sh`
Confirms the local development environment is correctly set up, verifying configurations and prerequisites to ensure readiness for development tasks.

### `local_pull_vars.sh`
Retrieves necessary environment variables for local development, aligning the local setup with project requirements.

## Utility Scripts

### `main_workflow.sh`
Serves as the primary orchestrator for the environment setup and validation process, determining the execution context (CI or local) and initiating the appropriate workflows.

### `env_validator.js`
Performs advanced validation of environment configurations, ensuring all required environment variables are present and correctly configured before starting the build or development process.

## Getting Started

To use these scripts, follow these steps:

1. Clone the env-checks folder to your repo under the /scripts folder.
2. Navigate to the project directory.
3. Execute the `main_workflow.sh` script by prefixing all commands with `bash ./scripts/env-checks/main_workflow.sh && originalBuildCommand` or create a new build script like `"env:check": "./scripts/env-checks/main_workflow.sh", "build":"pnpm env:check && STAGE=build dotenv -- turbo build"`
4. Follow any on-screen instructions to complete the setup or resolve any issues identified by the scripts locally.

## Contributing

Contributions are welcome to improve the project, including enhancements to existing scripts, documentation, or adding new features. Please submit pull requests with your changes for review.


This project is intended to provide a robust framework for managing development and CI environments. For detailed operation of each script, please refer to the inline comments within the script files themselves.
