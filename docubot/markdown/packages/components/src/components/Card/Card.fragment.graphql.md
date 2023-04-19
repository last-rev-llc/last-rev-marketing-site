Summary:
This file contains GraphQL fragments for the Card component, including Card_FieldsFragment, Card_BaseFragment, and Card_RichTextFragment.

Dependencies:
This file depends on the Content_BaseFragment, Media_BaseFragment, Link_BaseFragment, Link_CardFragment, RichText_BaseFragment, and RichText_CardFragment fragments.

Code Summary:
The Card_FieldsFragment includes fields for the Card component, such as variant, theme, media, title, subtitle, actions, and link. The Card_BaseFragment includes the Card_FieldsFragment and a body field with the RichText_BaseFragment. The Card_RichTextFragment includes the Card_FieldsFragment and a body field with the RichText_CardFragment.

Interaction Summary:
This file is used to define the GraphQL schema for the Card component. It can be used by other components or pages that use the Card component to query for specific fields.

Developer Questions:
- What fields are included in the Card_FieldsFragment?
- What is the difference between Card_BaseFragment and Card_RichTextFragment?
- What other fragments does this file depend on?
- How can I add or remove fields from the Card component using these fragments?