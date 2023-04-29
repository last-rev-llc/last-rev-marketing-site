# README

## TODO Items
- None

## Known Issues
- None

## Code Description
This code defines a GraphQL query named `Sitemap` which takes in four arguments: `$root`, `$locales`, `$preview`, and `$site`. The query returns a sitemap object which contains a list of pages and their corresponding entries. Each page has a `loc` (location) attribute, a `lastmod` attribute, and a `filename` attribute. Each entry has a `loc` attribute and a `lastmod` attribute. 

## Usage
To use this code, simply call the `Sitemap` query and pass in the required arguments. 

```graphql
query Sitemap($root: String!, $locales: [String!], $preview: Boolean, $site: String) {
  sitemap(root: $root, locales: $locales, preview: $preview, site: $site) {
    pages {
      loc
      lastmod
      filename
      entries {
        loc
        lastmod
      }
    }
  }
}
```

## Contributing
If you would like to contribute to this code, please submit a pull request. 

## License
This code is licensed under the MIT license.