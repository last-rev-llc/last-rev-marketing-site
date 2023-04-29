# README

## Description
This file contains a code snippet for a GraphQL fragment called `TableOfContents_BaseFragment` that extends the `Content_BaseFragment` and includes information about headings in the content.

## TODO Items
- None at the moment.

## Known Issues
- None at the moment.

## Code
```
fragment TableOfContents_BaseFragment on TableOfContents {
  ...Content_BaseFragment
  content {
    ... on Heading {
      level
      text
      id
    }
  }
}
```

## Usage
This code can be used in a GraphQL schema to retrieve information about headings in a table of contents. The fragment can be extended to include additional fields as needed.