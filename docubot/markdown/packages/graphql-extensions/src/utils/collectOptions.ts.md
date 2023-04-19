Summary:
This file contains a function called collectOptions that takes in filters, items, and ctx as parameters and returns a Promise of an object with key-value pairs of options. It also contains a helper function called toOption that is used within collectOptions.

Import statements:
- getLocalizedField from '@last-rev/graphql-contentful-core': a function that retrieves a localized field from a Contentful entry
- ApolloContext from '@last-rev/types': a type definition for the context object used in Apollo Server
- uniqBy from 'lodash/uniqBy': a function that removes duplicates from an array based on a specified key

Script Summary:
The collectOptions function takes in filters, items, and ctx as parameters. It creates a Set for each filter and loops through each item to add values to the corresponding Set. It then maps each Set to an array of Option objects using the toOption helper function, removes duplicates, and returns an object with key-value pairs of options.

Internal Functions:
- toOption: a helper function that takes in ctx and a value and returns an Option object. If the value is an object with a sys and fields property, it returns an Option object with the title or internalTitle as the label and the sys id as the value. If the value is an object with only a sys property, it loads the entry using the entryLoader from ctx and returns an Option object with the title or internalTitle as the label and the sys id as the value. Otherwise, it returns an Option object with the value as both the label and value.

External Functions:
- collectOptions: a function that takes in filters, items, and ctx as parameters and returns a Promise of an object with key-value pairs of options. It loops through each filter and item to add values to a corresponding Set, maps each Set to an array of Option objects using the toOption helper function, removes duplicates, and returns an object with key-value pairs of options.

Interaction Summary:
This file interacts with the rest of the application by using the getLocalizedField function from '@last-rev/graphql-contentful-core' and the ApolloContext type definition from '@last-rev/types'. It also uses the entryLoader from ctx to load entries for unexpanded link references.

Developer Questions:
- What is the expected format of the filters and items parameters?
- What is the expected format of the ctx parameter?
- How does the getLocalizedField function work?
- How does the entryLoader from ctx work?
- How are the options sorted in collectOptions?