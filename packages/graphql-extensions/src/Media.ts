import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

const mediaFieldResolver = async ({ fields, field, assetField, ctx }: any) => {
  const assetRef: any = getLocalizedField(fields, field, ctx);
  let asset;
  if (!assetRef && field == 'asset') asset = { fields };
  else asset = await ctx.loaders.assetLoader.load({ id: assetRef?.sys?.id, preview: !!ctx.preview });
  const fieldValue: any = getLocalizedField(asset?.fields, assetField, ctx);

  return fieldValue;
};

export const mappers = {
  Media: {
    Media: {
      fileTablet: async (media: any, _args: any, ctx: ApolloContext) => {
        let file: any;
        const assetFile = await mediaFieldResolver({ fields: media?.fields, field: 'tablet', assetField: 'file', ctx });
        if (assetFile) {
          file = assetFile;
        }
        return file;
      },
      fileMobile: async (media: any, _args: any, ctx: ApolloContext) => {
        let file: any;
        const assetFile = await mediaFieldResolver({ fields: media?.fields, field: 'mobile', assetField: 'file', ctx });
        if (assetFile) {
          file = assetFile;
        }
        return file;
      }
    },
    Card: {
      title: () => null,
      svgContent: () => null,
      media: (ref: any, _args: any, ctx: ApolloContext) => {
        const featuredMedia: any = getLocalizedField(ref?.fields, 'asset', ctx);
        if (featuredMedia) return [featuredMedia];
        if (ref) return [ref];
        return;
      }
    }
  }
};

export const typeDefs = gql`
  extend type Media {
    link: Link
  }
`;
