import gql from 'graphql-tag';

import defaultResolver from './resolvers/defaultResolver';

export const typeDefs = gql`
  extend type Header {
    navigationItems: [NavigationItem]
  }
`;

export const mappers = {
  Header: {
    Header: {
      colorScheme: defaultResolver('colorScheme')
    }
  }
};
