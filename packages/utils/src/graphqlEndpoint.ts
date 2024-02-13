// DEPLOY_URL supplied by netlify, VERCEL_URL supplied by vercel

const isVercel = !!process.env.VERCEL_URL;
const isBuild = process.env.STAGE === 'build';
const isLive = !isBuild;

let graphqlEndpoint = 'http://localhost:8888/graphql';

if (isLive && isVercel) {
  graphqlEndpoint = `https://${process.env.VERCEL_URL}/api/graphql`;
}

export default graphqlEndpoint;
