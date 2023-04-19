Summary:
This file generates a sitemap for a website using the LastRev sitemap generator package. It uses environment variables to determine the root domain, site, and whether to use preview data. The generated sitemap is saved in the public directory.

Import statements:
- dotenv: loads environment variables from a .env file
- @last-rev/sitemap-generator: package for generating sitemaps
- path: provides utilities for working with file and directory paths
- @last-rev-marketing-site/utils: package for interacting with a LastRev marketing site API

Script Summary:
The script loads environment variables, determines whether to use preview data, and calls the LastRev marketing site API to get sitemap data. It then generates a sitemap using the LastRev sitemap generator package and saves it in the public directory.

Internal Functions:
- run: async function that calls the LastRev marketing site API to get sitemap data, generates a sitemap using the LastRev sitemap generator package, and saves it in the public directory. Returns nothing.

External Functions:
None.

Interaction Summary:
This file interacts with the LastRev marketing site API to get sitemap data and with the LastRev sitemap generator package to generate a sitemap. It also interacts with the environment variables to determine the root domain, site, and whether to use preview data.

Developer Questions:
- What format does the sitemap data need to be in for the LastRev sitemap generator package?
- How are the environment variables set and where are they stored?
- What is the LastRev marketing site API and how does it work?
- What is the purpose of the public directory and how is it used in the application?