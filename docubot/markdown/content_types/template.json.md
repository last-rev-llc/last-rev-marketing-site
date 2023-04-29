# Contentful Content Model Documentation

## System Details
- Space ID: `imglmb3xms7o`
- Content Model ID: `template`
- Created At: `2022-07-15T16:47:19.916Z`
- Updated At: `2022-07-15T16:47:19.916Z`
- Environment: `master`
- Revision: `1`

## Editing Entries
To create or edit entries using this content model, follow these steps:
1. Log in to your Contentful account
2. Select the space with the ID `imglmb3xms7o`
3. Click on the `Content` tab
4. Select the content type `Template`
5. Click on the `Create Template` button to create a new entry or click on an existing entry to edit it
6. Fill in the fields as desired
7. Click on the `Save` button to save your changes

## Fields
The `Template` content model has the following fields:

| Field ID | Field Name | Type | Localized | Required | Disabled | Omitted | Link Type |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `templateName` | Template Name | Symbol | No | No | No | No | N/A |
| `image` | Image | Link | No | No | No | No | Asset |
| `content` | Content | Link | No | No | No | No | Entry |
| `category` | Category | Symbol | No | No | No | No | N/A |

### Field Properties
- `Field ID`: The unique identifier for the field
- `Field Name`: The name of the field as it appears in the Contentful web app
- `Type`: The data type of the field
- `Localized`: Indicates whether the field can have different values for different locales
- `Required`: Indicates whether the field is required when creating or editing an entry
- `Disabled`: Indicates whether the field is disabled and cannot be edited
- `Omitted`: Indicates whether the field is omitted from the response when retrieving an entry
- `Link Type`: If the field type is `Link`, indicates the type of linked content (e.g. `Asset`, `Entry`)

## Linked Content Models
The `Template` content model is not linked to any other content models.