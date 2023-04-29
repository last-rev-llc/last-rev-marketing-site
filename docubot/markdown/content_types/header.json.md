# Contentful Content Model Documentation: Header

## System Details
- **Space ID:** imglmb3xms7o
- **Content Model ID:** header
- **Content Model Type:** ContentType
- **Created At:** 2022-06-13T19:50:51.864Z
- **Last Updated At:** 2022-11-03T22:19:30.121Z
- **Environment:** master
- **Revision:** 3

## Description
The Header content model is used to define the header section of a website. It includes fields for the internal title, logo, logo URL, navigation items, and color scheme.

## Editing Entries
To create or edit entries using this content model, follow these steps:
1. Log in to the Contentful web app.
2. Select the space where the content model is located.
3. Click on the "Content" tab in the top navigation bar.
4. Select the content type "Header" from the list of content types.
5. Click the "Create Header" button to create a new entry or click on an existing entry to edit it.
6. Fill in the fields as desired and click the "Save" button to save your changes.

## Fields
The following table lists out each field in the Header content model, including all of their properties:

| Field ID | Field Name | Field Type | Localized | Required | Disabled | Omitted | Link Type | Validations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| internalTitle | Internal Title | Symbol | No | No | No | No | N/A | N/A |
| logo | Logo | Link | No | No | No | No | Asset | N/A |
| logoUrl | Logo Url | Symbol | No | No | No | No | N/A | N/A |
| navigationItems | Navigation Items | Array | No | No | No | No | Entry | linkContentType: collection |
| colorScheme | Color Scheme | Symbol | No | Yes | No | No | N/A | N/A |

## Linked Content Models
The Header content model links to the following content models:
- Collection