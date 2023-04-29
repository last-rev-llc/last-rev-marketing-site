Summary:
This file exports a GraphQL endpoint URL based on the environment variables set in the application. It checks for the DEPLOY_URL and VERCEL_URL environment variables and sets the deployUrl variable to the value of either of them. It then sets the graphqlEndpoint variable based on the STAGE environment variable and the deployUrl variable.

Import statements:
None

Script Summary:
This script exports a GraphQL endpoint URL based on the environment variables set in the application.

Internal Functions:
None

External Functions:
- export default graphqlEndpoint: This function exports the GraphQL endpoint URL based on the environment variables set in the application.

Interaction Summary:
This file interacts with the larger application by exporting the GraphQL endpoint URL that is used by other parts of the application to make GraphQL API requests.

Developer Questions:
- What is the purpose of the DEPLOY_URL and VERCEL_URL environment variables?
- What is the purpose of the STAGE environment variable?
- What is the default GraphQL endpoint URL if the deployUrl variable is not set?
- How is the graphqlEndpoint variable set if the STAGE environment variable is not equal to 'build' and the deployUrl variable is not set?
- What happens if both the DEPLOY_URL and VERCEL_URL environment variables are set?