Summary:
This file is responsible for handling the GraphQL queries and mapping the data for the Blog page. It includes functions for formatting and creating paths, as well as defining the type definitions and mappers for the Blog page.

Import statements:
- 'graphql-tag': A library for parsing GraphQL queries.
- '@last-rev/graphql-contentful-core': A package containing utility functions for working with Contentful data.
- '@last-rev/types': A package containing type definitions for the application.
- '@last-rev/graphql-contentful-extensions': A package containing GraphQL extensions for Contentful.
- '@last-rev/component-library': A package containing utility functions for working with components.
- 'lodash/kebabCase': A utility function from the Lodash library for converting strings to kebab-case.
- './utils/createType': A utility function for creating a new type object.

Script Summary:
This script defines the GraphQL type definitions, mappers, and path configurations for the Blog page. It also includes utility functions for formatting text, creating paths, and resolving media fields.

Internal Functions:
- mediaFieldResolver({ fields, ctx }): Resolves the media field for a given entry.
- getSeoValue(value, defaultValue): Returns the SEO value if it exists, otherwise returns the default value.
- getSlug(topic, ctx): Returns the slug for a given topic.
- createPath(...slug): Creates a path string from the given slug parts.
- formatBodyText(body, length): Formats the body text by removing headlines, lists, and trimming the string to the last punctuation.

External Functions:
- typeDefs: The GraphQL type definitions for the Blog page.
- mappers: The mappers for the Blog page, including Hero, PageBlog, and Card.
- pathsConfigs: The path configurations for the Blog page.

Interaction Summary:
This file is used by the GraphQL server to handle queries and mutations related to the Blog page. It interacts with the Contentful API to fetch and map the data, as well as other utility functions for formatting and creating paths.

Developer Questions:
1. How does the mediaFieldResolver function handle different media types?
2. Are there any limitations to the formatBodyText function when handling different content types?
3. How does the createPath function handle edge cases, such as empty or duplicate slugs?

Known Issues/Bugs:
- There are no known issues or bugs with this component.

Todo Items:
- Improve error handling and edge case handling for the utility functions.
- Add support for additional media types in the mediaFieldResolver function.