import gql from 'graphql-tag';
import defaultResolver from './resolvers/defaultResolver';

export const typeDefs = gql`
  type Block {
    introText: Text
    actions: [Link]
    link: Link
    mediaItems: [Media]
  }
`;

export const mappers = {
  Block: {
    Block: {
      variant: defaultResolver('variant') || 'mediaOnLeft'
    }
  }
};
