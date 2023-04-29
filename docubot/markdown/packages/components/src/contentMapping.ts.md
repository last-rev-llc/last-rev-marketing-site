Summary:
This file exports a mapping of components used in the application, with some of them being dynamically imported using Next.js' dynamic import feature.

Import statements:
- `dynamic` from `next/dynamic`: used to dynamically import components
- Various components from the `./components` directory

Script Summary:
- Dynamically imports various components using Next.js' `dynamic` function
- Exports a mapping of components used in the application

Internal Functions:
None

External Functions:
None

Interaction Summary:
This file does not have any direct interaction with the rest of the application. However, the components exported by this file are used throughout the application.

Developer Questions:
- What is the purpose of dynamically importing components?
- How are the components in the `contentMapping` object used in the application?
- Are there any other components that should be added to the `contentMapping` object?
- How can I add a new component to the `contentMapping` object?