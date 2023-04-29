# README

## TODO Items
- None

## Known Issues
- None

## Description
This file contains GraphQL fragments for rendering sections and content modules in a website. The fragments are designed to be recursive, allowing for up to three levels of nesting.

## Fragments
### Section_BaseFragment
This fragment defines the base fields for a section, including the intro text and contents. It also includes style fields such as background color and content spacing.

### Section_BaseFieldsFragment
This fragment defines the base fields for a section, including the theme, variant, and styles. It also includes style fields such as background color and content spacing.

### Section_RichTextFragment
This fragment extends the Section_BaseFieldsFragment and includes the contents for a rich text section.

### Section_RichText_ContentModuleFragment
This fragment extends the ContentModule_RichText_SectionFragment and includes the contents for a rich text content module.

### ContentModule_RichText_SectionFragment
This fragment includes the base fields for a rich text content module, as well as fragments for media, quotes, navigation items, collections, and cards.

## Usage
These fragments can be used in GraphQL queries to retrieve data for rendering sections and content modules in a website. The recursive nature of the fragments allows for flexible and dynamic content structures.