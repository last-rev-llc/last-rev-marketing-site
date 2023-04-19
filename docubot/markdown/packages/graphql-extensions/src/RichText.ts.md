Summary:
This file contains a mapper for the RichText type in the GraphQL schema. It includes functions to handle the JSON and links fields of the RichText type.

Import statements:
- RichText from '@last-rev/graphql-contentful-extensions': imports the RichText type from a third-party package
- createHeadingId from './utils/createHeadingId': imports a utility function for creating heading IDs

Script Summary:
The mappers object contains two functions for the RichText type: json and links. The json function takes the raw RichText data and returns a modified version with added heading IDs. The links function returns the assets and entries associated with the RichText data, and also adds the modified RichText data to any tableOfContents entries.

Internal Functions:
- json: takes in raw RichText data and returns a modified version with added heading IDs. Parameters: raw (any), args (any), ctx (any), info (any). Returns: modified RichText data (any).
- links: takes in raw RichText data and returns the assets and entries associated with the data, and also adds the modified RichText data to any tableOfContents entries. Parameters: raw (any), args (any), ctx (any), info (any). Returns: object with assets (any) and entries (array of any).

External Functions:
None.

Interaction Summary:
This file interacts with the larger GraphQL schema and the RichText data type. It also imports a utility function for creating heading IDs.

Developer Questions:
- What is the purpose of the RichText type in the GraphQL schema?
- How does the createHeadingId utility function work?
- What other types in the GraphQL schema interact with the RichText type?