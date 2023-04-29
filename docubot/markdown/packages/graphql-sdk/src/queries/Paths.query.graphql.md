# README

## TODO Items
- None at the moment.

## Known Issues
- None at the moment.

## Description
This file contains a GraphQL query that retrieves paths from a website. The query takes in three parameters: `$locales`, `$preview`, and `$site`. It returns an array of objects that contain the `slug` and `locale` of each path.

## Usage
To use this query, simply copy and paste it into your GraphQL client and provide the necessary parameters. 

## Parameters
- `$locales`: An array of strings representing the locales to retrieve paths for.
- `$preview`: A boolean indicating whether to retrieve preview paths or not.
- `$site`: A string representing the site to retrieve paths for.

## Example
```
query Paths($locales: [String!], $preview: Boolean, $site: String) {
  paths(locales: $locales, preview: $preview, site: $site) {
    params {
      slug
    }
    locale
  }
}
```