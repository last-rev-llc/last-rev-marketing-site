Summary:
This file defines the type definitions and mappers for the TableOfContents GraphQL type. It also exports a Heading type and a function to extract headings from rich text content.

Import statements:
- gql from 'graphql-tag': A library for parsing GraphQL queries and schema definitions.
- NonRelativeModuleNameResolutionCache from 'typescript': A TypeScript type for caching module name resolution results.

Script Summary:
- Defines the Heading and TableOfContents GraphQL types.
- Defines a mapper function to extract headings from rich text content.

Internal Functions:
- None.

External Functions:
- None.

Interaction Summary:
This file defines the GraphQL schema and resolvers for the TableOfContents type. It could be used by other parts of the application to query and manipulate table of contents data.

Developer Questions:
- What is the format of the rich text content that the mapper function expects?
- How is the TableOfContents type used in other parts of the application?
- Are there any other resolvers or types that depend on the TableOfContents type?