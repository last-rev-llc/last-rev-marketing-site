{
  "name": "@last-rev-marketing-site/utils",
  "version": "0.1.0",
  "main": "dist/index.js",
  "files": [
    "dist"
  ],
  "scripts": {
    "clean": "rimraf dist",
    "watch": "yarn build:dev",
    "build": "run-s clean build:prod",
    "dev": "cross-env NODE_ENV=development rollup -cw",
    "build:prod": "cross-env NODE_ENV=production rollup -c",
    "compile": "tsc -p tsconfig.json",
    "compile:watch": "tsc-watch -p tsconfig.json",
    "test": "jest --passWithNoTests",
    "test:watch": "jest --watch",
    "format": "prettier --write \"src/**/*.ts\"",
    "lint": "eslint",
    "prepublishOnly": "yarn run lint && yarn run build",
    "prepare": "yarn run build",
    "preversion": "yarn run lint",
    "version": "yarn run format && git add -A src",
    "postversion": "git push && git push --tags"
  },
  "peerDependencies": {},
  "dependencies": {
    "graphql-request": "^3.6.0",
    "@last-rev-marketing-site/graphql-sdk": "^0.1.0"
  },
  "devDependencies": {
    "@last-rev/rollup-config": "^0.1.4",
    "rollup": "^2.75.7"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "yarn run test"
    }
  },
  "lint-staged": {
    "packages/*src/**/*.{js,jsx,json,css,ts,tsx}": [
      "prettier --write",
      "eslint --fix"
    ]
  }
}
