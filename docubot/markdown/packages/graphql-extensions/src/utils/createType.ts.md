Summary:
This file exports a function called `createType` that takes in a `type` string and `content` object as parameters. It returns an object with a `sys` property and a `fields` property. The `sys` property contains an `id` property and a `contentType` property, which contains an `id` property that is set to the `type` parameter. The `fields` property is an object that contains all the keys of the `content` object as properties, with each property containing an object with an `en-US` property set to the corresponding value of the `content` object.

Import statements:
None

Script Summary:
This file exports a function called `createType` that takes in a `type` string and `content` object as parameters. It returns an object with a `sys` property and a `fields` property.

Internal Functions:
None

External Functions:
- `createType(type: string, content: any)`: This function takes in a `type` string and `content` object as parameters. It returns an object with a `sys` property and a `fields` property. The `sys` property contains an `id` property and a `contentType` property, which contains an `id` property that is set to the `type` parameter. The `fields` property is an object that contains all the keys of the `content` object as properties, with each property containing an object with an `en-US` property set to the corresponding value of the `content` object.

Interaction Summary:
This file is a utility function that could be used in other parts of the application to create objects with a specific structure. It does not interact with any other parts of the application directly.

Developer Questions:
- What is the purpose of the `sys` property and how is it used in the application?
- What happens if the `content` object is empty or undefined?
- Can the `en-US` property be changed to a different language code? 
- How can this function be tested to ensure it is working correctly?

Known Issues/Bugs:
None

Todo:
None