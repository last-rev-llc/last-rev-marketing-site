Summary:
This file is a React component called `Page` that serves as a layout for different pages in the application. It imports and uses various components like `Head`, `ContentModule`, `BackToTop`, and `BlogLandingHero`. It also handles the logic for filtering out the hero from the card list on the blog landing page.

Import statements:
- React: The JavaScript library for building user interfaces.
- Head: A Next.js component for managing the head of the document.
- dynamic: A Next.js utility for loading components dynamically.
- styled: A Material-UI utility for creating styled components.
- PageProps: A TypeScript type for the props of the `Page` component.
- ContentModule: A component from the LastRev component library.
- sidekick: A utility from the LastRev Contentful Sidekick library.

Component:
`Page` is a functional React component that takes in `PageProps` and renders the layout for different pages in the application.

Hooks:
- None

Event Handlers:
- None

Rendered components:
- Head: Renders the schema data for the blog landing page.
- ContentModule: Renders the header, hero, and footer components.
- BlogLandingHero: Renders the hero component for the blog landing page.
- Main: Renders the main content of the page, including the contents array and the BackToTop component.

Interaction Summary:
This file interacts with the rest of the application by being imported and used in other components or pages that require the `Page` layout.

Props:

| Prop              | Type       | Description                                                                                   |
|-------------------|------------|-----------------------------------------------------------------------------------------------|
| header            | object     | The header content module.                                                                    |
| hero              | object     | The hero content module.                                                                      |
| contents          | array      | An array of content modules to be rendered in the main section of the page.                  |
| footer            | object     | The footer content module.                                                                    |
| disableBackToTop  | boolean    | A flag to disable the BackToTop component.                                                    |
| sidekickLookup    | object     | An object containing information for the sidekick utility.                                    |
| ...props          | PageProps  | Additional props passed to the component.                                                     |

Developer Questions:
- How does the `Page` component handle different layouts for different pages?
- How does the `sidekick` utility work and what is its purpose in this component?

Known Issues/Bugs:
- None

Todo Items:
- None