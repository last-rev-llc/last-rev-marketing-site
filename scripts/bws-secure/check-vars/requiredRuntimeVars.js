/**
 * requiredRuntimeVars.js
 * -----------------------
 * This script scans specified directories in your JavaScript/TypeScript project
 * (or default directories if none are specified) to find references to `process.env.*`.
 * It supports:
 *   1. Default directory scanning (e.g. "functions", "api", "my-next-app-project-files")
 *   2. Named directory searches ("functions", "api") throughout the entire repo
 *   3. Direct paths ("my-next-app/functions/react")
 *   4. Wildcard / glob patterns ("my-next-app/**\/*.js")
 * It generates a report listing all required environment variables found, grouped
 * by folder. The main output file is `requiredVars.env` which will appear
 * in the parent directory (bws-secure).
 *
 * Usage examples:
 *   - pnpm scan
 *   - pnpm scan "functions"
 *   - pnpm scan "my-next-app/functions/react"
 *   - pnpm scan "my-next-app/**\/*.js"
 *   - pnpm scan "functions,api,my-next-app/**\/*.js"
 */

const fs = require('fs');
const path = require('path');

/**
 * ---------------------------------------------
 * CHANGE #1: Optional verbose logging
 *        Set VAR_SCANNER_VERBOSE=true in your
 *        environment to see extra console info
 * ---------------------------------------------
 */
const VERBOSE = process.env.VAR_SCANNER_VERBOSE === 'true';

/**
 * The root of the repository is determined by going up two levels ("../../..")
 * from this file's directory. That typically means:
 *   scripts/bws-secure/check-vars -> repoRoot
 */
const repoRoot = path.resolve(__dirname, '../../..');

/**
 * These are directories we always want to include if the user doesn't specify
 * any custom directories. So if the user doesn't provide arguments, we check:
 *   "functions", "api", and "amy-app/functions"
 * You can customize or expand this list as needed.
 */
const defaultDirs = [
  // Default folders we always want to check, if not explicitly provided
  'functions',
  'api',
  'packages'
];

/**
 * directoriesToCheck is determined by reading command-line arguments. For example:
 *   pnpm scan "someDir,anotherDir"
 * would yield process.argv[2] = "someDir,anotherDir"
 * so we split on commas, trim whitespace, and remove empty entries.
 */
let directoriesToCheck = [];
if (process.argv[2]) {
  directoriesToCheck = process.argv[2]
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * If the user didn't provide a directory that we know we always want to scan,
 * push those defaults into the list. For instance, if the user doesn't mention
 * "functions", we still want to check it.
 */
defaultDirs.forEach((d) => {
  if (!directoriesToCheck.includes(d)) directoriesToCheck.push(d);
});

/**
 * Reads .gitignore (if it exists) from the current working directory.
 *   - Appends each line that isn't a comment to the ignorePatterns array.
 *   - Always ignores "node_modules" by default.
 * This is used later to skip certain folders/files from scanning.
 */
function getIgnorePatterns() {
  const patterns = ['node_modules', 'dist', 'build', '.next', '.cache', 'coverage', '.git', '.turbo']; // Ignore common build/cache directories
  try {
    const gitignore = fs.readFileSync('.gitignore', 'utf-8');
    const additionalPatterns = gitignore
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));
    patterns.push(...additionalPatterns);
  } catch {
    console.warn('No .gitignore found, using default exclusions');
  }
  return patterns;
}

/**
 * Checks a given filePath to see if it matches any of the ignore patterns
 * (like those from .gitignore). If it matches, we skip scanning that path.
 */
function shouldIgnorePath(filePath, ignorePatterns) {
  // Normalize Windows backslashes to forward slashes
  const normalizedPath = filePath.replace(/\\/g, '/');

  return ignorePatterns.some((pattern) => {
    // Convert pattern (e.g. "*.test.js") to a simple regex that checks the entire path
    const regexPattern = pattern.replace(/\./g, '\\.').replace(/\*/g, '.*').replace(/\?/g, '.');
    return new RegExp(regexPattern).test(normalizedPath);
  });
}

/**
 * List of file extensions we want to scan for environment variables.
 * These are typically files that could contain runtime code.
 */
const VALID_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.vue', '.mjs', '.cjs', '.mts', '.cts']);

/**
 * Check if a file should be scanned based on its extension
 */
function isValidFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return VALID_EXTENSIONS.has(ext);
}

/**
 * Recursively list all files in a directory (any extension), skipping those
 * that match .gitignore patterns. If the directory doesn't exist, logs a warning
 * and returns an empty array (instead of throwing an error).
 */
async function getAllFiles(dir, ignorePatterns) {
  try {
    let files = [];

    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Add early exit for node_modules directories
      if (entry.isDirectory() && entry.name === 'node_modules') {
        if (VERBOSE) {
          console.log(`VERBOSE: Skipping node_modules directory: ${fullPath}`);
        }
        continue;
      }

      const relativePath = path.relative(process.cwd(), fullPath);

      // Skip if .gitignore says to ignore this path
      if (shouldIgnorePath(relativePath, ignorePatterns)) {
        if (VERBOSE) {
          console.log(`VERBOSE: Ignoring path (matched .gitignore): ${relativePath}`);
        }
        continue;
      }

      // If it's a directory, recurse deeper
      if (entry.isDirectory()) {
        files = files.concat(await getAllFiles(fullPath, ignorePatterns));
      } else if (isValidFileType(fullPath)) {
        // Only add files with valid extensions
        files.push(fullPath);
      } else if (VERBOSE) {
        console.log(`VERBOSE: Skipping file (invalid extension): ${relativePath}`);
      }
    }
    return files;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Directory not found: ${dir} - skipping`);
      return [];
    }
    throw error;
  }
}

/**
 * Comment patterns for different file types
 */
const COMMENT_PATTERNS = {
  '.js': { single: '//', multi: [['/*', '*/']] },
  '.jsx': { single: '//', multi: [['/*', '*/']] },
  '.ts': { single: '//', multi: [['/*', '*/']] },
  '.tsx': { single: '//', multi: [['/*', '*/']] },
  '.vue': {
    single: '//',
    multi: [
      ['/*', '*/'],
      ['<!--', '-->']
    ]
  },
  '.mjs': { single: '//', multi: [['/*', '*/']] },
  '.cjs': { single: '//', multi: [['/*', '*/']] },
  '.mts': { single: '//', multi: [['/*', '*/']] },
  '.cts': { single: '//', multi: [['/*', '*/']] }
};

/**
 * Reads the content of a file and searches for references to process.env.<VAR>.
 * It returns an array of variable names discovered. For example, if the file
 * contains "process.env.API_KEY", the array will include "API_KEY".
 *
 * ---------------------------------------------
 * CHANGE #2: Support lower-case letters, i.e.
 *            ([a-zA-Z0-9_]+) in the capturing group
 * ---------------------------------------------
 */
async function findEnvVarsInFile(filePath) {
  const content = await fs.promises.readFile(filePath, 'utf-8');
  const ext = path.extname(filePath).toLowerCase();
  const commentStyle = COMMENT_PATTERNS[ext] || {
    single: '//',
    multi: [['/*', '*/']]
  };

  // Use a single regex to remove all comments at once
  let noComments = content;
  const multiLinePatterns = commentStyle.multi.map(
    ([start, end]) => `${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`
  );
  const commentRegex = new RegExp(`(${multiLinePatterns.join('|')})|${escapeRegExp(commentStyle.single)}.*$`, 'gm');
  noComments = noComments.replace(commentRegex, '');

  // Use a more efficient regex with capturing group
  const envVarRegex = /process\.env\.([a-zA-Z0-9_]+)/g;
  const matches = new Set();
  let match;
  while ((match = envVarRegex.exec(noComments)) !== null) {
    matches.add(match[1]);
  }
  return Array.from(matches);
}

// Helper function to escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Detects if the user input might be a direct path or a wildcard path.
 * We treat user inputs that include a slash, or are ".", "..", or contain a
 * wildcard character (* or ?), as "full paths" or globs. Otherwise, we consider
 * them directory names to be discovered in the repo (like "functions").
 */
function isFullPathOrGlob(p) {
  return p.includes('/') || p === '.' || p === '..' || isGlobPath(p);
}

/**
 * Checks if the user input string is a wildcard pattern. We consider it a glob
 * if it includes an asterisk (*) or question mark (?).
 */
function isGlobPath(p) {
  return p.includes('*') || p.includes('?');
}

/**
 * Converts a wildcard pattern like "**\/*.js" or "*.ts" into a JavaScript
 * regular expression. We'll use this to filter only the files that match
 * the user-supplied glob pattern.
 */
function wildcardToRegex(pattern) {
  // First, escape literal dots
  let regexStr = pattern.replace(/\./g, '\\.');

  // Replace ** with a placeholder that we'll later replace with ".*"
  regexStr = regexStr.replace(/\*\*/g, '___GLOBSTAR___');

  // Replace single-star with "[^/]*", meaning any sequence of characters not including a slash
  regexStr = regexStr.replace(/\*/g, '[^/]*');

  // Replace the placeholder (___GLOBSTAR___) with ".*", letting us match multiple directory levels
  regexStr = regexStr.replace(/___GLOBSTAR___/g, '.*');

  // Replace the question mark with ".", which in regex means match exactly one character
  regexStr = regexStr.replace(/\?/g, '.');

  // Finally, anchor the regex so it must match the entire path
  return new RegExp(`^${regexStr}$`);
}

/**
 * For a userPath like "myNextApp/**\/*.js", we split it into:
 *   - baseDir: "myNextApp"
 *   - pattern: "**\/*.js"
 * If there's no slash before the wildcard, or it starts with "**",
 * we treat the entire userPath as the pattern and set baseDir = repoRoot by default.
 */
function parseGlobPath(userPath) {
  const slashIndex = userPath.indexOf('/');
  const starIndex = userPath.search(/[\*\?]/);

  // If the wildcard (* or ?) appears before an actual slash, or no slash at all,
  // assume the user typed something like "**/*.js" with no base directory
  if (starIndex >= 0 && (slashIndex < 0 || starIndex < slashIndex)) {
    return {
      baseDir: repoRoot,
      pattern: userPath
    };
  }

  // Otherwise, find the last slash before the wildcard so we can separate
  // the base directory from the glob pattern that follows.
  let lastSlash = userPath.lastIndexOf('/', starIndex);
  if (lastSlash === -1) {
    // No slash, but a wildcard is present
    return {
      baseDir: repoRoot,
      pattern: userPath
    };
  }

  // Everything up to lastSlash is the base directory, everything after is the pattern
  return {
    baseDir: path.resolve(repoRoot, userPath.slice(0, lastSlash)),
    pattern: userPath.slice(lastSlash + 1)
  };
}

/**
 * Filters a given array of file paths, returning only those that match the wildcard pattern.
 * E.g. if pattern = "**\/*.js", we keep only .js files within nested folders.
 */
function filterByPattern(files, pattern) {
  const regex = wildcardToRegex(pattern);
  return files.filter((file) => {
    // Convert to a relative path from repoRoot. This helps the wildcard match properly.
    const relPath = path.relative(repoRoot, file).replace(/\\/g, '/');
    return regex.test(relPath);
  });
}

/**
 * Recursively search the entire directory tree (starting from 'dir') for folders that
 * match the name 'targetDirName'. For example, if targetDirName = "functions",
 * it finds every "functions" folder anywhere in the repo.
 */
async function findAllNamedDirs(dir, targetDirName, ignorePatterns) {
  const results = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(process.cwd(), fullPath);

    if (shouldIgnorePath(relativePath, ignorePatterns)) {
      if (VERBOSE) {
        console.log(`VERBOSE: Skipping directory (matched .gitignore): ${relativePath}`);
      }
      continue;
    }

    if (entry.isDirectory()) {
      // If the directory name matches targetDirName, store it
      if (entry.name === targetDirName) {
        results.push(fullPath);
      }
      // Then recurse into that directory to see if deeper subdirectories match
      const deeper = await findAllNamedDirs(fullPath, targetDirName, ignorePatterns);
      results.push(...deeper);
    }
  }
  return results;
}

/**
 * If the user didn't provide custom directories, we do a fallback:
 * We search the entire repo for "functions" or "api" directories by name,
 * recurring on subfolders. This helps automatically gather typical function
 * or API directories used in many frameworks.
 */
async function findFunctionsDirs(dir, ignorePatterns) {
  const functionsDirs = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(process.cwd(), fullPath);

    if (shouldIgnorePath(relativePath, ignorePatterns)) {
      continue;
    }

    if (entry.isDirectory()) {
      // If the folder is literally named "functions" or "api",
      // or if "functions"/"api" is part of the path, we include it.
      if (
        entry.name === 'functions' ||
        entry.name === 'api' ||
        relativePath.includes('/functions/') ||
        relativePath.includes('/api/')
      ) {
        functionsDirs.push(fullPath);
      }
      // Recurse deeper to find more possible matches
      functionsDirs.push(...(await findFunctionsDirs(fullPath, ignorePatterns)));
    }
  }
  return functionsDirs;
}

/**
 * When scanning function directories discovered by findFunctionsDirs, we gather
 * only .js, .ts, or .tsx files. This is a narrower approach than getAllFiles because
 * we assume function code is typically in these file extensions.
 */
async function getFunctionFiles(dir) {
  let files = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(await getFunctionFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Removes any previous requiredVars.env file so we can write a fresh one.
 */
const cleanupExistingReport = async () => {
  const reportPath = path.join(__dirname, '../requiredVars.env');
  try {
    await fs.promises.unlink(reportPath);
    if (VERBOSE) {
      console.log(`VERBOSE: Removed old report file at ${reportPath}`);
    }
  } catch (error) {
    // Ignore if file doesn't exist
    if (error.code !== 'ENOENT') {
      console.warn(`Warning: Could not remove old report file: ${error.message}`);
    }
  }
};

/**
 * Main execution function. Orchestrates all logic:
 *   1. Decide which folders to scan
 *   2. Collect environment vars
 *   3. Writes out the final `requiredVars.env`
 */
async function main() {
  try {
    await cleanupExistingReport();
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error cleaning up report file:', error);
    }
  }
  console.log('Scanning for environment variables...');

  // Gather the patterns to ignore based on .gitignore
  const ignorePatterns = getIgnorePatterns();

  // We'll store absolute file paths that we want to scan for environment var references
  let pathsToScan = [];

  // If the user specified a list of directories or patterns:
  if (directoriesToCheck.length > 0) {
    console.log('Using selected paths:', directoriesToCheck);

    // Loop through each user-supplied path or pattern
    for (const userPath of directoriesToCheck) {
      // If userPath has slashes or wildcard, treat it as direct path or glob
      if (isFullPathOrGlob(userPath)) {
        // If it's a direct path with no wildcard (like "path/foo/bar")
        if (!userPath.includes('*') && !userPath.includes('?')) {
          const absolutePath = path.resolve(repoRoot, userPath);

          // If the path is outside our repoRoot, skip
          if (!absolutePath.startsWith(repoRoot)) {
            console.log(`Skipping ${absolutePath} - outside repo root`);
            continue;
          }

          // Attempt to verify the path exists, and then gather all files
          try {
            await fs.promises.access(absolutePath);
            const files = await getAllFiles(absolutePath, ignorePatterns);
            pathsToScan.push(...files);
          } catch (error) {
            if (error.code === 'ENOENT') {
              console.log(`Directory not found: ${absolutePath} - skipping`);
              continue;
            }
            throw error;
          }
        } else {
          // It's a wildcard or glob pattern, such as "my-next-app/**/*.js"
          const { baseDir, pattern } = parseGlobPath(userPath);

          if (!baseDir.startsWith(repoRoot)) {
            console.log(`Skipping ${baseDir} - outside repo root`);
            continue;
          }

          try {
            await fs.promises.access(baseDir);
            const files = await getAllFiles(baseDir, ignorePatterns);
            // Filter out only the files that match the user-provided pattern
            const matched = filterByPattern(files, pattern);
            pathsToScan.push(...matched);
          } catch (error) {
            if (error.code === 'ENOENT') {
              console.log(`Directory not found: ${baseDir} - skipping`);
              continue;
            }
            throw error;
          }
        }
      } else {
        // Name-based directory search, e.g. "functions" or "api"
        const matchingDirs = await findAllNamedDirs(repoRoot, userPath, ignorePatterns);
        if (matchingDirs.length === 0) {
          console.log(`No directories named '${userPath}' found - skipping`);
          continue;
        }
        // For each matching directory, gather all files
        for (const matchedDir of matchingDirs) {
          try {
            const files = await getAllFiles(matchedDir, ignorePatterns);
            pathsToScan.push(...files);
          } catch (error) {
            if (error.code === 'ENOENT') {
              console.log(`Directory not found: ${matchedDir} - skipping`);
              continue;
            }
            throw error;
          }
        }
      }
    }
  } else {
    // If user provided no custom directories, we do a fallback search for "functions" or "api"
    const functionsDirs = await findFunctionsDirs(repoRoot, ignorePatterns);
    console.log(`Found ${functionsDirs.length} matching directories:`);
    functionsDirs.forEach((dir) => console.log(`- ${path.relative(repoRoot, dir)}`));

    // Now gather JS/TS files from those discovered function/api directories
    for (const dir of functionsDirs) {
      const files = await getFunctionFiles(dir);
      pathsToScan.push(...files);
    }
  }

  // If no files ended up in pathsToScan, we let the user know and exit gracefully
  if (pathsToScan.length === 0) {
    console.log('\nNo files found to scan. To scan specific directories, you can:');
    console.log("1. Create a 'functions' or 'api' directory in your project");
    console.log('2. Pass custom directories or patterns as an argument:');
    console.log('   pnpm scan "src,pages,components"');
    console.log('   pnpm scan "my-next-app/**/*.js"');
    process.exit(0);
  }

  /**
   * We'll create a Map keyed by directory, with a Set of environment variable names
   * that we found in that directory's files.
   */
  const envVarsByDir = new Map();
  const varTotalReferences = new Map();
  const varOccurrences = new Map();
  let totalFileCount = 0;

  let filesProcessed = 0;
  const totalFiles = pathsToScan.length;

  for (const file of pathsToScan) {
    filesProcessed++;
    if (filesProcessed % 100 === 0 || filesProcessed === totalFiles) {
      process.stdout.write(`\rProcessing files: ${filesProcessed}/${totalFiles}`);
    }

    if (VERBOSE) {
      console.log(`\nVERBOSE: Scanning file: ${path.relative(repoRoot, file)}`);
    }
    const vars = await findEnvVarsInFile(file);
    if (vars.length) {
      const dir = path.dirname(file);
      if (!envVarsByDir.has(dir)) {
        envVarsByDir.set(dir, new Set());
      }

      // Count each occurrence in the file
      vars.forEach((v) => {
        envVarsByDir.get(dir).add(v);
        varTotalReferences.set(v, (varTotalReferences.get(v) || 0) + 1);
      });

      totalFileCount++;
    }
  }

  console.log('\n'); // New line after progress indicator

  // Count directory occurrences
  for (const vars of envVarsByDir.values()) {
    for (const v of vars) {
      varOccurrences.set(v, (varOccurrences.get(v) || 0) + 1);
    }
  }

  // Calculate total references (actual sum of all variable references)
  const totalReferences = Array.from(varTotalReferences.values()).reduce((sum, count) => sum + count, 0);

  // Get unique variables across all directories
  const allEnvVars = new Set();
  for (const vars of envVarsByDir.values()) {
    for (const v of vars) {
      allEnvVars.add(v);
    }
  }

  // Find variables used in multiple directories
  const repeatedVars = Array.from(varOccurrences.entries())
    .filter(([_, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]); // Sort by occurrence count descending

  console.log('\nEnvironment Variable Statistics:');
  console.log(`- ${allEnvVars.size} unique environment variables`);
  console.log(`- ${totalReferences} total variable references`);
  console.log(`- ${envVarsByDir.size} directories containing environment variables`);
  console.log(`- ${totalFileCount} files containing environment variables`);

  if (repeatedVars.length > 0) {
    console.log('\nVariables used in multiple directories:');
    repeatedVars.forEach(([varName, count]) => {
      const totalRefs = varTotalReferences.get(varName);
      console.log(`- ${varName}: used in ${count} directories (${totalRefs} total references)`);
    });
  }

  // Build a human-readable report that we can write to disk
  const reportLines = [
    '# Environment Variables Required by Directory',
    `# Generated: ${new Date().toLocaleString()}`,
    '#',
    '# This file maps which environment variables are required in each directory.',
    '#\n'
  ];

  // Group results by the first directory segment so e.g. "functions/userHandler" and
  // "functions/kitchenSink" can be listed together.
  const groupedDirs = new Map();
  for (const [dir, vars] of envVarsByDir) {
    const relativePath = path.relative(process.cwd(), dir);
    const parentDir = relativePath.split('/')[0] || '.';
    if (!groupedDirs.has(parentDir)) {
      groupedDirs.set(parentDir, []);
    }
    groupedDirs.get(parentDir).push([dir, vars]);
  }

  // For each parent dir group, list subdirectories and environment variables discovered
  for (const [parentDir, entries] of groupedDirs) {
    // Turn headings into comments
    reportLines.push(`# ${parentDir}`);
    reportLines.push('');

    for (const [dir, vars] of entries) {
      const relativePath = path.relative(process.cwd(), dir);
      reportLines.push(`# ${relativePath}`);

      const sortedVars = Array.from(vars).sort();
      for (const envVar of sortedVars) {
        reportLines.push(envVar);
      }
      reportLines.push('');
    }
    reportLines.push('');
  }

  // Write out the final formatted report to a single file in this directory (check-vars).
  const OUTPUT_PATH = path.join(__dirname, '..', 'requiredVars.env');

  const outputDir = path.dirname(OUTPUT_PATH);
  try {
    await fs.promises.mkdir(outputDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST ') {
      throw error;
    }
  }

  await fs.promises.writeFile(OUTPUT_PATH, reportLines.join('\n'), 'utf8');
  console.log(`Environment variable report written to ${OUTPUT_PATH}`);
}

// Execute the main function, and if there's an error, catch it, log it, and exit with a non-zero code.
main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
