# Update Environment Variables Script

This script is part of the **BWS-Secure** project, located under the `scripts/bws-secure/update-environments/` directory. It facilitates the management and synchronization of environment variables across **Netlify** and **Vercel** platforms, ensuring consistency and security.

---

## Table of Contents

- [Update Environment Variables Script](#update-environment-variables-script)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
    - [Project Configuration (`bwsconfig.json`)](#project-configuration-configjson)
    - [Required Variables File (`requiredVars.env`)](#required-variables-file-requiredvarsenv)
  - [Usage](#usage)
    - [Running the Script](#running-the-script)
    - [Options](#options)
  - [Netlify](#netlify)
    - [Environment Variables Management](#environment-variables-management)
    - [Testing](#testing)
  - [Vercel](#vercel)
    - [Environment Variables Management](#environment-variables-management-1)
    - [Status](#status)
  - [Utils Module](#utils-module)
  - [Token Handling](#token-handling)
  - [Error Handling](#error-handling)
  - [API Rate Limits](#api-rate-limits)
  - [Environment File Example](#environment-file-example)
  - [Script Behavior Without Configurations](#script-behavior-without-configurations)
  - [Logging](#logging)
  - [Contributing](#contributing)
  - [License](#license)
  - [Environment Mapping](#environment-mapping)
    - [Netlify Environments](#netlify-environments)
    - [Vercel Environments](#vercel-environments)
    - [Local Development](#local-development)

---

## Overview

The `updateEnvVars.js` script:

- Processes all projects configured for the detected platform
- Updates each project's variables only once (prevented by BWS_ENV_UPDATED flag)
- Supports multiple projects per platform in bwsconfig.json
- Can handle both Netlify and Vercel projects simultaneously
- Maintains separate environments (prod/dev) per project

If you are using the **BWS-Secure run wrapper**, for testing or general use, run the script using the following command:

```bash
pnpm secure-run node scripts/bws-secure/update-environments/updateEnvVars.js
```

---

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed.
2. **Environment Variables**: Add the required tokens to your `.env` file for local testing or development:
   ```env
   NETLIFY_AUTH_TOKEN=your_netlify_token
   BWS_ACCESS_TOKEN=your_access_token
   ```
   **Note**: `BWS_ACCESS_TOKEN` is primarily for local testing. During builds, tokens are securely retrieved from Bitwarden or specific platform configurations.

---

## Configuration

### Project Configuration (`bwsconfig.json`)

Define your projects and configurations in a `bwsconfig.json` file:

```json
{
  "projects": [
    {
      "platform": "vercel",
      "projectName": "your-vercel-project-name",
      "bwsProjectIds": {
        "prod": "00000000-0000-0000-0000-000000000001", // Bitwarden Secrets Manager Project ID for production
        "dev": "00000000-0000-0000-0000-000000000002", // BWS Project ID for development
        "local": "00000000-0000-0000-0000-000000000003" // BWS Project ID for local development
      },
      "preserveVars": ["BWS_ACCESS_TOKEN"]
    },
    {
      "platform": "netlify",
      "projectName": "your-netlify-site-name",
      "bwsProjectIds": {
        "prod": "00000000-0000-0000-0000-000000000004",
        "dev": "00000000-0000-0000-0000-000000000005",
        "local": "00000000-0000-0000-0000-000000000006"
      },
      "preserveVars": ["BWS_ACCESS_TOKEN"]
    }
  ]
}
```

- **platform**: Specify either `netlify` or `vercel`.
- **projectName**: The project name in Netlify/Vercel.
- **bwsProjectIds**: Map of Bitwarden Secrets Manager Project IDs for different environments.
  - These IDs are found in your Bitwarden Secrets Manager interface.
  - Each ID corresponds to a separate BWS project containing environment variables for that context.
  - Not to be confused with Netlify/Vercel project IDs.
- **preserveVars**: List of variables to retain unchanged.
- **exclusions**: List of variables to ignore during synchronization.

### Required Variables File (`requiredVars.env`)

Define mandatory variables in the `requiredVars.env` file:

```env
API_KEY=your_api_key
DATABASE_URL=your_database_url
SECRET_KEY=example_secret_key
ANOTHER_VAR=another_value
```

---

## Usage

### Running the Script

The script is typically run through the secure-run wrapper during platform builds:

```bash
# For Netlify:
NETLIFY=true pnpm secure-run your-command

# For Vercel:
VERCEL=1 pnpm secure-run your-command
```

When run this way:

1. Platform is detected automatically
2. All matching projects are processed
3. Each project is updated only once
4. Variables are synchronized with the platform

### Options

- `--platform, -p`: Specify the deployment platform (Netlify or Vercel).
- `--help, -h`: Show help information.
- `--validateRequiredVars`: Validate the `requiredVars.env` file.

---

## Netlify

### Environment Variables Management

- Retrieves existing environment variables for a site.
- Updates variables with new values.
- Excludes or preserves variables as specified in `bwsconfig.json`.

### Testing

To test locally:

```bash
node updateEnvVars.js --netlifyTest --netlifySiteId your-site-id --netlifyToken your-netlify-token --netlifyKey TEST_VAR
```

---

## Vercel

### Environment Variables Management

- Uses `vercel env ls --json` to list variables.
- Updates variables with `vercel env add`.

### Status

Work in progress. Similar to Netlify, but with minor differences in API handling.

---

## Utils Module

The `utils.js` module provides shared helper functions, including:

- **Logging**: Controlled by the `log` function, which supports levels like `INFO`, `DEBUG`, `WARN`, and `ERROR`.
- **Error Handling**: Centralized via the `handleError` function, with optional termination control.
- **File Reading**: Reads and parses `.env` files using `readEnvFile`.
- **Token Retrieval**: Uses `getBuildOrAuthToken` to prioritize tokens for platform authentication.
- **Validation**: Validates environment variables for proper formats with `validateValue`.

---

## Token Handling

Tokens such as `NETLIFY_AUTH_TOKEN` are required for API operations. The `getBuildOrAuthToken` function prioritizes tokens from environment variables and ensures their validity.

If a token is missing, the script will terminate with an error message. During testing, you can use `.env` files for token storage.

---

## Error Handling

Errors are logged and optionally terminate the script. Examples:

- **Fatal Errors**: Halt execution with detailed stack traces (in development mode).
- **Warnings**: Non-critical issues logged for user review.

You can control the termination behavior of errors by passing the `fatal` parameter to the `handleError` function.

---

## API Rate Limits

Both Netlify and Vercel impose rate limits on API requests. The script includes basic error handling to detect and log rate limit errors. For high-frequency operations, consider:

- Batching updates where possible.
- Avoiding excessive retries.
- Implementing delays or exponential backoff for retries.

---

## Environment File Example

Below is an example of a more detailed `.env` file for reference:

```env
NETLIFY_AUTH_TOKEN=your_netlify_token
VERCEL_AUTH_TOKEN=your_vercel_token
API_KEY=your_api_key
DATABASE_URL=your_database_url
SECRET_KEY=example_secret_key
ANOTHER_VAR=another_value
```

Ensure these variables match the required variables listed in your `bwsconfig.json` and `requiredVars.env` files.

---

## Script Behavior Without Configurations

If required configuration files are missing or incomplete:

- **`bwsconfig.json`**: The script will terminate with a detailed error message. Ensure it defines all projects with the correct structure.
- **`requiredVars.env`**: The script will log missing variables and terminate if critical variables are undefined.
- **Environment Variables**: Tokens like `NETLIFY_AUTH_TOKEN` or `VERCEL_AUTH_TOKEN` must be defined in `.env` or the environment.

---

## Logging

The script logs operations with timestamps and verbosity levels:

- **INFO**: General messages.
- **DEBUG**: Detailed debugging information.
- **WARN**: Warnings about potential issues.
- **ERROR**: Critical errors.

Logs are formatted differently in development (detailed JSON) versus production (concise format).

---

## Contributing

Contributions are welcome! Open an issue or submit a pull request for improvements or bug fixes.

---

## License

This script is licensed under the MIT License.

---

## Environment Mapping

### Netlify Environments

The system maps Netlify deployment contexts to Bitwarden Secrets Manager (BWS) project environments:

- **Production**: Uses the BWS project ID specified in `bwsProjectIds.prod`
- **Deploy Preview**: Uses the BWS project ID from `bwsProjectIds.dev` by default
- **Branch Deploy**: Uses the BWS project ID from `bwsProjectIds.dev` by default

#### Optional Environment Customization

For more granular control, you can specify separate BWS project IDs for different Netlify contexts:

```json
{
  "platform": "netlify",
  "projectName": "your-site-name",
  "bwsProjectIds": {
    "prod": "production-bws-project-id", // BWS Project ID for production
    "dev": "development-bws-project-id", // BWS Project ID for development
    "local": "local-development-bws-id", // BWS Project ID for local dev
    "deploy_preview": "preview-bws-id", // Optional: specific BWS Project ID for deploy previews
    "branch_deploy": "branch-bws-id" // Optional: specific BWS Project ID for branch deploys
  }
}
```

- If `deploy_preview` BWS project ID is specified, it will be used for deploy previews instead of `dev`
- If `branch_deploy` BWS project ID is specified, it will be used for branch deploys instead of `dev`
- If neither is specified, the `dev` BWS project ID is used as a fallback for all non-production contexts

This allows you to:

- Use the same variables for all non-production builds (default behavior using `dev`)
- Set up separate variables for deploy previews
- Configure branch-specific variables
- Mix and match as needed

### Vercel Environments

Vercel uses a simpler mapping:

- Production deployments use `prod`
- All other deployments (preview/development) use `dev`

### Local Development

Local development defaults to:

- Uses `local` BWS project ID
- Can be overridden with `BWS_ENV` environment variable
