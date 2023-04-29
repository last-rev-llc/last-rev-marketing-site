Summary:
This file imports various modules and components, merges their type definitions, resolvers, mappers, type mappings, and paths configurations, and exports them for use in the larger application.

Import statements:
- `compact`, `map`, and `merge` from the `lodash` library
- `mergeTypeDefs` and `mergeResolvers` from the `@graphql-tools/merge` library
- `Source`, `DocumentNode`, and `GraphQLSchema` from the `graphql` library
- Various components from the `@last-rev/graphql-contentful-extensions` library
- Several modules from the local directory

Script Summary:
This script merges the type definitions, resolvers, mappers, type mappings, and paths configurations of various components and modules. It exports these merged objects for use in the larger application.

Internal Functions:
None

External Functions:
None

Interaction Summary:
This file does not interact with the rest of the application directly. Instead, it exports merged objects that can be used by other parts of the application.

Developer Questions:
- What components and modules are being merged in this file?
- How are the merged objects being exported for use in the larger application? 
- What is the purpose of each merged object (type definitions, resolvers, mappers, type mappings, paths configurations)? 
- How can I modify the merged objects if needed? 

Known Issues/Bugs:
None

Todo:
None