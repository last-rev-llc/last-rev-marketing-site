Summary:
This file contains a GraphQL fragment for the Table of Contents component. It includes a fragment for the content of the Table of Contents, specifically for headings.

Dependencies:
This file depends on the Content_BaseFragment fragment.

Code Summary:
The TableOfContents_BaseFragment fragment includes the Content_BaseFragment fragment and then specifies that it only wants to include content that is a Heading. It then specifies that it wants the level, text, and id fields for each Heading.

Interaction Summary:
This file could be used by other components that need to display a Table of Contents. It could be included in a larger GraphQL query that includes other fragments and queries for data needed by the component.

Developer Questions:
- What other fragments and queries are included in the larger GraphQL query that uses this fragment?
- What other components use this Table of Contents component?
- How are the level, text, and id fields used by the component that uses this fragment?