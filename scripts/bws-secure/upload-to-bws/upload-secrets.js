// Required modules
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { execSync } = require('child_process');

// 1. Attempt to load a local .env (same directory)
const localEnvPath = path.join(__dirname, '.env');

// 2. If no local .env, try the root .env (adjust path depth to your repo)
const rootEnvPath = path.join(__dirname, '../../../.env');

// Check for and load whichever .env file we find
if (fs.existsSync(localEnvPath)) {
  console.log(`Loading environment from local .env at: ${localEnvPath}`);
  dotenv.config({ path: localEnvPath });
} else if (fs.existsSync(rootEnvPath)) {
  console.log(`Loading environment from root .env at: ${rootEnvPath}`);
  dotenv.config({ path: rootEnvPath });
} else {
  console.log('No local or root .env file found. Relying on existing environment variables.');
}

// Automatically determine the folder of the script
const folderPath = path.dirname(__filename);

// Function to sanitize and escape environment variable values
const sanitizeValue = (value) => {
  // Remove surrounding single or double quotes if present
  const unquotedValue = value.replace(/^['"]|['"]$/g, '');
  // Escape double quotes within the value
  return `"${unquotedValue.replace(/"/g, '\\"')}"`;
};

/**
 * Creates a colored ASCII box that fits any number of lines.
 * @param {string[]} lines   Lines of text to display inside the box
 * @param {string} colorCode ANSI color code (e.g., "\x1b[92m" for green, "\x1b[31m" for red)
 */
function createBox(lines, colorCode) {
  // Find the longest line to set box width
  let maxLen = 0;
  lines.forEach((line) => {
    if (line.length > maxLen) {
      maxLen = line.length;
    }
  });
  // Build top/bottom borders
  const top = '┌' + '─'.repeat(maxLen + 2) + '┐';
  const bottom = '└' + '─'.repeat(maxLen + 2) + '┘';

  // Print the box in the specified color
  console.log(colorCode + top);
  lines.forEach((line) => {
    // Pad each line so they are all the same width
    const paddedLine = line.padEnd(maxLen, ' ');
    console.log(`│ ${paddedLine} │`);
  });
  console.log(bottom + '\x1b[0m'); // reset color at the end
}

function createErrorBox(lines) {
  // Red color
  createBox(lines, '\x1b[31m');
}

function createSuccessBox(lines) {
  // We skip the border for lines that contain " Link:" or "https://"
  // so we only measure max length among the "boxed" lines.
  // 1) Find the lines that should be inside the box vs. "no-border" lines.
  const noBorderCheck = (l) => l.includes(' Link:') || l.includes('https://');
  const boxedLines = lines.filter((l) => !noBorderCheck(l));

  // 2) Determine the max width among boxed lines only.
  let maxLen = 0;
  boxedLines.forEach((line) => {
    if (line.length > maxLen) {
      maxLen = line.length;
    }
  });

  // 3) Build top/bottom borders
  const top = '┌' + '─'.repeat(maxLen + 2) + '┐';
  const bottom = '└' + '─'.repeat(maxLen + 2) + '┘';

  console.log('\x1b[92m' + top);

  // 4) Print each line: if it's a "no-border" line, print directly; else pad and box it.
  lines.forEach((line) => {
    if (noBorderCheck(line)) {
      // Print with no bounding "│" characters
      console.log(line);
    } else {
      const paddedLine = line.padEnd(maxLen, ' ');
      console.log(`│ ${paddedLine} │`);
    }
  });

  console.log(bottom + '\x1b[0m');
}

/**
 * Print a bright red error message, then exit.
 */
function showErrorAndExit(msg) {
  console.error(`\x1b[31m${msg}\x1b[0m`);
  process.exit(1);
}

/**
 * Attempt to parse and simplify the BWS error message that often includes Rust stack traces.
 * We remove location references, backtrace hints, etc., and if there is JSON with "message",
 * we extract that for a cleaner final output.
 */
function parseBwsErrorMessage(rawErrorMessage) {
  let simplified = rawErrorMessage.trim();

  // Try to find JSON in the error (e.g., {"message":"Resource not found.", ...})
  const matchJSON = simplified.match(/\{.*\}/s);
  if (matchJSON) {
    try {
      const errorObj = JSON.parse(matchJSON[0]);
      if (errorObj.message) {
        simplified = `Server responded with: "${errorObj.message}"`;
      }
    } catch {
      // If JSON parse fails, just keep going
    }
  }

  // Remove any location/backtrace lines
  simplified = simplified
    .replace(/Location:.*?\n/g, '')
    .replace(/Backtrace omitted.*?\n/g, '')
    .replace(/Run with.*?\n/g, '');

  return simplified;
}

// Track how many times we've been rate-limited:
let timesRateLimited = 0;

/**
 * Sleep synchronously for the given milliseconds (blocks Node's event loop).
 * For a script like this, blocking is usually acceptable.
 */
function syncSleep(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Busy-wait until ms have elapsed
  }
}

/**
 * Check if the error text appears to be a 429 or "too many requests".
 */
function isRateLimitError(errorText) {
  return /429|too\s+many\s+requests/i.test(errorText);
}

/**
 * Upload one secret with up to maxRetries.  If we detect rate-limit errors,
 * we sleep, increment timesRateLimited, then retry.
 */
function uploadSecretWithRetry(key, sanitizedValue, projectId, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const cmd = `dotenv -- npx bws secret create ${key} -- ${sanitizedValue} ${projectId}`;
      execSync(cmd, { stdio: 'pipe' }); // Hide CLI output
      return; // If successful, return immediately
    } catch (execError) {
      const rawErrorOutput = execError.stderr?.toString() || execError.stdout?.toString() || '';
      const prettyError = parseBwsErrorMessage(rawErrorOutput);

      if (isRateLimitError(prettyError)) {
        // If we got a rate-limit, wait before retrying
        if (timesRateLimited === 0) {
          console.log('\x1b[33mRate-limit detected; sleeping 10s...\x1b[0m');
          syncSleep(10_000);
        } else {
          console.log(`\x1b[33mRate-limit again; sleeping 0.5s...\x1b[0m`);
          syncSleep(500);
        }
        timesRateLimited++;

        // Then continue (i.e. retry) if we haven't exceeded maxRetries
        if (attempt < maxRetries) {
          continue; // move on to next attempt
        }
      }

      // If it's not a rate-limit error (or we ran out of attempts), throw a real error
      throw new Error(`Failed to upload secret "${key}". BWS CLI said:\n${prettyError}`);
    }
  }
}

// Function to process each .env.bws.* file
const processEnvFiles = () => {
  const files = fs.readdirSync(folderPath);
  const envFiles = files.filter((file) => file.startsWith('.env.bws.'));

  if (envFiles.length === 0) {
    console.error('No .env.bws.* files found in this folder.');
    process.exit(1);
  }

  const uploadResults = [];

  envFiles.forEach((file, i) => {
    const envFilePath = path.join(folderPath, file);
    const fileContent = fs.readFileSync(envFilePath, 'utf8');
    const lines = fileContent.split(/\r?\n/);
    const projectId = file.split('.').pop();

    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(projectId)) {
      showErrorAndExit(`
[ERROR] The project ID "${projectId}" is invalid.
It should be 36 characters, hyphenated like "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".
Please fix your BWS project ID.
`);
    }

    // Gather valid secrets from the file, last definition wins:
    const mappingForFile = {};
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const parts = trimmed.split('=');
      if (parts.length < 2) return;
      const key = parts.shift().trim();
      const value = parts.join('=').trim();
      mappingForFile[key] = value;
    });

    const secrets = Object.keys(mappingForFile).map((k) => ({
      key: k,
      value: mappingForFile[k]
    }));

    if (!secrets.length) {
      console.log(`No valid secrets found in ${file}. Skipping upload.`);
      uploadResults.push({ file, projectId, success: true, count: 0 });
      return;
    }

    console.log(
      `\nFound ${secrets.length} secrets in ${file}. Uploading to projectId: ${projectId}...`
    );

    try {
      secrets.forEach((secret, idx) => {
        const { key, value } = secret;
        const sanitizedValue = sanitizeValue(value);

        // Use our new retry-aware function
        uploadSecretWithRetry(key, sanitizedValue, projectId);

        // Show the secret key plus a count of how many we've done so far
        const current = idx + 1;
        console.log(`Uploaded secret "${key}" (${current}/${secrets.length})...`);
      });

      uploadResults.push({ file, projectId, success: true, count: secrets.length });

      // Only wait if there is more than one file total AND this isn't the last file
      if (envFiles.length > 1 && i < envFiles.length - 1) {
        console.log('Upload complete for this file; waiting 10 seconds before the next file...');
        syncSleep(10000);
      } else {
        console.log('Upload complete for this file; no further wait needed.');
      }
    } catch (error) {
      const prettyError = parseBwsErrorMessage(error.message);
      uploadResults.push({ file, projectId, success: false, error: prettyError });
    }
  });

  printFinalSummary(uploadResults);
};

/**
 * Prints a consolidated summary at the very end.
 * Shows a green success box listing any successful files,
 * and a red error box listing any failures.
 */
function printFinalSummary(uploadResults) {
  const successes = uploadResults.filter((r) => r.success);
  const failures = uploadResults.filter((r) => !r.success);

  if (successes.length > 0) {
    let successLines = [];
    successLines.push('');
    successLines.push(
      `SUCCESS! ${successes.length} of ${uploadResults.length} file(s) uploaded correctly.`
    );
    successLines.push('');
    successLines.push('Successfully Uploaded Project IDs:');
    successLines.push('');

    successes.forEach((s) => {
      successLines.push(`• Project ID: ${s.projectId} (${s.count} secrets)`);
      successLines.push(
        `  • Link: https://vault.bitwarden.com/#/sm/22479128-f194-460a-884b-b24a015686c6/projects/${s.projectId}/secrets`
      );
      successLines.push('');
    });

    // // Calculate dynamic separator width based on the longest line (excluding links)
    // const maxLineLength = Math.max(
    //   ...successLines.map((line) => (line.includes('Link:') ? 0 : line.length))
    // );
    // const separator = '='.repeat(maxLineLength);

    // // Insert the separator dynamically
    // successLines.unshift(separator);
    // successLines.push(separator);

    createSuccessBox(successLines);
  }

  if (failures.length > 0) {
    let errorLines = [];
    errorLines.push('');
    errorLines.push(
      `ERROR! ${failures.length} of ${uploadResults.length} file(s) failed to upload.`
    );
    errorLines.push('');

    failures.forEach((f) => {
      errorLines.push(`File: ${f.file}`);
      errorLines.push(`Project ID: ${f.projectId}`);
      errorLines.push('Reason:');
      errorLines.push(...f.error.split('\n').map((l) => `  ${l}`));
      errorLines.push('');
    });

    errorLines.push('Please fix the issues above and re-run the script.');

    // Calculate dynamic separator width based on the longest line
    const maxLineLength = Math.max(...errorLines.map((line) => line.length));
    const separator = '='.repeat(maxLineLength);

    // Insert the separator dynamically
    errorLines.unshift(separator);
    errorLines.push(separator);

    createErrorBox(errorLines);
  }

  if (successes.length === 0 && failures.length === 0) {
    console.log('No files were processed.');
  }
}

// Ensure BWS_ACCESS_TOKEN is set
if (!process.env.BWS_ACCESS_TOKEN) {
  console.error(
    'Error: BWS_ACCESS_TOKEN not found. Provide it via local/root .env or environment variables.'
  );
  process.exit(1);
}

// Start processing
processEnvFiles();
