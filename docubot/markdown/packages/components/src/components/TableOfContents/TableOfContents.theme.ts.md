Summary:
This file exports a default function that returns a ThemeOptions object for customizing the TableOfContents component in Material UI. It includes default props, style overrides, and component variants.

Import statements:
- Theme, ThemeOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants from '@mui/material/styles'

Script Summary:
- Defines defaultProps for the TableOfContents component
- Defines styleOverrides for the TableOfContents component, including static styles and dynamic styles based on ownerState
- Defines createVariants function for the TableOfContents component, which returns an array of variant styles based on props
- Exports a default function that returns a ThemeOptions object with the TableOfContents component and its default props, style overrides, and variants

Internal Functions:
- createVariants: a function that takes a theme object and returns an array of variant styles for the TableOfContents component based on props

External Functions:
- None

Interaction Summary:
This file is part of a larger application that uses Material UI for its UI components. It customizes the TableOfContents component by providing default props, style overrides, and variants. Other components in the application may use the TableOfContents component and inherit these customizations.

Developer Questions:
- What other components in the application use the TableOfContents component?
- How can I add additional style overrides or variants for the TableOfContents component?
- How can I customize the TableOfContents component for specific pages or sections of the application?