import { getSdk } from '@last-rev-marketing-site/graphql-sdk';
import { GraphQLClient } from 'graphql-request';
import graphqlEndpoint from './graphqlEndpoint';

const sdk = getSdk(new GraphQLClient(graphqlEndpoint));

export default sdk;
