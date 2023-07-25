Summary:
This code is a script that exports a configuration object for a software application. The configuration object is created using the LastRevAppConfig class from the '@last-rev/app-config' package. The script sets up various environment variables and passes them as options to the LastRevAppConfig constructor. The configuration object includes settings for a Contentful CMS, Algolia search, Redis caching, and a file system content strategy.

Import statements:
- `require('envkey')`: This imports the 'envkey' package, which is used to load environment variables from a .env file.
- `const LastRevAppConfig = require('@last-rev/app-config')`: This imports the LastRevAppConfig class from the '@last-rev/app-config' package, which is used to create the configuration object.
- `const extensions = require('./packages/graphql-extensions/dist')`: This imports the 'extensions' object from the './packages/graphql-extensions/dist' file, which is used as an option in the configuration object.
- `const { resolve } = require('path')`: This imports the 'resolve' function from the 'path' module, which is used to resolve file paths.

Internal Functions:
- `testForEnvVar(name)`: This function takes a name parameter and checks if the corresponding environment variable exists. If the variable does not exist, an error is thrown. The function returns the value of the environment variable.
- `parseNumberEnvVar(value = '')`: This function takes an optional value parameter and attempts to parse it as a number. If the value is an empty string, undefined is returned. If the value cannot be parsed as a number, undefined is returned. Otherwise, the parsed number is returned.
- `parseBooleanEnvVar(value = '')`: This function takes an optional value parameter and attempts to parse it as a boolean. The function returns true if the value is 'true', '1', 'yes', or 'y' (case-insensitive), and false otherwise.

External Functions:
None

Interaction Summary:
This script exports a configuration object that can be used by other parts of the software application. The configuration object includes settings for a Contentful CMS, Algolia search, Redis caching, and a file system content strategy. Other parts of the application can import this configuration object and use it to configure their behavior.

Developer Questions:
- How do I modify the configuration options for the Contentful CMS, Algolia search, Redis caching, or file system content strategy?
- How do I add additional configuration options to the exported configuration object?
- How do I use the configuration object in other parts of the application?