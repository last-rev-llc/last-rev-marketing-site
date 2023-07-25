Summary:
This file is a React component that enhances the functionality of the CollectionFiltered component from the @last-rev/component-library package. It adds a fetchItems function to the wrapped component, which allows it to fetch items from a server based on provided filter, limit, and offset parameters. The component is a client-side component.

Import statements:
- React: The React library is imported to enable the use of React components and hooks.
- CollectionFiltered: The CollectionFiltered component is imported from the @last-rev/component-library package to be wrapped and enhanced.

Component:
The withFetchItems function is a higher-order component (HOC) that takes a component as an argument and returns a new component. It wraps the provided component with additional functionality related to fetching items from a server.

Hooks:
- None

Event Handlers:
- None

Rendered components:
- Wrapped: The provided component is rendered within the withFetchItems component.

Interaction Summary:
This file enhances the CollectionFiltered component by adding a fetchItems function that can be used to fetch items from a server. The fetchItems function is passed as a prop to the wrapped component, allowing it to make server requests and update its state accordingly. The wrapped component also receives additional props such as loadMoreText.

Developer Questions:
- How does the fetchItems function work and what parameters does it accept?
- How does the wrapped component use the fetchItems function to fetch items from a server?
- What is the purpose of the preview variable and how is it used in the fetchItems function?

Known Issues / Todo:
- None