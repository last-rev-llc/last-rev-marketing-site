# Contentful Content Model Documentation

## System Details

| Field | Value |
| --- | --- |
| Space ID | imglmb3xms7o |
| Content Type ID | quote |
| Created At | 2022-06-13T19:50:53.183Z |
| Updated At | 2022-06-24T20:04:10.084Z |
| Environment ID | master |
| Revision | 8 |

## Description

This content model is used to create quotes with author information and actions. It includes the following fields:

| Field ID | Field Name | Field Type | Required | Description |
| --- | --- | --- | --- | --- |
| internalTitle | Internal Title | Symbol | No | A title for internal reference |
| quote | Quote | Text | No | The quote text |
| authorName | Author Name | Symbol | No | The name of the author |
| authorTitle | Author Title | Symbol | No | The title of the author |
| authorImage | Author Image | Link | No | An image of the author |
| logo | Logo | Link | No | A logo image |
| actions | Actions | Array | No | An array of links to other content models |

## Editing Entries

To create a new quote entry using this content model, follow these steps:

1. Log in to the Contentful web app.
2. Select the space where the content model is located.
3. Click on the "Content" tab in the navigation menu.
4. Click on the "Create Entry" button.
5. Select the "Quote" content type from the list of available content types.
6. Fill in the fields with the desired information.
7. Click on the "Save" button to save the new entry.

To edit an existing quote entry, follow these steps:

1. Log in to the Contentful web app.
2. Select the space where the content model is located.
3. Click on the "Content" tab in the navigation menu.
4. Find the quote entry you want to edit and click on it.
5. Make the desired changes to the fields.
6. Click on the "Save" button to save the changes.

## Linked Content Models

This content model links to the "link" content model.