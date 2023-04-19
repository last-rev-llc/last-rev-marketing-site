# Expected Environment Variables
## Summary
This section lists the expected environment variables and their default values.

- GRAPHQL_SERVER_URL (optional) - URL of the GraphQL server. If not provided, defaults to `http://localhost:3000/api/graphql`

# About
## Summary
This section provides an overview of the module.

This module takes the contents of the `./src` directory and generates Typescript types and an SDK to be used in your app.

# Usage
## Summary
This section provides instructions on how to use the module.

## Schema (schema.graphql)
### Summary
This subsection provides instructions on how to use the schema.

The GraphQL SDK code generation depends on an available Schema located in `schema.graphql` file. When the GraphQL server is available this file can be downloaded and updated. This is also ran as part of the `dev` and `build` scripts.

### Trigger manually by running:
```
yarn download:schema
```

### If the GraphQL server is not available, the existing file will be used for code generation. It is recommended to commit the changes to the schema, as the SDK will be generated from the latest version available.

## Queries and Mutations
### Summary
This subsection provides instructions on how to define queries and mutations.

Define your queries and mutations in `.src/queries` and `.src/mutations`. These should be typescript files exporting graphql statements compiled with [graphql-tag](https://www.npmjs.com/package/graphql-tag).

## Fragments
### Summary
This subsection provides instructions on how to use fragments.

If there are any reusable fragments, these can be saved in the `.src/fragments` directory and imported into a gql statement like this:

```javascript
import ContentFragment from '../fragments/content.fragment.ts';

export const MyStatement = gql`
${ContentFragment}
// ... you can now reference the fragemnt in your graphql statement
```

# Output
## Summary
This section provides information on the output of the module.

All the queries and mutations will be used to generate SDKs specific to those queries/mutations.

For example, to generate a paths query

```javascript
import gql from 'graphql-tag';

export const PathsQuery = gql`
  query Paths($locales: [String!]) {
    paths(locales: $locales) {
      params {
        slug
        locale
      }
    }
  }
`;
```

```javascript
export const getStaticPaths = async ({ locales }: PageGetStaticPathsProps) => {
  const { data } = await sdk.Paths({ locales });

  return {
    paths: data?.paths,
    fallback: false
  };
};
```

## Related Files
- `./src`
- `schema.graphql`

## List of questions that could be answered about this document that could make it more useful
- What is the purpose of this module?
- How do I define queries and mutations?
- How do I use fragments?
- What is the output of the module?
- What are the expected environment variables?

## List of questions that could be asked that the contents of this document could be a resource for developers
- How do I generate an SDK specific to a query/mutation?
- How do I download and update the schema?