# README

## TODO Items
- No TODO items found in the code.

## Known Issues
- No known issues found in the code.

## Code Description
This code defines a GraphQL fragment called `Page_BaseFragment` on the `Page` type. The fragment includes the following fields:
- `...Content_BaseFragment`
- `seo`
- `slug`
- `header` field with `...ContentModule_BaseFragment` fragment
- `footer` field with `...ContentModule_BaseFragment` fragment
- `hero` field with `...ContentModule_BaseFragment` fragment
- `contents` field with `...ContentModule_BaseFragment` fragment

This fragment can be used to retrieve the specified fields from a `Page` type in a GraphQL query.