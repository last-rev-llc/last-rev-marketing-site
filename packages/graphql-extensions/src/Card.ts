import cardLinkResolver from './resolvers/cardLinkResolver';
import defaultResolver from './resolvers/defaultResolver';

export const mappers = {
  Card: {
    Card: {
      variant: defaultResolver('variant'),
      link: cardLinkResolver
    }
  }
};
