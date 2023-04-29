# Contentful Content Model Documentation: Footer

## System Details

- **Space ID:** imglmb3xms7o
- **Content Model ID:** footer
- **Content Model Name:** Footer
- **Description:** This content model defines the fields for the footer section of the website.

## Fields

| Field ID | Field Name | Field Type | Required | Disabled | Omitted | Link Type | Validations |
| --- | --- | --- | --- | --- | --- | --- | --- |
| logo | Logo | Link | No | No | No | Asset | - |
| logoUrl | Logo Url | Symbol | No | No | No | - | - |
| navigationItems | Navigation Items | Array | No | No | No | Entry | linkContentType: collection |
| brandAndYear | Brand and year | Symbol | No | No | No | - | - |

### Field Descriptions

- **Logo:** This field is a link to an asset that contains the logo image for the website.
- **Logo Url:** This field is a string that contains the URL for the logo image.
- **Navigation Items:** This field is an array of links to entries in the "collection" content model. These links represent the navigation items in the footer.
- **Brand and year:** This field is a string that contains the brand name and year for the website.

## Editing Entries

To edit entries made with this content model within the Contentful web app, follow these steps:

1. Log in to the Contentful web app.
2. Select the space that contains the content model.
3. Click on "Content" in the sidebar.
4. Find the entry you want to edit and click on it.
5. Edit the fields as desired.
6. Click "Save" to save your changes.

## Linked Content Models

This content model is linked to the "collection" content model through the "navigationItems" field.