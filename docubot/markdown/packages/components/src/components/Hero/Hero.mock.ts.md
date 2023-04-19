Summary:
This file contains mock data for the Hero component, which is a reusable UI component that displays a hero section on a webpage. The mock data includes two variations of the Hero component, one with a centered background image and the other with a featured image.

Import statements:
- `mockLink` from `../Link/Link.mock`: a mock data file for the Link component, which is used in the actions array of the Hero component.

Script Summary:
- `heroBase`: an object containing the base properties for the Hero component, including the title, subtitle, image, content width and height, actions, background, background color, and body.
- `heroMock`: an object that extends `heroBase` and adds a `variant` property with a value of "centered" and a `background` property with a mock image file.
- `featuredImageMock`: an object that extends `heroBase` and adds a `variant` property with a value of "featured-image" and an `image` property with a mock image file.
- `export default heroMock`: exports `heroMock` as the default export of the file.

Internal Functions:
- N/A

External Functions:
- N/A

Interaction Summary:
This file is used to provide mock data for the Hero component, which is used throughout the application. The mock data is used in development and testing to ensure that the component is working as expected. The Hero component may interact with other components and modules in the application, such as the Link component, which is used in the actions array of the Hero component.

Developer Questions:
- What other components use the Hero component, and how are they integrated?
- How is the Hero component styled, and where are the styles defined?
- How is the Hero component data fetched and updated in the application?
- What other mock data files are used in the application, and how are they structured?