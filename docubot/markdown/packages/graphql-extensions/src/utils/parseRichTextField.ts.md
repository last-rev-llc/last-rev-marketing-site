Summary:
This file contains a function that parses rich text content and returns an array of objects with section and content properties.

Import statements:
- `documentToPlainTextString` from `@contentful/rich-text-plain-text-renderer`: a function that converts rich text content to plain text.
- `Block`, `Inline`, `BLOCKS`, `Document`, `Text` from `@contentful/rich-text-types`: types used to represent rich text content.

Script Summary:
- `AlgoliaRichTextContent`: an interface representing the structure of the objects returned by the parsing function.
- `RichTextParseConfig`: an interface representing the configuration options for the parsing function.
- `parseNode`: a function that recursively parses a rich text node and its children, and adds the resulting content to an array of `AlgoliaRichTextContent` objects.
- `parseRichTextField`: a function that takes a `Document` object representing rich text content and a `RichTextParseConfig` object, and returns an array of `AlgoliaRichTextContent` objects.

Internal Functions:
- `parseNode(node: Block | Inline | Text, results: AlgoliaRichTextContent[], config: RichTextParseConfig)`: a recursive function that parses a rich text node and its children, and adds the resulting content to an array of `AlgoliaRichTextContent` objects. It takes a `node` parameter representing the current node being parsed, a `results` parameter representing the array of `AlgoliaRichTextContent` objects being built, and a `config` parameter representing the configuration options for the parsing function.
- `parseRichTextField(richText: Document | undefined, config: RichTextParseConfig)`: a function that takes a `Document` object representing rich text content and a `RichTextParseConfig` object, and returns an array of `AlgoliaRichTextContent` objects. It calls the `parseNode` function to parse the rich text content.

External Functions:
- `default parseRichTextField`: the default export of the file, which is the `parseRichTextField` function.

Interaction Summary:
This file is part of a GraphQL extensions package and could potentially be used by other parts of the application that need to parse rich text content. It depends on the `@contentful/rich-text-plain-text-renderer` and `@contentful/rich-text-types` packages.

Developer Questions:
- What is the expected structure of the `Document` object passed to the `parseRichTextField` function?
- What are the possible values for the `BLOCKS` enum used in the `RichTextParseConfig` interface?
- How does the `AlgoliaRichTextContent` interface relate to the rest of the application?
- Are there any other dependencies or packages that this file interacts with?