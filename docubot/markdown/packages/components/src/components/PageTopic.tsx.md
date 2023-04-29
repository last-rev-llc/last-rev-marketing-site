Summary:
This file defines a `PageTopic` component that renders a blog landing page with a header, hero section, contents, and footer. It also includes a `BackToTop` button and schema data for SEO purposes. The component is a client-side component.

Import statements:
- React: The library used for building the UI components.
- Router: Next.js router for handling navigation.
- ContentModule: A reusable component from the LastRev component library.
- Page: A GraphQL query for fetching page data.
- BackToTop: A reusable component for scrolling back to the top of the page.
- Head: A Next.js component for appending elements to the head of the document.
- styled: A utility from MUI for styling components.
- sidekick: A utility from LastRev for handling sidekick lookups.

Component:
`PageTopic`: A functional component that renders a blog landing page with a header, hero section, contents, and footer.

Hooks:
- useMemo: Used to memoize the `collectionProps` object.

Event Handlers:
- onClearFilter: A function that navigates to the `/blog` route when called.

Rendered components:
- Head: Renders the schema data for SEO purposes.
- ContentModule: Renders the header, hero, and footer sections.
- BlogLandingHero: A styled component that renders the hero section.
- Main: A styled component that renders the main content of the page.
- BackToTop: Renders the back-to-top button.

Interaction Summary:
The `PageTopic` component interacts with the rest of the application by rendering a blog landing page and handling navigation to the `/blog` route when the filter is cleared.

Developer Questions:
- How is the `PageTopic` component used in the larger application?
- Are there any additional props or data that need to be passed to the `PageTopic` component?
- Are there any additional styling or theming requirements for the component?

Known Issues/Bugs:
- If there is more than one `Collection` component in the contents, the filter will be applied to all of them.

Todo Items:
- Improve the handling of multiple `Collection` components in the contents.
- Address any known issues or bugs.