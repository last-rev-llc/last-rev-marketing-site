import gql from 'graphql-tag';

import defaultResolver from './resolvers/defaultResolver';
import hrefResolver from './resolvers/hrefResolver';

export const typeDefs = gql`
  type NavigationItem {
    actions: [Link]
    navMedia: [Media]
  }
`;

export const mappers = {
  NavigationItem: {
    NavigationItem: {
      variant: defaultResolver('variant'),
      href: hrefResolver
    }
  }
};
