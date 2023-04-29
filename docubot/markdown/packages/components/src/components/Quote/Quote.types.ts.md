Summary:
This file exports an interface for QuoteProps and QuoteClasses, as well as a constant for QuoteClasses. It also imports a fragment from a GraphQL SDK.

Import statements:
- Quote_BaseFragmentFragment from '@last-rev-marketing-site/graphql-sdk/dist'

Script Summary:
- Defines an interface for QuoteProps that extends Quote_BaseFragmentFragment and includes an optional variant property.
- Defines an interface for QuoteClasses that includes several CSS class names.
- Defines a type for QuoteClassKey that is a keyof QuoteClasses.
- Exports a constant for QuoteClasses.

Internal Functions:
- None

External Functions:
- None

Interaction Summary:
This file does not have any direct interaction with the rest of the application. However, the QuoteProps and QuoteClasses interfaces may be used in other components.

Developer Questions:
- What is the purpose of the Quote_BaseFragmentFragment import?
- How are the CSS class names defined in the QuoteClasses interface used in the component?
- How is the variant property used in the component?
- Are there any other components that use the QuoteProps and QuoteClasses interfaces?