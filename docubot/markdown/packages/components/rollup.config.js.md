Summary:
This file exports a configuration object for the Rollup bundler. It specifies the input file, output directory, format, and other options.

Import statements:
- `config` from `@last-rev/rollup-config`: a function that returns a Rollup configuration object

Script Summary:
The `config` function is called with an options object that specifies the input file, output directory, format, and other options. The resulting configuration object is exported as the default export of this module.

Internal Functions:
None

External Functions:
None

Interaction Summary:
This file is used by the Rollup bundler to bundle the application's source code. It may interact with other configuration files and build scripts to determine the final build output.

Developer Questions:
- What is the purpose of the `preserveModules` option?
- How can I change the output format to ES modules?
- What other options can I pass to the `config` function?