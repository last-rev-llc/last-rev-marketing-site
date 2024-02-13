// DEPLOY_URL supplied by netlify, VERCEL_URL supplied by vercel
const deployUrl = process.env.DEPLOY_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

export const graphqlEndpoint =
  process.env.CI || process.env.NEXT_PHASE === 'phase-production-build' || process.env.STAGE === 'build' || !deployUrl
    ? 'http://localhost:8888/api/graphql'
    : `${deployUrl}/api/graphql`;

export default graphqlEndpoint;
