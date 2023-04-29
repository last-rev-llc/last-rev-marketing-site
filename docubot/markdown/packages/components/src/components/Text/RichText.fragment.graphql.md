# README

## TODO Items
- None

## Known Issues
- None

## Code Description
This file contains four different fragments for RichText fields in GraphQL. Each fragment includes the id, typename, and json fields, as well as links to other fragments such as Content_BaseFragment, Link_BaseFragment, Media_BaseFragment, and others. The purpose of these fragments is to provide a way to query and retrieve rich text content from a GraphQL API.

### Fragments
- RichText_BaseFragment: This fragment includes links to various other fragments for entries and assets.
- RichText_CardFragment: This fragment includes links to Content_BaseFragment, Link_BaseFragment, and Media_BaseFragment for use in displaying rich text content in a card format.
- RichText_IntroTextFragment: This fragment includes links to Content_BaseFragment, Link_BaseFragment, and Media_BaseFragment for use in displaying introductory text.
- RichText_RichTextFragment: This fragment includes links to various other fragments for entries and assets, as well as Section_BaseFieldsFragment and TableOfContents_BaseFragment for use in displaying rich text content in various formats.

Note: This code is intended to be used in conjunction with a GraphQL API and may not function properly on its own.