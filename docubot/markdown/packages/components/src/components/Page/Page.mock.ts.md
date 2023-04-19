Summary:
This file exports a function that returns a mock data object for the Page component.

Import statements:
- `faker` library for generating fake data
- `PageProps` interface for defining the shape of the Page component props
- Mock data objects for the Hero, Collection, and Section components

Script Summary:
The file exports a default function that returns a mock data object for the Page component. The function generates a random title using the `faker` library and includes mock data objects for the Hero, Collection, and Section components in the `contents` array.

Internal Functions:
None

External Functions:
- `lorem.words(2)`: Generates a random string of two words using the `faker` library.

Interaction Summary:
This file is used to generate mock data for the Page component. It could be used in unit tests or in development to preview the appearance of the Page component with sample data.

Developer Questions:
- What is the purpose of the `__typename` property in the returned object?
- How can I modify the mock data to include additional components or change the content of existing components?
- Are there any other mock data files that depend on this file?