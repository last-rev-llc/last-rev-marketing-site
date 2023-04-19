Summary:
This file exports a default configuration object for the Rollup bundler, which specifies the input file and babelHelpers option.

Import statements:
- `config` from `@last-rev/rollup-config`: a function that returns a Rollup configuration object.

Script Summary:
The script exports a Rollup configuration object that specifies the input file as `./src/index.ts` and sets the `babelHelpers` option to `'runtime'`.

Internal Functions:
None.

External Functions:
None.

Interaction Summary:
This file is likely used by the Rollup bundler to build the application. Other files in the application may import this configuration object to use in their own Rollup configurations.

Developer Questions:
- What is the purpose of the `babelHelpers` option and why is it set to `'runtime'`?
- How does this configuration object fit into the overall Rollup configuration for the application?
- What happens if the input file path is changed or does not exist?