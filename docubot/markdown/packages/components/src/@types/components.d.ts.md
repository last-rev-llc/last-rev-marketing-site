Summary:
This file is a TypeScript declaration file that extends the MUI (Material-UI) theme components by adding custom component definitions. It allows developers to customize the appearance and behavior of various components used throughout the application.

Import statements:
The file imports `ComponentsOverrides`, `ComponentsProps`, and `ComponentsVariants` from the `@mui/material` package. These are used to define the custom components and their properties, styles, and variants.

Script Summary:
The script declares a module `@mui/material/styles` and extends the `Components` interface with custom component definitions such as `Page`, `Accordion`, `Card`, `ContentModule`, `ErrorBoundary`, `SEO`, `ContentPreview`, `NavigationItem`, `TableOfContents`, `Text`, `Image`, `Link`, `Header`, `Hero`, `Media`, `Section`, `Collection`, `CollectionFiltered`, `CollectionAccordion`, `NavigationBar`, `Footer`, and `CollectionCarousel`. Each custom component has its `defaultProps`, `styleOverrides`, and `variants` properties defined.

Internal Functions:
N/A

External Functions:
N/A

Interaction Summary:
This file interacts with the rest of the application by providing custom component definitions that can be used in conjunction with the MUI theme. When the theme is applied to the application, these custom components will have their styles and properties applied as specified in this file.

Developer Questions:
1. How do I add a new custom component to the theme?
2. How do I modify the styles or properties of an existing custom component?
3. How do I use the custom components in my application?

Known Issues/Bugs:
No known issues or bugs.

Todo Items:
1. Uncomment and complete the definitions for `MailchimpForm`, `BackToTop`, and `FormMarketoEmbed` if they are needed in the application.
2. Regularly update the custom component definitions to match the latest MUI documentation and best practices.