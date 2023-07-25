Summary:
This code is a module that exports a function that returns a ThemeOptions object for customizing the TableOfContents component in a Material-UI (MUI) application. It provides default props, style overrides, and variants for the TableOfContents component.

Import statements:
- `Theme`, `ThemeOptions`, `ComponentsProps`, `ComponentsOverrides`, `ComponentsVariants` are imported from the `@mui/material/styles` package. These are types used for customizing MUI components.

Script Summary:
The script exports a function that takes a `theme` object as a parameter and returns a `ThemeOptions` object. The `ThemeOptions` object contains customization options for the `TableOfContents` component.

Internal Functions:
- `createVariants`: This function takes a `theme` object as a parameter and returns an array of variant styles for the `TableOfContents` component. It uses prop matching to set variant styles based on the `variant` prop.

External Functions:
None.

Interaction Summary:
This script can be used as part of a broader MUI application to customize the appearance of the `TableOfContents` component. It can be imported and used in the theme configuration of the application to provide default props, style overrides, and variants for the `TableOfContents` component.

Developer Questions:
- How can I customize the `TableOfContents` component in my MUI application?
- What are the available default props, style overrides, and variants for the `TableOfContents` component?
- How can I create new variants for the `TableOfContents` component?
- How can I use the `createVariants` function to set variant styles based on props?