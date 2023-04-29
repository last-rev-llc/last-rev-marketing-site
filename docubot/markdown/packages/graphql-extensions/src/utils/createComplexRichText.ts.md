Summary:
This file exports a function called `createRichText` which takes an array of `Item` objects and returns a new object representing a rich text document. The `Item` interface defines the structure of the objects in the array, which can contain various types of content such as headings, paragraphs, hyperlinks, and text. The `createNode` function is a helper function used by `createRichText` to recursively create the nested structure of the document.

Import statements:
None

Script Summary:
This file exports a single function called `createRichText` which takes an array of `Item` objects and returns a new object representing a rich text document.

Internal Functions:
- `createNode(item: Item): any`: This function takes an `Item` object and returns a new object representing a node in the rich text document. The returned object has properties for the node type, value, data, marks, and content. The `content` property is an array of nested `Item` objects, which are recursively processed using `createNode`.

External Functions:
- `createRichText(items: Item[]): any`: This function takes an array of `Item` objects and returns a new object representing a rich text document. The returned object has properties for the node type, data, and content. The `content` property is an array of top-level `Item` objects, which are processed using `createNode`.

Interaction Summary:
This file is a standalone module that exports a single function, so it does not interact with other parts of the application directly. However, it could be used by other modules to generate rich text documents.

Developer Questions:
- What are the valid values for `nodeType` in the `Item` interface?
- What is the purpose of the `marks` property in the `Item` interface?
- How does the `createNode` function handle nested `Item` objects?
- How can I customize the output of the `createRichText` function to include additional properties or modify existing ones? 

Known Issues/Bugs:
None

Todo:
None