import cardLinkResolver from './resolvers/cardLinkResolver';
// import { ApolloContext } from '@last-rev/types';

export const mappers = {
  Card: {
    Card: {
      link: cardLinkResolver
    }
  }
};
