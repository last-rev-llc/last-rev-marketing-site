# CollectionItems Query

This file contains a GraphQL query for retrieving items from a collection. 

## TODO Items
- None at the moment.

## Known Issues
- None at the moment.

## Usage
This query can be used in a GraphQL API to retrieve items from a collection. It takes in the following variables:
- `locale`: A string representing the locale of the content to retrieve.
- `preview`: A boolean indicating whether to retrieve preview content.
- `id`: A string representing the ID of the collection to retrieve items from.
- `limit`: An optional integer representing the maximum number of items to retrieve.
- `offset`: An optional integer representing the number of items to skip before retrieving.
- `filter`: An optional input object representing the filter criteria for the items.

The query returns an object with the following fields:
- `__typename`: A string representing the type of the content returned.
- `id`: A string representing the ID of the content returned.
- `itemsConnection`: An object representing the connection to the items in the collection. It contains the following fields:
  - `pageInfo`: An object representing information about the page of items returned. It contains the following fields:
    - `allOptions`: An array of objects representing all the available options for filtering the items.
    - `options`: An array of objects representing the options used to filter the items.
  - `items`: An array of objects representing the items in the collection. Each item contains the following fields:
    - `...Card_BaseFragment`: A fragment containing information about the item as a card.
    - `...Link_BaseFragment`: A fragment containing information about the item as a link.
    - `...NavigationItem_BaseFragment`: A fragment containing information about the item as a navigation item.
    - `...Media_BaseFragment`: A fragment containing information about the item as a media item.

## Fragment
This file also contains a fragment called `CollectionItems_OptionsFragment`. This fragment represents the options available for filtering items in a collection. It contains the following fields:
- `__typename`: A string representing the type of the options returned.
- `topics`: An array of objects representing the available topics for filtering the items. Each object contains the following fields:
  - `label`: A string representing the label for the topic.
  - `value`: A string representing the value for the topic.
- `tags`: An array of objects representing the available tags for filtering the items. Each object contains the following fields:
  - `label`: A string representing the label for the tag.
  - `value`: A string representing the value for the tag.