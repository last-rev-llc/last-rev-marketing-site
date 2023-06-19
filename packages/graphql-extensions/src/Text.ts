import defaultResolver from './resolvers/defaultResolver';

export const mappers = {
  Text: {
    Text: {
      variant: defaultResolver('variant'),
      align: defaultResolver('align'),
      colorScheme: defaultResolver('colorScheme')
    }
  }
};
