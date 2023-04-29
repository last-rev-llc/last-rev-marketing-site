Summary:
This file exports two mock functions for different types of sections in a website. The functions return an object with properties that mimic the structure of a Section component.

Import statements:
- SectionProps: an interface that defines the props for the Section component.
- mockTheme: a mock object that mimics the theme object used in the application.
- richTextMock: a mock function that returns an object with properties that mimic the structure of a Text component.

Script Summary:
This file exports two mock functions: singlePanelMock and splitPanelMock. These functions return an object with properties that mimic the structure of a Section component. The singlePanelMock function returns an object with a variant of "single-panel" and one content item, which is the output of the richTextMock function. The splitPanelMock function returns an object with a variant of "split-panel" and two content items, the output of the richTextMock function and an object with a __typename of "Media" and a file object with a url, height, and width.

Internal Functions:
- singlePanelMock: a function that returns an object with properties that mimic the structure of a Section component with a variant of "single-panel".
- splitPanelMock: a function that returns an object with properties that mimic the structure of a Section component with a variant of "split-panel".

External Functions:
None.

Interaction Summary:
This file does not interact with any other parts of the application. It is used solely for mocking data in tests.

Developer Questions:
- What other mock functions are available in the application?
- How are these mock functions used in tests?
- Are there any other variants of the Section component that need to be mocked? 

Known Issues/Bugs:
None.

Todo:
None.