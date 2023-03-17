// DEPLOY_URL supplied by netlify, VERCEL_URL supplied by vercel

const deployUrl = process.env.DEPLOY_URL || process.env.VERCEL_URL;

console.log('envs in gql endpoint', process.env.DEPLOY_URL, process.env.STAGE);

const graphqlEndpoint =
  process.env.STAGE === 'build' || !deployUrl ? 'http://localhost:5000/graphql' : `${deployUrl}/api/graphql`;

export default graphqlEndpoint;
