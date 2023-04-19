# packages/components/src/components/Text/Text.stories.mdx

## Summary
Documentation for the Text component, which is used to display text on the page in various formats.

## Props
The following props are available for the Text component:

<ArgsTable story="base" />

## Stories

### Text
Displays basic text.

```javascript
import Text from './Text';
import textMock from './Text.mock';

<Text {...textMock()} />
```

### Complex Text
Displays text with various formatting options.

```javascript
import Text from './Text';
import complexMock from './Text.mock';

<Text {...complexMock()} />
```

### Formatted Text
Displays text with custom formatting.

```javascript
import Text from './Text';
import formattedMock from './Text.mock';

<Text {...formattedMock()} />
```

## Related Files
- packages/components/src/components/Text/Text.js
- packages/components/src/components/Text/Text.mock.js
- packages/components/src/components/Text/Text.types.js

## List of questions that could be answered about this document that could make it more useful
- What props are available for the Text component?
- How do I display basic text using the Text component?
- What is the Text component used for?

## List of questions that could be asked that the contents of this document could be a resource for developers
- How do I use the Text component to display formatted text?
- What are some examples of use cases for the Text component?
- How do I customize the styling of the Text component?