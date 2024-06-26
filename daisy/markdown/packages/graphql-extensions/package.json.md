{
  "name": "@last-rev-marketing-site/graphql-extensions",
  "version": "0.1.0",
  "main": "dist/index.js",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "run-s clean build:prod",
    "clean": "rimraf dist",
    "dev": "cross-env NODE_ENV=development rollup -cw",
    "build:prod": "cross-env NODE_ENV=production rollup -c",
    "test": "jest --passWithNoTests",
    "test:watch": "jest --watch",
    "format": "prettier --write \"src/**/*.ts\"",
    "lint": "eslint"
  },
  "dependencies": {
    "@babel/plugin-transform-runtime": "^7.16.5",
    "@contentful/rich-text-from-markdown": "^15.10.0",
    "@contentful/rich-text-plain-text-renderer": "^16.0.3",
    "@contentful/rich-text-types": "^15.11.1",
    "@graphql-tools/merge": "^6.2.14",
    "@last-rev/graphql-contentful-core": "^0.5.14",
    "@last-rev/graphql-contentful-extensions": "^0.2.0",
    "@last-rev/rollup-config": "^0.1.4",
    "@last-rev/types": "^0.3.6",
    "contentful": "^9.1.3",
    "date-fns": "^2.25.0",
    "graphql": "^16.6.0",
    "graphql-tag": "^2.12.5",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "@types/lodash": "^4.14.178",
    "rollup": "^2.75.7"
  }
}
