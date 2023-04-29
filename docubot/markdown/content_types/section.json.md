# Contentful Content Model Documentation

## System Details
- Space ID: `imglmb3xms7o`
- Content Type ID: `section`
- Created At: `2022-06-13T19:50:48.361Z`
- Last Updated At: `2022-11-09T16:02:29.606Z`
- Environment: `master`
- Revision: `19`

## Editing Entries
To create or edit entries using this content model, follow these steps:
1. Log in to your Contentful account.
2. Select the space where this content model is located.
3. Click on the "Content" tab in the top navigation bar.
4. Select the content type "Section" from the list of content types.
5. Click on the "Create Section" button to create a new entry or click on an existing entry to edit it.
6. Fill in the fields with the desired content.
7. Click on the "Save" button to save your changes.

## Fields
The following table lists all of the fields in the "Section" content type, including their properties:

| Field ID | Name | Type | Localized | Required | Disabled | Omitted | Link Type | Validations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `internalTitle` | Internal Title | Symbol | No | No | No | No | N/A | N/A |
| `anchorName` | Anchor name | Symbol | No | No | No | No | N/A | N/A |
| `introText` | Intro Text | Link | No | No | No | No | Entry | `linkContentType: [text]` |
| `contents` | Contents | Array | No | No | No | No | Entry | N/A |
| `background` | Background | Link | No | No | No | No | Entry | `linkContentType: [media]` |
| `variant` | Variant | Symbol | No | No | No | No | N/A | N/A |
| `backgroundColor` | Background Color | Symbol | No | No | No | No | N/A | N/A |
| `contentDirection` | Content Direction | Symbol | No | No | No | No | N/A | N/A |
| `contentAlignment` | Content Alignment | Symbol | No | No | No | No | N/A | N/A |
| `contentSpacing` | Content Spacing | Integer | No | No | No | No | N/A | N/A |
| `contentWidth` | Content Width | Symbol | No | No | No | No | N/A | N/A |
| `styles` | Styles | Object | No | No | No | No | N/A | N/A |
| `theme` | Theme | Array | No | No | No | No | Entry | N/A |
| `settings` | Settings | Object | No | No | No | No | N/A | N/A |
| `paddingLeft` | Padding Left | Integer | No | No | No | No | N/A | N/A |
| `paddingRight` | Padding Right | Integer | No | No | No | No | N/A | N/A |
| `paddingBottom` | Padding Bottom | Integer | No | No | No | No | N/A | N/A |
| `paddingTop` | Padding Top | Integer | No | No | No | No | N/A | N/A |

## Linked Content Models
The "Section" content type is linked to the following content models:
- `text`
- `media`