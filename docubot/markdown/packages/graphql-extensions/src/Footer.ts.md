Summary:
This file contains a GraphQL schema definition for extending the Footer type with a navigationItems field.

Import statements:
- `gql` from `graphql-tag`: A library for parsing GraphQL queries and schema definitions.

Script Summary:
The `typeDefs` constant exports a GraphQL schema definition that extends the `Footer` type with a `navigationItems` field, which is an array of `Collection` objects.

Internal Functions:
None.

External Functions:
None.

Interaction Summary:
This file defines a new field for the `Footer` type in the GraphQL schema. Other parts of the application can query this field to retrieve navigation items for the footer.

Developer Questions:
- What other types are being extended in the GraphQL schema?
- Where are the resolvers for the `Footer` type defined?
- What is the `Collection` type and where is it defined?
- How are the navigation items for the footer being retrieved and populated?