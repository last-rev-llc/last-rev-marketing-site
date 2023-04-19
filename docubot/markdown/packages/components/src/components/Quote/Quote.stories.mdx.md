# Components / Quote
## Summary
The Quote component displays text with the author and basic information.

## Props
The following table describes the props for the Quote component:

| Name | Type | Description |
| --- | --- | --- |
| variant | string | Controls the variant to be displayed |
| quoteImage | object | Image to be displayed with the quote |
| authorName | string | Name of the author |
| authorTitle | string | Title of the author |
| sx | object | Styling object |
| ref | object | Reference object |

## Stories
### Logo
The following story shows a quote with a logo displayed on the bottom side of the quote.

```javascript
<Canvas>
  <Story name="with-logo" args={quoteMock()} />
</Canvas>
```

### Base
The following story shows a basic quote.

```javascript
<Canvas>
  <Story name="base" args={{ ...mockQuoteBase(), logo: undefined }} />
</Canvas>
```

### Related Files
- packages/components/src/components/Quote/Quote.types
- packages/components/src/components/Quote/Quote.mock

### List of questions that could be answered about this document that could make it more useful
- What are the props for the Quote component?
- How do I display a quote with a logo?
- What files are related to the Quote component?

### List of questions that could be asked that the contents of this document could be a resource for developers
- How do I use the Quote component?
- What are the available props for the Quote component?
- How do I customize the styling of the Quote component?