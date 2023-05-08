require('envkey');

const path = require('path');

module.exports = {
  client: {
    service: {
      name: process.env.APOLLO_GRAPH_REF || 'Last-Rev-Next-Starter',
      localSchemaFile: path.resolve(__dirname, './packages/graphql-sdk/schema.graphql'),
      url: process.env.GRAPHQL_SERVER_URL || 'http://localhost:5000/graphql'
    },
    includes: ['./packages/components/**/*.graphql', './packages/graphql-sdk/src/**/*.graphql'],
    excludes: ['**/generated/**']
  }
};
