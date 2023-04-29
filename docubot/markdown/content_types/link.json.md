# Contentful Content Model Documentation: Link

## System Details
- Space ID: `imglmb3xms7o`
- Content Type ID: `link`
- Created At: `2022-06-13T19:50:49.066Z`
- Last Updated At: `2023-02-27T18:26:43.993Z`
- Display Field: `internalTitle`
- Description: 

## Editing Entries
To edit entries made with this content model within the Contentful web app, follow these steps:
1. Log in to your Contentful account
2. Select the space where the content model is located
3. Click on the "Content" tab in the top navigation bar
4. Find the "Link" content type in the list of content types
5. Click on the entry you want to edit
6. Make your changes in the fields provided
7. Click the "Save" button in the top right corner of the screen

## Fields
| Field ID | Field Name | Field Type | Localized | Required | Disabled | Omitted | Link Type | Validations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `internalTitle` | Internal Title | Symbol | No | No | No | No | N/A | N/A |
| `linkedContent` | Linked Content | Link | No | No | No | No | Entry | `linkContentType`:[`page`,`pageBlog`] |
| `manualUrl` | Manual URL | Symbol | No | No | No | No | N/A | N/A |
| `text` | Text | Symbol | No | No | No | No | N/A | N/A |
| `icon` | Icon | Symbol | No | No | No | No | N/A | N/A |
| `iconPosition` | Icon Position | Symbol | No | No | No | No | N/A | N/A |
| `variant` | Variant | Symbol | No | No | No | No | N/A | N/A |
| `color` | Color | Symbol | No | No | No | No | N/A | N/A |

## Linked Content Models
- `page`
- `pageBlog`