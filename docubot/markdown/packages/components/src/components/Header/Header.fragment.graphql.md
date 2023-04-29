# README

## TODO Items
- None at the moment.

## Known Issues
- None at the moment.

## Code Documentation
This code snippet defines a GraphQL fragment called `Header_BaseFragment` on the `Header` type. The fragment includes the following fields:
- `...Content_BaseFragment`: This is a spread operator that includes the fields defined in the `Content_BaseFragment` fragment.
- `variant`: A field that specifies the variant of the header.
- `colorScheme`: A field that specifies the color scheme of the header.
- `logo`: A field that includes a media object defined in the `Media_BaseFragment` fragment.
- `logoUrl`: A field that specifies the URL of the logo.
- `navigationItems`: A field that includes a collection of items defined in the `Collection_BaseFragment` fragment.