Summary:
This file exports a single function called createType, which takes in a string and an object as parameters and returns a new object with a specific structure.

Import statements:
None.

Script Summary:
The createType function takes in a string representing the type of content and an object containing the content itself. It then returns a new object with a specific structure, including an ID and content type, as well as the content itself.

Internal Functions:
None.

External Functions:
createType(type: string, content: any): This function takes in a string representing the type of content and an object containing the content itself. It then returns a new object with a specific structure, including an ID and content type, as well as the content itself.

Interaction Summary:
This file is likely used in conjunction with other GraphQL-related files in the larger application. It may be used to create new types of content or to modify existing content types.

Developer Questions:
- What other files in the application use this createType function?
- How is the content object passed into this function formatted?
- What is the purpose of the 'en-US' key in the fields object?