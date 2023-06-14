import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Section {
    introText: Text
    hasBackground: Boolean
  }
`;

export const mappers = {
  Section: {
    Section: {
      hasBackground: async (ref: any, _args: any, ctx: ApolloContext) => {
        const background = getLocalizedField(ref?.fields, 'background', ctx);

        if (background) return true;

        const backgroundColor = getLocalizedField(ref?.fields, 'backgroundColor', ctx);

        if (backgroundColor) return true;

        return false;
      }
    }
  }
};
