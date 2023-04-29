Summary:
This file exports a configuration object that is used in the larger application. It sets up configurations for various third-party services such as Contentful, Algolia, and Redis.

Import statements:
- dotenv: loads environment variables from a .env file
- @last-rev/app-config: a package that provides a configuration object for Last Rev's applications
- ./packages/graphql-extensions/dist: a package that provides extensions for GraphQL

Script Summary:
The script loads environment variables using the dotenv package and defines some utility functions for parsing environment variables. It then creates a configuration object using the LastRevAppConfig class and exports it.

Internal Functions:
- testForEnvVar: takes an environment variable name and throws an error if it is not defined. Returns the value of the environment variable.
- parseNumberEnvVar: takes a string and parses it as an integer. Returns the integer value or undefined if the string cannot be parsed as an integer.
- parseBooleanEnvVar: takes a string and parses it as a boolean. Returns true if the string is "true", "1", "yes", or "y" (case-insensitive), false otherwise.

External Functions:
None

Interaction Summary:
This file exports a configuration object that is used in the larger application. The configuration object is used to set up various third-party services such as Contentful, Algolia, and Redis. Other parts of the application can access the configuration object by importing it from this file.

Developer Questions:
- What are the required environment variables for this configuration to work?
- What are the default values for the optional environment variables?
- How can I add support for a new third-party service to this configuration object?
- How can I modify the configuration object to use a different cache strategy or content strategy?
- How can I modify the configuration object to support multiple sites?
- How can I modify the configuration object to use a different log level?
- How can I modify the configuration object to use a different directory for content synchronization?
- How can I modify the configuration object to use a different set of extensions for GraphQL?
- How can I modify the configuration object to support additional content types for Algolia indexing?

Known Issues/Bugs:
None

Todo:
None