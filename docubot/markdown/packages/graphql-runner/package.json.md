README

## TODO Items
- None

## Known Issues
- None

## Description
This is a package named `@last-rev-marketing-site/graphql-runner` with a version of `0.1.0`. It has the following scripts:
- `dev`: runs `gql:pm2:kill`, `gql:pm2 --watch`, and `gql:healthcheck`
- `gql:start`: runs `last-rev gql-serve -c ../../lrconfig`
- `start`: runs `gql:pm2:kill`, `gql:pm2`, and `gql:healthcheck` if `NODE_ENV` is not equal to `test`
- `sync:cms`: runs `last-rev cms-sync -c ../../lrconfig.js`
- `gql:pm2`: runs `pm2 start pm2.json`
- `gql:healthcheck`: runs `wait-on -c wait-on-config.js` or outputs `Healthcheck failed`
- `gql:pm2:kill`: runs `pm2 kill`
- `logs`: runs `pm2 logs`

It has the following dependencies:
- `@last-rev-marketing-site/graphql-extensions` with a version of `^0.1.0`
- `@last-rev/app-config` with a version of `^0.5.0`
- `@last-rev/cli` with a version of `^0.5.16`
- `dotenv` with a version of `^10.0.0`
- `npm-run-all` with a version of `^4.1.5`

It has the following dev dependencies:
- `nodemon` with a version of `^2.0.15`
- `wait-on` with a version of `^5.3.0`

It also has `husky` and `lint-staged` configurations for pre-commit and pre-push hooks.