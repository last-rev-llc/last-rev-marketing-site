# Media_BaseFragment

This file contains a GraphQL fragment called `Media_BaseFragment` which extends the `Content_BaseFragment` and defines fields for media content.

## TODO Items
- None at the moment.

## Known Issues
- None at the moment.

## Fragment Definition
```
fragment Media_BaseFragment on Media {
  # ...Content_BaseFragment
  id
  __typename
  title
  variant
  file {
    url
    extension
    fileName
    width
    height
    #svgContent
  }
}
```

The `Media_BaseFragment` fragment defines the following fields:
- `id`: The unique identifier for the media content.
- `__typename`: The type of the media content.
- `title`: The title of the media content.
- `variant`: The variant of the media content.
- `file`: The file object that contains information about the media file, such as its URL, extension, file name, width, and height. The `svgContent` field is commented out and not included in the fragment definition.