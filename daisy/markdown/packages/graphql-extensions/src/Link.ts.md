import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { Mappers, ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';
import createPath from './utils/createPath';
import getPathReader from './utils/getPathReaders';

type TargetMapping = {
  'New Window': string;
  'Current Window': string;
};

const TARGET_MAPPING: TargetMapping = {
  'New Window': '_blank',
  'Current Window': '_self'
};

const hrefUrlResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  const href = getLocalizedField(item.fields, 'href', ctx);
  const manualUrl = getLocalizedField(item.fields, 'manualUrl', ctx);
  if (href || manualUrl) return createPath(href ?? manualUrl);

  const contentRef = getLocalizedField(item.fields, 'linkedContent', ctx);
  if (contentRef) {
    const content = await ctx.loaders.entryLoader.load({ id: contentRef.sys.id, preview: !!ctx.preview });
    if (content) {
      if (content?.sys?.contentType?.sys?.id === 'media') {
        const assetRef = getLocalizedField(content.fields, 'asset', ctx);
        if (assetRef?.sys?.id) {
          const asset = await ctx.loaders.assetLoader.load({ id: assetRef?.sys?.id, preview: !!ctx.preview });
          if (asset) {
            return `https:${getLocalizedField(asset.fields, 'file', ctx)?.url}`;
          }
        }
      }
      const path = await getPathReader(ctx)?.getPathsByContentId(content.sys.id, undefined, process.env.SITE);

      // TODO: Do we need to support more items?
      if (!!path?.length) return path[0];
    }
  }
  return '#';
};

export default hrefUrlResolver;

const targetResolver = async (link: any, _: never, ctx: ApolloContext) => {
  const target = getLocalizedField(link.fields, 'target', ctx);
  return TARGET_MAPPING[target as keyof TargetMapping] ?? '_self';
};

export const mappers: Mappers = {
  Link: {
    Link: {
      href: hrefUrlResolver,
      target: targetResolver
    },
    NavigationItem: {
      link: (x: any) => ({ ...x, fieldName: 'link' }),
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
