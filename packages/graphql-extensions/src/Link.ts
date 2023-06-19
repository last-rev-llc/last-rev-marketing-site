import { Mappers } from '@last-rev/types';
import gql from 'graphql-tag';
import hrefResolver from './resolvers/hrefResolver';
import defaultResolver from './resolvers/defaultResolver';

export const mappers: Mappers = {
  Link: {
    Link: {
      href: hrefResolver,
      target: defaultResolver('target', {
        mappings: {
          'Default': null,
          'New Window': '_blank',
          'Same Window': '_self',
          'Parent Window': '_parent'
        }
      })
    },
    NavigationItem: {
      link: (x: any) => ({ ...x, fieldName: 'link' }),
      href: hrefResolver,
      children: () => []
    }
  }
};

export const typeDefs = gql`
  extend type Link {
    href: String!
    icon: String
    iconPosition: String
  }
`;
