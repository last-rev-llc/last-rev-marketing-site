# README

## TODO Items
- None

## Known Issues
- None

## Code Description
This code defines two fragments `Link_BaseFragment` and `Link_CardFragment` on the `Link` type. Both fragments include the `Content_BaseFragment` and define additional fields for `text`, `href`, `variant`, `icon`, `iconPosition`, and `color`. These fragments can be used in GraphQL queries to retrieve data for links.

```graphql
fragment Link_BaseFragment on Link {
  ...Content_BaseFragment
  text
  href
  variant
  icon
  iconPosition
  color
}

fragment Link_CardFragment on Link {
  ...Content_BaseFragment
  text
  href
  variant
  icon
  iconPosition
  color
}
```