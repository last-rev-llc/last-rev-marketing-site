README

This file contains the schema definition for a GraphQL API. It defines various types and interfaces that can be queried using GraphQL queries.

TODO Items:
- None

Known Issues:
- None

Directives:
- @extends: can be used on INTERFACE or OBJECT types to indicate that the type extends another type.
- @external: can be used on FIELD_DEFINITION or OBJECT types to indicate that the field or type is defined in another schema.
- @key: can be used on INTERFACE or OBJECT types to indicate the fields that make up the unique identifier for the type.
- @provides: can be used on FIELD_DEFINITION to indicate the fields that the field provides.
- @requires: can be used on FIELD_DEFINITION to indicate the fields that the field requires.

Types:
- Asset: represents an asset with various properties such as description, extension, fileName, height, id, svgContent, title, and url.
- Blog: represents a blog with properties such as animation, id, placeholder, sidekickLookup, theme, and variant.
- Card: represents a card with properties such as actions, animation, body, id, internalTitle, link, media, sidekickLookup, subtitle, theme, title, and variant.
- CategoryBlog: represents a category blog with properties such as animation, id, lr__path__, seo, sidekickLookup, slug, theme, and title.
- Collection: represents a collection with properties such as animation, id, internalTitle, introText, items, itemsConnection, itemsSpacing, itemsVariant, itemsWidth, settings, sidekickLookup, styles, theme, and variant.
- CollectionFilterInput: represents the input for filtering a collection.
- CollectionItem: represents a union of Card, Link, Media, NavigationItem, and Section types.
- CollectionItemConnection: represents a connection to a collection item with properties such as items and pageInfo.
- CollectionOptions: represents the options for a collection with properties such as tags and topics.
- ConfigTableOfContents: represents a configuration table of contents with properties such as animation, headerLevelToDisplay, id, internalTitle, layout, sidekickLookup, theme, and variant.
- ConnectionPageInfo: represents the page information for a connection with properties such as allOptions, options, and total.
- Content: represents an interface for all content types with properties such as animation, id, and sidekickLookup.
- ContentfulAppSettings: represents the settings for a Contentful app with properties such as animation, id, internalTitle, settings, sidekickLookup, theme, and variant.
- ContentsFilter: represents the filter for querying contents with properties such as contentTypes, displayType, ids, and locale.
- Date: represents a custom scalar type for dates.
- Footer: represents a footer with properties such as animation, brandAndYear, id, logo, logoUrl, navigationItems, sidekickLookup, theme, and variant.
- Header: represents a header with properties such as animation, colorScheme, id, internalTitle, logo, logoUrl, navigationItems, sidekickLookup, theme, and variant.
- Heading: represents a heading with properties such as id, level, and text.
- Hero: represents a hero with properties such as actions, animation, background, backgroundColor, body, contentHeight, contentWidth, id, image, internalTitle, sidekickLookup, subtitle, theme, title, and variant.
- JSON: represents a scalar type for JSON values.
- Link: represents a link with properties such as animation, color, href, icon, iconPosition, id, internalTitle, manualUrl, sidekickLookup, text, theme, and variant.
- Locales: represents the available locales with properties such as available and default.
- Location: represents a location with properties such as lat and lon.
- Media: represents a media with properties such as animation, asset, assetURL, controls, description, file, fileMobile, fileTablet, id, internalTitle, mobile, placeholder, sidekickLookup, source, tablet, theme, title, and variant.
- ModuleIntegration: represents a module integration with properties such as animation, id, internalTitle, settings, sidekickLookup, theme, and variant.
- NavigationItem: represents a navigation item with properties such as animation, href, id, image, internalTitle, manualUrl, media, sidekickLookup, subNavigation, summary, text, theme, and variant.
- Option: represents an option with properties such as label and value.
- Page: represents a page with properties such as animation, colorScheme, contents, disableBackToTop, footer, header, hero, id, lr__path__, seo, sidekickLookup, slug, theme, and title.
- PageBlog: represents a page blog with properties such as animation, author, body, creationDate, featuredMedia, footer, header, id, landingPageSummary, lr__path__, relatedLinks, seo, sidekickLookup, slug, tags, theme, title, and topics.
- PagePathParam: represents a path parameter for a page with properties such as slug.
- PagePathParams: represents the path parameters for a page with properties such as locale and params.
- Person: represents a person with properties such as animation, calendlyUrl, emailAddress, id, image, jobTitle, linkedIn, lr__path__, name, phone, sidekickLookup, slug, and theme.
- Query: represents the root query type with fields such as _service, availableLocales, content, contents, page, paths, sitemap, sitemapIndex, and sitemapPage.
- Quote: represents a quote with properties such as actions, animation, authorImage, authorName, authorTitle, id, internalTitle, logo, quote, sidekickLookup, theme, and variant.
- RichText: represents rich text with properties such as id, json, and links.
- RichTextLinks: represents the links in rich text with properties such as assets and entries.
- Section: represents a section with properties such as anchorName, animation, background, backgroundColor, contentAlignment, contentDirection, contentSpacing, contentWidth, contents, id, internalTitle, introText, paddingBottom, paddingLeft, paddingRight, paddingTop, settings, sidekickLookup, styles, theme, and variant.
- Settings: represents settings with properties such as animation, id, internalTitle, liveEditorSettings, sidekickLookup, theme, and variant.
- Site: represents a site with properties such as animation, id, internalTitle, seo, sidekickLookup, siteKey, theme, and variant.
- Sitemap: represents a sitemap with properties such as pages.
- SitemapEntry: represents an entry in a sitemap with properties such as lastmod and loc.
- SitemapPage: represents a page in a sitemap with properties such as contentType, entries, filename, lastmod, loc, locale, and page.
- SubnavigationItem: represents a union of Link and NavigationItem types.
- TableOfContents: represents a table of contents with properties such as animation, content, id, internalTitle, sidekickLookup, theme, and variant.
- Template: represents a template with properties such as animation, category, id, image, sidekickLookup, templateName, theme, and variant.
- Text: represents text with properties such as align, animation, body, color, id, internalTitle, sidekickLookup, styles, theme, and variant.
-