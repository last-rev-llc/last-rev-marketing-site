# Cypress Configuration

## TODO Items
- None at the moment.

## Known Issues
- None at the moment.

## Description
This file contains the configuration settings for Cypress, an end-to-end testing framework. The configuration includes the viewport width and height, the integration folder, plugins file, support file, and retry settings for both run mode and open mode. 

## Configuration Settings
- `viewportWidth`: The width of the browser viewport in pixels.
- `viewportHeight`: The height of the browser viewport in pixels.
- `integrationFolder`: The path to the folder containing the Cypress integration tests.
- `pluginsFile`: The path to the file containing the Cypress plugins.
- `supportFile`: The path to the file containing the Cypress support code.
- `retries`: An object containing the retry settings for both run mode and open mode. The `runMode` property specifies the number of times to retry a failed test in run mode, while the `openMode` property specifies the number of times to retry a failed test in open mode.