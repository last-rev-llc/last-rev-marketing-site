Summary:
This file contains a single function called createHeadingId that takes in a string and returns a formatted ID.

Import statements:
There are no import statements in this file.

Script Summary:
The createHeadingId function takes in a string and formats it into a valid ID by converting it to lowercase, removing any non-alphanumeric characters, splitting it into an array of words, and then joining those words with hyphens. The resulting string is then returned as the ID.

Internal Functions:
- createHeadingId(text: string): This function takes in a string and returns a formatted ID.

External Functions:
There are no external functions in this file.

Interaction Summary:
This file is likely used by other files in the graphql-extensions package to generate IDs for headings in GraphQL documentation or other related content.

Developer Questions:
- What is the purpose of the createHeadingId function?
- How is the createHeadingId function used in other files in the graphql-extensions package?
- Are there any edge cases where the createHeadingId function may not generate a valid ID?