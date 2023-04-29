# README for NavigationItem_BaseFragment

## TODO Items
- None at the moment.

## Known Issues
- None at the moment.

## Description
This file contains two GraphQL fragments: `NavigationItem_BaseFragment` and `NavigationItem_BaseFieldsFragment`. These fragments are used to retrieve data related to navigation items in a GraphQL query.

### NavigationItem_BaseFragment
This fragment includes the `NavigationItem_BaseFieldsFragment` and also includes the `subNavigation` field. The `subNavigation` field can contain additional navigation items or links.

### NavigationItem_BaseFieldsFragment
This fragment includes the following fields:
- `...Content_BaseFragment`: This is another fragment that includes common fields for content items.
- `text`: The text to display for the navigation item.
- `href`: The URL to link to when the navigation item is clicked.
- `variant`: The variant of the navigation item.
- `summary`: A summary of the navigation item.
- `image`: An optional image to display with the navigation item. This field includes the `Media_BaseFragment`.

## Usage
These fragments can be used in a GraphQL query to retrieve data related to navigation items. The `NavigationItem_BaseFragment` can be used to retrieve a navigation item and its sub-navigation items/links. The `NavigationItem_BaseFieldsFragment` can be used to retrieve the fields for a navigation item.

## Contributors
- [Your Name](https://github.com/yourusername)