Summary:
This file is a React component named `Text` that renders rich text content from Contentful. It handles various types of content, such as paragraphs, headings, tables, and embedded assets or entries. It also supports custom rendering options and styling.

Import statements:
- React and various Material-UI components are imported for rendering and styling.
- Contentful rich text renderer and types are imported for handling rich text content.
- `ErrorBoundary`, `ContentModule`, `BLOCKS`, `INLINES`, and `sidekick` are imported for handling errors, rendering content modules, and managing content types.
- `TextProps` and `TextLinks` are imported for managing component props and types.

Component:
`Text` is a functional component that takes various props such as `body`, `align`, `styles`, `variant`, `sidekickLookup`, `sx`, `renderNode`, `renderMark`, and `renderOptions`. It uses the `documentToReactComponents` function to render rich text content with custom rendering options.

Hooks:
No hooks are used in this component.

Event Handlers:
No event handlers are used in this component.

Rendered components:
- `ErrorBoundary`: Wraps the main component to handle errors.
- `Root`, `EmbeddedRoot`, `InlineRoot`, and `TableRoot`: Styled components for rendering different types of content.
- `Typography`: Renders text content with appropriate styles.
- `ContentModule`: Renders embedded assets, entries, and links.

Interaction Summary:
The `Text` component can be used in other components to render rich text content from Contentful. It handles various content types and can be customized with rendering options and styling.

Developer Questions:
- How can I customize the rendering of specific content types?
- How can I apply custom styles to the rendered content?
- How does the component handle embedded assets and entries?

Known Issues/Bugs:
- There is a TODO comment about moving body XSS to the data layer. This should be addressed to improve security.

Props Table:

| Prop            | Type       | Description                                                                                   |
|-----------------|------------|-----------------------------------------------------------------------------------------------|
| body            | object     | The rich text content to be rendered.                                                         |
| align           | string     | The text alignment for the content.                                                           |
| styles          | object     | Custom styles to be applied to the component.                                                 |
| variant         | string     | The typography variant to be used for rendering text.                                         |
| sidekickLookup  | object     | The sidekick lookup object for managing content types.                                        |
| sx              | object     | The Material-UI system styles to be applied to the component.                                 |
| renderNode      | object     | Custom rendering options for nodes.                                                           |
| renderMark      | object     | Custom rendering options for marks.                                                           |
| renderOptions   | object     | Additional rendering options to be passed to the `documentToReactComponents` function.        |
| ...props        | any        | Additional props to be passed to the component.                                               |