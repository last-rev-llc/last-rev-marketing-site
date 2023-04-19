Summary:
This file contains a function that creates a complex rich text object based on an array of items. The rich text object is used in the larger GraphQL extensions package.

Import statements:
None

Script Summary:
The createComplexRichText function takes an array of items and returns a complex rich text object. The items array contains objects with properties such as nodeType, value, data, marks, and content. The createNode function is used to recursively create nodes for the content property of each item. The resulting rich text object has a nodeType of 'document' and contains all the nodes created from the items array.

Internal Functions:
- createNode(item: Item): any
  - This function takes an item object and recursively creates nodes for its content property. It returns an object with properties nodeType, value, data, marks, and content.

External Functions:
- createRichText(items: Item[]): any
  - This function takes an array of item objects and returns a complex rich text object. It uses the createNode function to create nodes for each item's content property. The resulting object has a nodeType of 'document' and contains all the nodes created from the items array.

Interaction Summary:
This file is part of the larger GraphQL extensions package and is used to create complex rich text objects. It could potentially be used in other parts of the application that require rich text objects.

Developer Questions:
- What is the expected format of the items array?
- How is the resulting rich text object used in the rest of the application?
- Are there any other functions in the GraphQL extensions package that rely on this function?