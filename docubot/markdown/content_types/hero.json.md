# Contentful Content Model Documentation: Hero

## System Details
- **Space ID:** imglmb3xms7o
- **Content Model ID:** hero
- **Created At:** 2022-06-13T19:50:50.461Z
- **Last Updated At:** 2023-03-07T18:46:50.407Z
- **Environment:** master
- **Revision:** 7

## Description
This content model represents a hero section on a webpage.

## Fields
| Field ID | Field Name | Type | Localized | Required | Disabled | Omitted | Link Type | Items Type | Validations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| internalTitle | Internal Title | Symbol | No | No | No | No | N/A | N/A | N/A |
| variant | Variant | Symbol | No | No | No | No | N/A | N/A | N/A |
| title | Title | Symbol | No | No | No | No | N/A | N/A | N/A |
| subtitle | Subtitle | Symbol | No | No | No | No | N/A | N/A | N/A |
| body | Body | RichText | No | No | No | No | N/A | N/A | N/A |
| background | Background Image | Link | No | No | No | No | Asset | N/A | N/A |
| backgroundColor | Background Color | Symbol | No | No | No | No | N/A | N/A | N/A |
| actions | Actions | Array | No | No | No | No | Entry | N/A | N/A |
| image | Side Image | Array | No | No | No | No | Asset | N/A | N/A |
| contentWidth | Content Width | Symbol | No | No | No | No | N/A | N/A | N/A |
| contentHeight | Content Height | Symbol | No | No | No | No | N/A | N/A | N/A |
| theme | Theme | Array | No | No | No | No | Entry | N/A | N/A |

### Field Descriptions
- **Internal Title:** A title for internal use only.
- **Variant:** A variant of the hero section.
- **Title:** The main title of the hero section.
- **Subtitle:** A subtitle for the hero section.
- **Body:** The main content of the hero section.
- **Background Image:** An image to use as the background of the hero section.
- **Background Color:** A color to use as the background of the hero section.
- **Actions:** An array of links to entries representing actions to be displayed in the hero section.
- **Side Image:** An array of images to be displayed alongside the hero section.
- **Content Width:** The width of the hero section content.
- **Content Height:** The height of the hero section content.
- **Theme:** An array of links to entries representing themes to be applied to the hero section.

## Editing Entries
To edit an entry made with this content model within the Contentful web app:
1. Navigate to the "Content" section of the sidebar.
2. Select the appropriate space and environment.
3. Click on the entry you wish to edit.
4. Make your desired changes to the fields.
5. Click "Save" to save your changes.

## Linked Content Models
This content model links to the following content models:
- Entry