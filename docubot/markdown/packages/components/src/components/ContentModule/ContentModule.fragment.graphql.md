# Content Module Fragments

## TODO Items
- Create a path for the Blog detail to remove the commented out fragment in `ContentModule_SectionFragment`.

## Known Issues
None at the moment.

## Description
This file contains three fragments for the `Content` type in GraphQL. These fragments are used to query specific fields in the `Content` type.

### `ContentModule_BaseFragment`
This fragment includes the following fragments:
- `Card_BaseFragment`
- `Collection_BaseFragment`
- `Content_BaseFragment`
- `Header_BaseFragment`
- `Hero_BaseFragment`
- `Link_BaseFragment`
- `Media_BaseFragment`
- `ModuleIntegration_BaseFragment`
- `NavigationItem_BaseFragment`
- `Quote_BaseFragment`
- `Section_BaseFragment`
- `Text_BaseFragment`
- `Footer_BaseFragment`

### `ContentModule_SectionFragment`
This fragment includes the following fragments:
- `Content_BaseFragment`
- `Media_BaseFragment`
- `Card_BaseFragment`
- `Quote_BaseFragment`
- `NavigationItem_BaseFragment`
- `Text_BaseFragment`
- `Collection_BaseFragment`
- `Link_BaseFragment`
- `ModuleIntegration_BaseFragment`

### `ContentModule_RichTextFragment`
This fragment includes the following fragments:
- `Content_BaseFragment`
- `Media_BaseFragment`
- `Quote_BaseFragment`
- `NavigationItem_BaseFragment`
- `Text_BaseFragment`
- `Section_BaseFragment`
- `ModuleIntegration_BaseFragment`
- `Collection_RichTextFragment`
- `Card_RichTextFragment`
- `Link_BaseFragment`