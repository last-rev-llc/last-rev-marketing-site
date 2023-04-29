# README

## TODO Items
- None

## Known Issues
- None

## Description
This is a Bash script that installs the dependencies using yarn and checks the health of the GraphQL server using wait-on. If the health check fails, it skips the schema download. Otherwise, it uses npx rover to introspect the GraphQL server and saves the schema to a file named schema.graphql.