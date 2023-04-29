# README

## TODO Items
- None at the moment.

## Known Issues
- None at the moment.

## Description
This file contains the `PageBlog_BaseFragment` GraphQL fragment on `PageBlog`. The fragment includes the following fields:
- `...Content_BaseFragment`
- `header {...ContentModule_BaseFragment}`
- `footer {...ContentModule_BaseFragment}`
- `seo`
- `title`
- `slug`
- `author`
- `tags`
- `landingPageSummary`
- `creationDate`
- `featuredMedia {...Media_BaseFragment}`
- `body {...RichText_BaseFragment}`
- `relatedLinks {...Link_BaseFragment}`
- `topics {id, slug, title}`

## Usage
This fragment can be used in GraphQL queries to retrieve the specified fields from `PageBlog`.