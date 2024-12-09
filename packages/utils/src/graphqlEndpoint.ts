// DEPLOY_URL supplied by netlify, VERCEL_URL supplied by vercel

const deployUrl = process.env.DEPLOY_URL || process.env.VERCEL_URL;

const graphqlEndpoint =
  process.env.STAGE === 'build' || !deployUrl ? 'http://localhost:5000/graphql' : `${deployUrl}/api/graphql`;
// console.log({ STAGE: process.env.STAGE, deployUrl, graphqlEndpoint });

export default graphqlEndpoint;
