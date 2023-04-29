# Contentful Content Model Documentation

## System Details
- Space ID: `imglmb3xms7o`
- Content Type ID: `site`
- Created At: `2022-06-13T19:50:51.483Z`
- Updated At: `2022-06-13T19:50:51.483Z`
- Environment ID: `master`
- Revision: `1`

## Editing Entries in Contentful Web App
To edit entries made with this content model in the Contentful web app, follow these steps:
1. Log in to your Contentful account and navigate to the space where this content model is located.
2. Click on the "Content" tab in the navigation menu.
3. Find the entry you wish to edit and click on it.
4. Make any necessary changes to the fields in the entry.
5. Click the "Save" button to save your changes.

## Fields
| Field ID | Field Name | Field Type | Localized | Required | Disabled | Omitted | Link Type | Validations | Items |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `internalTitle` | Internal title | Symbol | No | No | No | No | N/A | N/A | N/A |
| `siteKey` | Site Key | Symbol | No | Yes | No | No | N/A | N/A | N/A |
| `header` | Header | Link | No | No | No | No | Entry | `linkContentType`: `header` | N/A |
| `footer` | Footer | Link | No | No | No | No | Entry | N/A | N/A |
| `seo` | SEO | Object | No | No | No | No | N/A | N/A | N/A |
| `theme` | Theme | Array | No | No | No | No | Entry | N/A | N/A |

### Field Properties
- **Field ID**: The unique identifier for the field.
- **Field Name**: The name of the field as it appears in the Contentful web app.
- **Field Type**: The type of data that can be stored in the field.
- **Localized**: Indicates whether the field can store different values for different locales.
- **Required**: Indicates whether the field is required when creating or editing an entry.
- **Disabled**: Indicates whether the field is disabled and cannot be edited.
- **Omitted**: Indicates whether the field is omitted from the API response.
- **Link Type**: Indicates the type of linked content that can be stored in the field.
- **Validations**: Specifies any validations that must be met for the field.
- **Items**: Specifies the type of linked content that can be stored in an array field.

## Linked Content Models
- `header`