# README

## TODO Items
- None

## Known Issues
- None

## Code Description
This code defines a GraphQL fragment `Footer_BaseFragment` on the `Footer` type. The fragment includes the following fields:
- `...Content_BaseFragment`
- `variant`
- `logo` which includes the fragment `...Media_BaseFragment`
- `logoUrl`
- `brandAndYear`
- `navigationItems` which includes the fragment `...Collection_BaseFragment`