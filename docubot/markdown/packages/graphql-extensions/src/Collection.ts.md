Summary:
This file defines the type definitions, resolvers, and mappers for the Collection type in a GraphQL schema. It also includes utility functions for querying Contentful and collecting options for filtering.

Import statements:
- `getLocalizedField` from `@last-rev/graphql-contentful-core`: a utility function for getting localized fields from a Contentful entry
- `ApolloContext` from `@last-rev/types`: a type definition for the context object passed to GraphQL resolvers
- `gql` from `graphql-tag`: a library for defining GraphQL type definitions
- `camelCase` and `toUpper` from `lodash`: utility functions for converting strings to camelCase and PascalCase

Script Summary:
- Defines type definitions for the Collection type, including fields for items, introText, and itemsConnection
- Defines type definitions for CollectionOptions, Option, and ConnectionPageInfo
- Defines an input type for filtering Collection items
- Defines a union type for CollectionItem, which can be one of several Contentful content types
- Defines mappers for the Collection type, including resolvers for the items and itemsConnection fields
- Defines a resolver for the CollectionItem union type, which maps Contentful content types to CollectionItem types
- Defines utility functions for querying Contentful and collecting options for filtering

Internal Functions:
- `pascalCase`: a function that converts a string to PascalCase
  - Parameters: `str` (string) - the string to convert
  - Returns: a PascalCase version of the input string
- `mappers`: an object that defines mappers for the Collection type
  - Properties:
    - `Collection.Collection.items`: a resolver for the `items` field of the Collection type
      - Parameters: `collection` (object) - the Collection object being resolved, `_args` (object) - unused, `ctx` (object) - the ApolloContext object
      - Returns: an array of CollectionItem objects
    - `Collection.Collection.itemsConnection`: a resolver for the `itemsConnection` field of the Collection type
      - Parameters: `collection` (object) - the Collection object being resolved, `args` (object) - an object with optional `limit`, `offset`, and `filter` properties, `ctx` (object) - the ApolloContext object
      - Returns: an object with `pageInfo` and `items` properties, where `pageInfo` is an object with `options`, `allOptions`, and `total` properties, and `items` is an array of CollectionItem objects
- `resolvers`: an object that defines resolvers for the CollectionItem union type
  - Properties:
    - `CollectionItem.__resolveType`: a resolver for determining the type of a CollectionItem object
      - Parameters: `item` (object) - the CollectionItem object being resolved
      - Returns: a string representing the type of the CollectionItem object

External Functions:
- `typeDefs`: a string containing the type definitions for the Collection type and related types
- `queryContentful`: a function for querying Contentful for items of a given content type and filter
  - Parameters: `options` (object) - an object with `contentType`, `ctx`, `order`, `filter`, `limit`, and `skip` properties
  - Returns: an array of Contentful entry objects
- `collectOptions`: a function for collecting filtering options for a set of Contentful entries
  - Parameters: `options` (object) - an object with `filters`, `items`, and `ctx` properties
  - Returns: an object with `tags` and `topics` properties, each containing an array of `Option` objects

Interaction Summary:
This file defines the type definitions, resolvers, and mappers for the Collection type in a GraphQL schema. It interacts with other parts of the application by using the `ApolloContext` object to query Contentful and load entries using DataLoader. It also interacts with the `@last-rev/graphql-contentful-core` package to get localized fields from Contentful entries.

Developer Questions:
- What are the possible values for the `CollectionItem` union type?
- How are filtering options collected for a set of Contentful entries?
- What is the `ApolloContext` object and what properties does it have?
- How are entries loaded using DataLoader?
- What is the `@last-rev/graphql-contentful-core` package and how is it used in this file?