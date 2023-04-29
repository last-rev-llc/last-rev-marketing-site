# README

## TODO Items
- None

## Known Issues
- None

## Code Description
This file contains GraphQL fragments for different types of text fields. The fragments include:
- `Text_FieldsFragment`: includes fields for variant, alignment, and styles.
- `Text_BaseFragment`: includes the `Text_FieldsFragment` and a `body` field that uses the `RichText_BaseFragment`.
- `Text_IntroTextFragment`: includes the `Text_FieldsFragment` and a `body` field that uses the `RichText_IntroTextFragment`.
- `Text_RichTextFragment`: includes the `Text_FieldsFragment`, a `body` field that uses the `RichText_RichTextFragment`, and a `links` field that includes entries that use the `Content_BaseFragment` and `Text_FieldsFragment`.

These fragments can be used in GraphQL queries to retrieve specific fields for text content.