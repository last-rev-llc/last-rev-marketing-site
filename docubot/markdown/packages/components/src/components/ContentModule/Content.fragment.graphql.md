# README

## TODO Items
- None at the moment.

## Known Issues
- None at the moment.

## Code Description
This file contains a GraphQL fragment called `Content_BaseFragment` which is used to retrieve the `id`, `__typename`, and `sidekickLookup` fields from a `Content` object.

### GraphQL Fragment
```
fragment Content_BaseFragment on Content {
  id
  __typename
  sidekickLookup
}
```

This fragment can be used in a GraphQL query to retrieve the specified fields from a `Content` object.