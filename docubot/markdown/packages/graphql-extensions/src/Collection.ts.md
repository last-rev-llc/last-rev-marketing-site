Summary:
This file contains code for extending the Collection type in a GraphQL schema. It defines new fields and types related to collections, and includes resolvers for these fields.

Import statements:
- `getLocalizedField` and `ApolloContext` are imported from `@last-rev/graphql-contentful-core`
- `gql` is imported from `graphql-tag`
- `camelCase` and `toUpper` are imported from `lodash`
- `collectOptions` and `queryContentful` are imported from local files

Script Summary:
- Defines a `pascalCase` function that converts a string to PascalCase
- Defines an array of valid CollectionItem types
- Defines a GraphQL schema for extending the Collection type with new fields and types
- Defines resolvers for the new fields
- Defines a mapping of Contentful content types to CollectionItem types
- Exports the resolvers and schema

Internal Functions:
- `pascalCase(str: string)`: Converts a string to PascalCase
  - Parameters:
    - `str`: The string to convert
  - Returns: The converted string
- None

External Functions:
- None

Interaction Summary:
This file extends the Collection type in a GraphQL schema. It defines new fields and types related to collections, and includes resolvers for these fields. Other parts of the application can query these new fields and types.

Developer Questions:
- What is the purpose of extending the Collection type?
- How are the new fields and types related to collections?
- What is the purpose of the `itemsConnection` field?
- What is the purpose of the `CollectionItemConnection` type?
- How are the `items` and `itemsConnection` fields resolved?
- What is the purpose of the `ITEM_MAPPING` object?
- How are CollectionItem types resolved? 
- What is the purpose of the `resolvers` object?
- What is the purpose of the `mappers` object?
- What is the purpose of the `typeDefs` object?
- What is the purpose of the `collectOptions` and `queryContentful` functions?
- What is the purpose of the `ApolloContext` object?
- What is the purpose of the `loaders` object?
- What is the purpose of the `preview` property?
- What is the purpose of the `filters` property in the `CollectionSettings` interface?

Known Issues/Bugs:
- None
Todo:
- Add support for resolving the CollectionItem type variant.