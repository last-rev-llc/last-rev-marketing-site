# README

## TODO Items
- No TODO items at the moment.

## Known Issues
- No known issues at the moment.

## Code Documentation
This code defines a GraphQL fragment called `Hero_BaseFragment` on the `Hero` type. The fragment includes the following fields:
- `variant`
- `internalTitle`
- `title`
- `subtitle`
- `backgroundColor`
- `contentWidth`
- `contentHeight`
- `background` field that includes a GraphQL fragment called `Media_BaseFragment`
- `body` field that includes a GraphQL fragment called `RichText_BaseFragment`
- `images` field that includes a GraphQL fragment called `Media_BaseFragment`
- `actions` field that includes a GraphQL fragment called `Link_BaseFragment`

This code is used to define the structure of the `Hero` type in a GraphQL schema.