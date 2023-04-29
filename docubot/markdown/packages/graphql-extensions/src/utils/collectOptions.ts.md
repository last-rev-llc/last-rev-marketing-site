Summary:
This file exports two functions, `collectOptions` and `toOption`, which are used to collect and format options for a select input field. The options are collected from a list of items and filtered based on a list of filters. The `toOption` function is used to format the options into an object with a label and value.

Import statements:
The file imports three dependencies: `getLocalizedField` from `@last-rev/graphql-contentful-core`, `ApolloContext` from `@last-rev/types`, and `uniqBy` from `lodash/uniqBy`.

Script Summary:
The `collectOptions` function takes in an object with three properties: `filters`, `items`, and `ctx`. `filters` is an array of objects with an `id` and `key` property. `items` is an array of items to collect options from. `ctx` is an object with context information for the Apollo server. The function returns a promise that resolves to an object with keys corresponding to the `id` property of each filter and values that are arrays of options.

The `toOption` function takes in a `ctx` object and a `value` parameter. The function returns an object with a `label` and `value` property. The `value` parameter can be a string or an object with a `sys` property. If the `value` parameter is an object with a `sys` property, the function will attempt to load the referenced item and use its `title` or `internalTitle` property as the label.

Internal Functions:
- `toOption`: Formats a value into an object with a label and value property.

External Functions:
- `collectOptions`: Collects and formats options from a list of items and filters.

Interaction Summary:
This file is used to collect and format options for a select input field. It may be used in conjunction with other components to create a form or search interface.

Developer Questions:
- What is the expected format of the `filters` and `items` parameters?
- What is the expected format of the `ctx` parameter?
- How are the options sorted?
- What happens if an item referenced by an option cannot be loaded? 
- Are there any known issues with the `collectOptions` function? 
- Are there any known issues with the `toOption` function? 
- Are there any todo items related to this file?