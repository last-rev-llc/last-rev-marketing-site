Summary:
This file exports a function called contentfulLoader that takes in an object with src, width, and quality properties. It modifies the src URL by adding query parameters for webp format and image quality, and potentially width if the URL contains 'ctfassets' or 'contentful'. If the src URL includes '.svg', it returns the original src URL.

Import statements:
None

Script Summary:
The contentfulLoader function takes in an object with src, width, and quality properties. It modifies the src URL by adding query parameters for webp format and image quality, and potentially width if the URL contains 'ctfassets' or 'contentful'. If the src URL includes '.svg', it returns the original src URL. The modified URL is returned.

Internal Functions:
None

External Functions:
- contentfulLoader: This function takes in an object with src, width, and quality properties. It modifies the src URL by adding query parameters for webp format and image quality, and potentially width if the URL contains 'ctfassets' or 'contentful'. If the src URL includes '.svg', it returns the original src URL. The modified URL is returned.

Interaction Summary:
This file is likely used in conjunction with other files that handle image loading and rendering. It may be used to modify image URLs before they are loaded and rendered on the page.

Developer Questions:
- What other files in the application use this contentfulLoader function?
- How are images loaded and rendered on the page?
- What is the purpose of modifying the image URL with webp format and image quality parameters?
- What is the purpose of checking if the URL contains 'ctfassets' or 'contentful'?