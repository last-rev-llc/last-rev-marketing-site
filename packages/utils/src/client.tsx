import { getSdk } from '@last-rev-marketing-site/graphql-sdk';
import { GraphQLClient } from 'graphql-request';

let URL =
  process.env.STAGE === 'build' || !process.env.DEPLOY_URL
    ? 'http://localhost:5000/graphql'
    : `${process.env.DEPLOY_URL}${process.env.GRAPHQL_SERVER_URL}` ?? 'http://localhost:3000/api/graphql';

if (process.env.NODE_ENV !== 'production') URL = 'http://localhost:3000/api/graphql';
console.log('URL', URL);
const sdk = getSdk(new GraphQLClient(URL));

export default sdk;
