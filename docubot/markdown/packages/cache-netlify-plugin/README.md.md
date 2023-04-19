# Cache Netlify Plugin

## Summary
This plugin loads `node_modules/.cache` to and from cache, enabling Turbo cache across builds on Netlify.

## Installation
To install, run the following command:
```bash
npm install cache-netlify-plugin
```

## Usage
Add the plugin to your `netlify.toml` file:
```toml
[[plugins]]
  package = "cache-netlify-plugin"
```

### Example
```javascript
const example = 'hello world'
```

1. Numbered Lists
2. Numbered Lists

- unordered lists
- unordered lists

### Related Files
None

### List of questions that could be answered about this document that could make it more useful
- What is the purpose of this plugin?
- How do I install this plugin?
- How do I use this plugin?

### List of questions that could be asked that the contents of this document could be a resource for developers
- How can I enable Turbo cache across builds on Netlify?
- What is the `node_modules/.cache` directory used for?