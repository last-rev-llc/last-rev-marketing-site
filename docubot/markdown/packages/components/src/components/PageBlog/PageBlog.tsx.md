Summary:
This file defines the PageBlog component, which is a blog page layout that includes a header, footer, article content, and a sidebar with various sections such as share, learn more, topics, tags, and email subscription form. The component also sets up the schema data for SEO purposes.

Import statements:
The file imports various Material-UI components, styled components, and utility functions from external libraries such as lodash and Contentful Sidekick. It also imports custom components like ContentModule, Text, and Link from the local project.

Component:
The main component in this file is the PageBlog component, which accepts various props related to the blog content, header, footer, and SEO data.

Hooks:
No hooks are used in this component.

Event Handlers:
No event handlers are used in this component.

Rendered components:
The PageBlog component renders the following components:
- ErrorBoundary: Wraps the entire component to handle any errors that may occur during rendering.
- Head: Sets up meta tags and schema data for SEO purposes.
- ContentModule: Renders the header and footer passed as props.
- Grid: Sets up the main layout of the page, including the article content and sidebar.
- Typography: Renders the title, creation date, and author of the blog post.
- MediaWrap: Renders the featured media for the blog post.
- Text: Renders the body of the blog post.
- ContentsWrapper: Renders additional content modules if provided.
- List: Renders the sidebar with various sections such as share, learn more, topics, tags, and email subscription form.

Interaction Summary:
The PageBlog component is a standalone component that can be used in the main application to render a blog page. It receives data from its parent component and renders the content accordingly. The component does not have any direct interaction with other components or state management in the application.

Developer Questions:
1. How is the data for the PageBlog component fetched and passed as props?
2. Are there any specific requirements for the data format passed to the component?
3. How can the styling of the component be customized or overridden?
4. Are there any performance considerations when rendering large blog posts or additional content modules?
5. How does the email subscription form work, and where is the data submitted to?