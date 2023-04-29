Summary:
This file defines the type definitions and mappers for the TableOfContents component in the larger application. It also defines the Heading type and a function to extract headings from a rich text object.

Import statements:
- gql from 'graphql-tag': A library for parsing GraphQL queries and mutations.
- NonRelativeModuleNameResolutionCache from 'typescript': A TypeScript module that provides a cache for resolving non-relative module names.

Script Summary:
- Defines the type definitions for the TableOfContents component using GraphQL syntax.
- Defines the Heading type, which has three properties: level (number), text (string), and id (string).
- Defines the mappers object, which has a TableOfContents property that maps to another TableOfContents object.
- The content property of the inner TableOfContents object is a function that takes an item and a cache as parameters and returns an array of Heading objects.
- The function extracts headings from a rich text object by iterating over its content and checking if each node is a heading.

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This file defines the type definitions and mappers for the TableOfContents component, which could be used by other components or queries in the larger application. The mappers object defines how the TableOfContents component should be mapped to data from the backend.

Developer Questions:
- What is the structure of the rich text object that the content function expects?
- How are the mappers used in the larger application?
- What other components or queries use the TableOfContents component?