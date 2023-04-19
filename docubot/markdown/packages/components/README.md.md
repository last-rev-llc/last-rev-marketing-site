# Components

## Summary
This documentation explains the structure and purpose of the components folder, which contains all the components used on the website. It also provides information on the package folder structure, Storybook, Cypress, Typescript, Material UI, and creating new component variations.

## Package Folder Structure
```bash
├── .storybook
│   ├── main.js
│   └── manager.js
│   └── preview-head.html
│   └── preview.js
│   └── theme.js
├── cypress
│   ├── plugins
│   └── support
│   └── mount.js
├── src
│   ├── @types
│   ├── components
│   └── docs
│   └── utils
│   └── theme
│   └── contentMapping.ts
│   └── index.tsx
├── netlify.toml
├── cypress.json
└── README.md
```

### `packages/components/.storybook`
This folder contains Storybook, an open source tool for building UI components and pages in isolation. It is used to organize and document the component library while doing front-end component styling.

### `packages/components/cypress`
This folder contains Cypress, a fast, easy, and reliable testing tool for anything that runs in a browser. It is used to run both end-to-end tests and individual component tests.

### `packages/components/src/@types`
This folder contains declarations for any new types that will be part of the main theme.

### `packages/components/src/components`
This folder contains all the components for the website. Most of the components in this folder are themed versions of the LRCL components and will not include the component code but a reference to the original component. It also includes an example for how to do a custom component.

```bash
├── ComponentName
│   ├── ComponentName.fragment.graphql
│   ├── ComponentName.mock.tsx
│   ├── ComponentName.spec.tsx
│   ├── ComponentName.stories.tsx
│   ├── ComponentName.test.tsx
│   ├── ComponentName.theme.tsx
│   ├── ComponentName.tsx
│   ├── index.tsx
```

### `packages/components/src/docs`
This folder contains Storybook documentation.

### `packages/components/src/theme`
This folder contains Material UI and Themes for styling all components. It allows you to customize all design aspects of your project in order to meet the specific needs of your business or brand.

### `packages/components/src/utils`
This folder contains a group of helper functions that are shared across all components.

### `packages/components/src/contentMapping.js`
This file is used to map content models and the variations to their components.

## Use Cases
### Updating the global theme and styles
Global styles are located in the `packages/components/src/theme/index.ts` file.

### Creating a new component variation
1. Go into the CMS and add a new variant option for the content model.
2. Open up the `ComponentName.theme.tsx`.
3. Add a new variant object inside the variants array.

### Creating a new content model component
1. Create a new folder in the components folder.
2. Add the import to `packages/components/src/contentMapping.js`.
3. Add the component to the lookup.

### Adding a new component for a variation
If the variant will require a whole new component because you can't simply use styles, you can add it to the lookup.

### Related Files
None

### List of questions that could be answered about this document that could make it more useful
- What is the purpose of the components folder?
- What is Storybook?
- What is Cypress?
- What is Typescript?
- What is Material UI?
- How do you create a new component variation?
- How do you create a new content model component?
- How do you add a new component for a variation?

### List of questions that could be asked that the contents of this document could be a resource for developers
- How do I use Storybook to organize and document the component library?
- How do I use Cypress to run end-to-end tests and individual component tests?
- How do I use Typescript to declare new types that will be part of the main theme?
- How do I use Material UI and Themes to customize all design aspects of my project?
- How do I update the global theme and styles?
- How do I create a new component variation?
- How do I create a new content model component?
- How do I add a new component for a variation?