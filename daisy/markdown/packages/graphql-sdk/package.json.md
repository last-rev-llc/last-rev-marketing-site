{
  "name": "@last-rev-marketing-site/graphql-sdk",
  "version": "0.1.0",
  "main": "dist/index.js",
  "license": "MIT",
  "files": [
    "dist"
  ],
  "sideEffects": false,
  "scripts": {
    "build": "run-s clean download:schema codegen build:prod",
    "build:prod": "cross-env NODE_ENV=production rollup -c",
    "clean": "rimraf dist",
    "install:rover": "yarn rover -V || node ../../node_modules/@apollo/rover/install",
    "download:schema:dev": "nodemon -x \"npm run gql:healthcheck && graphql-codegen --config codegen.schema.yml --watch\" -w ../graphql-extensions/dist",
    "download:schema": "npm run gql:healthcheck && graphql-codegen --config codegen.schema.yml || echo 'GraphQL Server is not available'",
    "codegen": "graphql-codegen --config codegen.yml",
    "codegen:watch": "graphql-codegen --config codegen.yml --watch",
    "gql:healthcheck": "wait-on -c wait-on-config.js || echo 'GraphQL Server is not available'",
    "dev": "concurrently \"yarn download:schema:dev\" \"cross-env NODE_ENV=development rollup -cw\" \"yarn codegen:watch\"",
    "format": "prettier --write \"src/**/*.ts\"",
    "lint": "eslint",
    "test": "jest --passWithNoTests",
    "test:watch": "jest --watch"
  },
  "peerDependencies": {
    "@apollo/client": "^3.3.7",
    "@types/react": "^17.0.37",
    "@types/react-dom": "^17.0.11",
    "@types/react-router-dom": "^5.3.2",
    "graphql": "^16.6.0",
    "nodemon": "^2.0.15",
    "react": "^18.2.0",
    "react-dom": "^17.0.1",
    "react-scripts": "^4.0.1",
    "tsc-watch": "^4.2.9"
  },
  "dependencies": {
    "@graphql-codegen/fragment-matcher": "^3.3.3",
    "@graphql-codegen/cli": "2.16.1",
    "@graphql-codegen/schema-ast": "2.6.0",
    "@graphql-codegen/typescript-graphql-request": "4.5.8",
    "@graphql-codegen/typescript-operations": "2.5.10",
    "@last-rev/rollup-config": "^0.1.4",
    "concurrently": "^5.3.0",
    "dotenv": "^10.0.0",
    "graphql-tag": "^2.12.5",
    "npm-run-all": "^4.1.5"
  },
  "devDependencies": {
    "@apollo/client": "^3.3.7",
    "@apollo/rover": "0.4.1",
    "@last-rev-marketing-site/graphql-runner": "^0.1.0",
    "@types/react": "^17.0.37",
    "@types/react-dom": "^17.0.11",
    "@types/react-router-dom": "^5.3.2",
    "graphql": "^16.6.0",
    "nodemon": "^2.0.15",
    "react-scripts": "^4.0.1",
    "rollup": "^2.75.7",
    "tsc-watch": "^4.2.9",
    "react": "^18.2.0",
    "react-dom": "^17.0.1",
    "wait-on": "^5.3.0"
  }
}
