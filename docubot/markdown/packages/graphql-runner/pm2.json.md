# README for "gql-serve.js"

## TODO Items
- None at the moment.

## Known Issues
- None at the moment.

## Description
This file is used to serve GraphQL APIs using the Last-Rev CLI. It is located in the `../../node_modules/@last-rev/cli/dist/` directory.

## Usage
To use this file, run the following command in your terminal:
```
node gql-serve.js -c ../../lrconfig.js
```
This will start the GraphQL server with the configuration specified in `../../lrconfig.js`.

## Configuration
The configuration for the server is specified in `../../lrconfig.js`. The following options are available:
- `port`: The port number to use for the server.
- `endpoint`: The endpoint for the GraphQL API.
- `schema`: The path to the GraphQL schema file.
- `resolvers`: The path to the GraphQL resolvers file.
- `context`: The path to the GraphQL context file.
- `middlewares`: An array of middleware functions to use with the server.

## Cluster Mode
This file can be run in cluster mode by setting the `exec_mode` option to `"cluster"` and the `instances` option to the number of instances to run.

## Watch Mode
This file can be run in watch mode by specifying the files to watch in the `watch` option. Any changes to these files will cause the server to restart.