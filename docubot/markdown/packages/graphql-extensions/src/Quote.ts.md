Summary:
This file exports a GraphQL schema definition language (SDL) that extends the `Quote` type with a new field called `actions` that returns an array of `Link` objects.

Import statements:
The file imports the `gql` function from the `graphql-tag` library.

Script Summary:
The `typeDefs` constant exports a GraphQL SDL string that extends the `Quote` type with a new field called `actions` that returns an array of `Link` objects.

Internal Functions:
There are no internal functions in this file.

External Functions:
There are no external functions in this file.

Interaction Summary:
This file defines a new field for the `Quote` type that can be used by other parts of the application that consume the `Quote` type. This file does not interact with any other parts of the application or third-party services.

Developer Questions:
- What is the `Link` type and where is it defined?
- How is the `actions` field used in the rest of the application?
- Are there any other SDL files that extend the `Quote` type? If so, how do they interact with this file?
- What other types are used in the application and how do they interact with the `Quote` type?
- Are there any naming conventions or guidelines for extending types in the application?

Known Issues and TODOs:
There are no known issues or bugs with this file. No TODOs are needed at this time.