const path = require('path');
module.exports = {
  client: {
    service: {
      //this is Cecilia's config for apollo, if you have one change this ID for yours.
      name: 'Last-Rev-Next-Starter',
      localSchemaFile: path.resolve(__dirname, './packages/graphql-sdk/schema.graphql'),
      url: 'http://localhost:5000/graphql'
    },
    includes: ['./packages/components/**/*.graphql', './packages/graphql-sdk/src/**/*.graphql'],
    excludes: ['**/generated/**']
  }
};
