# @last-rev-marketing-site/utils

This is a utility package for the Last Rev Marketing Site.

## TODO Items
- None at the moment.

## Known Issues
- None at the moment. 

## Installation
To install this package, run the following command:
```
npm install @last-rev-marketing-site/utils
```

## Usage
This package exports various utility functions that can be used in the Last Rev Marketing Site project.

## Scripts
- `clean`: removes the `dist` directory
- `watch`: builds the project in development mode and watches for changes
- `build`: runs `clean` and `build:prod` in sequence
- `dev`: builds the project in development mode
- `build:prod`: builds the project in production mode
- `compile`: compiles the TypeScript files
- `compile:watch`: compiles the TypeScript files and watches for changes
- `test`: runs Jest tests
- `test:watch`: runs Jest tests and watches for changes
- `format`: formats the code using Prettier
- `lint`: lints the code using ESLint
- `prepublishOnly`: runs `lint` and `build` before publishing the package
- `prepare`: runs `build` before publishing the package
- `preversion`: runs `lint` before creating a new version
- `version`: formats the code using Prettier and adds the changes to Git
- `postversion`: pushes the changes and tags to Git

## Dependencies
- `graphql-request`: ^3.6.0
- `@last-rev-marketing-site/graphql-sdk`: ^0.1.0

## Dev Dependencies
- `@last-rev/rollup-config`: ^0.1.4
- `rollup`: ^2.75.7

## Hooks
This package uses Husky to run scripts before committing and pushing changes.
- `pre-commit`: runs `lint-staged`
- `pre-push`: runs `test`

## lint-staged
This package uses lint-staged to run scripts on staged files.
- `packages/*src/**/*.{js,jsx,json,css,ts,tsx}`: runs `prettier --write` and `eslint --fix`