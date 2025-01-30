# BWS Secure Transfer

This directory contains scripts and helper files to securely manage secrets with BWS (Bitwave Solutions) using a streamlined, automated approach.

## Upload Secrets Script (`upload-secrets.js`)

The [`upload-secrets.js`](./upload-secrets.js) file automates the process of uploading secrets to your BWS project(s). It scans the directory for files following the `.env.bws.*` naming pattern and uploads secrets to the corresponding BWS projects. This eliminates the need for manual secret management.

### Features

- **Automated Uploads:** Processes multiple `.env.bws.*` files in the directory.
- **Dynamic Project ID Extraction:** Automatically determines the project ID from the filename.
- **Secure Token Management:** Utilizes `dotenv` or environment variables to load `BWS_ACCESS_TOKEN` securely.
- **Error Resilience:** Logs errors for individual files without interrupting the overall upload process.

---

## Requirements

1. **Environment Setup:**

   - Ensure you have a `.env` file containing your `BWS_ACCESS_TOKEN` located in the root of your project or a parent directory:
     ```env
     BWS_ACCESS_TOKEN=EXAMPLE_ACCESS_TOKEN
     ```
   - The token must have **write or expand permissions** to push new secrets. If you encounter errors, check and update the token’s permissions in the BWS admin portal.

2. **Dependencies:**

   - Install the required tools:
     ```bash
     npm install -g dotenv-cli
     ```

3. **File Naming Convention:**
   - Ensure all secret files are named using the pattern `.env.bws.<project-id>`. The `<project-id>` portion should exactly match your BWS project ID. For example:
     ```
     .env.bws.1234-project-id-from-bws-567890
     ```

---

## Usage

### Running the Script

To upload secrets for all `.env.bws.*` files in the directory:

```bash
node ./upload-secrets.js
```

The script will:

1. Scan the directory for `.env.bws.*` files.
2. Extract the project ID from each file’s name.
3. Upload secrets to the respective BWS projects using the key-value pairs in each file.

### Manual Command Example

To upload a single secret manually, use the following command:

```bash
dotenv -- npx bws secret create <key> "<value>" <project-id>
```

For example:

```bash
dotenv -- npx bws secret create EXAMPLE_VAR_SET "example_value" project-id-1234-548395
```

Replace `<key>`, `<value>`, and `<project-id>` with your actual values.

---

## Best Practices

1. **Secure Token Management:**

   - Avoid hardcoding sensitive values like `BWS_ACCESS_TOKEN` directly in the script or files. Use environment variables or `.env` files for better security.

2. **File Organization:**

   - Group your `.env.bws.*` files logically to match the projects they serve. Use clear and descriptive names for the project ID portion of the file name.

3. **Version Control:**
   - Do not commit `.env` or `.env.bws.*` files to version control systems. Use `.gitignore` to exclude them:
     ```
     .env
     .env.bws.*
     ```

---

## Troubleshooting

1. **Token Errors:**

   - If you encounter errors like `permission denied` or `unexpected argument`, ensure:
     - Your `BWS_ACCESS_TOKEN` is correct and loaded into the environment.
     - Your token has the necessary permissions to create or update secrets.

2. **File Not Processed:**

   - Verify that the file name matches the `.env.bws.<project-id>` pattern.
   - Check that the file contains valid key-value pairs.

3. **Environment Not Loaded:**

   - Ensure `dotenv-cli` is installed and the `.env` file is located in the project root or a parent directory.

4. **Rate Limiting:**
   - If you are processing many files or making frequent API requests, you may encounter rate limits. Reduce the number of requests or add delays between uploads.

---

## Contributing

We welcome contributions to improve this project. Feel free to open issues or submit pull requests with enhancements or bug fixes.

### Suggestions for Improvement

- Add parallel processing for faster uploads when handling many `.env.bws.*` files.
- Include unit tests for the script to ensure reliability.
- Extend support for additional configuration formats (e.g., YAML, JSON).
- Add logging options for more detailed reports of successful and failed uploads.

---

## License

This project is licensed under the [MIT License](LICENSE).
