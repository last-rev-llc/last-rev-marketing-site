Summary:
This file exports a default configuration object for the Rollup bundler, which specifies the input file and babelHelpers option.

Import statements:
- `config` from `@last-rev/rollup-config`: a function that returns a Rollup configuration object.

Script Summary:
The script exports a default configuration object that specifies the input file (`./src/index.ts`) and sets the `babelHelpers` option to `'runtime'`.

Internal Functions:
None.

External Functions:
None.

Interaction Summary:
This file is part of a larger application that uses Rollup to bundle GraphQL extensions. The configuration object exported by this file will be used by Rollup to bundle the extension code. The bundled code will then be used by the application to extend its GraphQL functionality.

Developer Questions:
- What other files in the application use this configuration object?
- What is the purpose of the `babelHelpers` option and how does it affect the bundled code?
- What happens if the input file specified in this configuration object is missing or invalid?
- How can I customize this configuration object for a specific extension?