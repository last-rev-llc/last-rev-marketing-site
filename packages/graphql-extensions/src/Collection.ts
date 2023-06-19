import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import gql from 'graphql-tag';
import { camelCase, toUpper } from 'lodash';

import { collectOptions } from './utils/collectOptions';
import { queryContentful } from '@last-rev/graphql-contentful-extensions/dist/utils/queryContentful';
import collectionItemsResolver, { CollectionSettings } from './resolvers/collectionItemsResolver';
import defaultResolver from './resolvers/defaultResolver';

const pascalCase = (str: string) => camelCase(str).replace(/^(.)/, toUpper);

const COLLECTION_ITEM_TYPES = ['Card', 'Link', 'Media', 'Section', 'NavigationItem', 'Blog', 'Topic'];

export const typeDefs = gql`
  extend type Collection {
    items: [CollectionItem]
    introText: Text
    itemsConnection(limit: Int, offset: Int, filter: CollectionFilterInput): CollectionItemConnection
  }

  type CollectionOptions {
    tags: [Option]
    topics: [Option]
  }
  type Option {
    label: String
    value: String
  }
  type ConnectionPageInfo {
    options: CollectionOptions
    allOptions: CollectionOptions
    total: Int
  }

  type CollectionItemConnection {
    pageInfo: ConnectionPageInfo
    items: [CollectionItem]
  }

  input CollectionFilterInput {
    topics: [String]
    tags: [String]
    body: String
  }

  union CollectionItem = ${COLLECTION_ITEM_TYPES.join('| ')}
`;

interface ItemsConnectionArgs {
  limit?: number;
  offset?: number;
  filter?: any;
}

export const mappers: any = {
  Collection: {
    Collection: {
      variant: defaultResolver('variant'),
      items: collectionItemsResolver,
      itemsVariant: defaultResolver('itemsVariant'),
      itemsWidth: defaultResolver('itemsWidth'),
      gutterWidth: defaultResolver('gutterWidth'),
      colorScheme: defaultResolver('colorScheme'),
      disableGutters: defaultResolver('disableGutters', {
        noCamelCase: true
      }),
      itemsConnection: async (collection: any, { limit, offset, filter }: ItemsConnectionArgs, ctx: ApolloContext) => {
        let items = getLocalizedField(collection.fields, 'items', ctx) ?? [];
        try {
          const { contentType, filters } =
            (getLocalizedField(collection.fields, 'settings', ctx) as CollectionSettings) || {};
          // Get all possible items from Contentful
          // Need all to generate the possible options for all items. Not just the current page.
          if (contentType) {
            items = await queryContentful({ contentType, filters, filter, ctx });
            const allItems = await ctx.loaders.entriesByContentTypeLoader.load({
              id: contentType,
              preview: !!ctx.preview
            });
            const options = {};
            const allOptions = await collectOptions({ filters, items: allItems, ctx });

            // Paginate results
            if (offset || limit) {
              items = items?.slice(offset ?? 0, (offset ?? 0) + (limit ?? items?.length));
            }

            return {
              pageInfo: {
                options,
                allOptions
              },
              items: items?.length
                ? await ctx.loaders.entryLoader.loadMany(
                    items.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
                  )
                : null
            };
          }
        } catch (error: any) {
          return 'error from Collection extension';
        }

        return items;
      }
    },
    NavigationItem: {
      text: 'internalTitle',
      subNavigation: 'items'
    }
  }
};

// TODO: support variant for resolving the CollectionItem type
const ITEM_MAPPING: { [key: string]: string } = {
  Page: 'Link',
  PageBlog: 'Card',
  Topic: 'Link',
  Media: 'Card'
};

export const resolvers = {
  CollectionItem: {
    __resolveType: (item: any) => {
      const type =
        ITEM_MAPPING[pascalCase(item?.sys?.contentType?.sys?.id) ?? ''] ?? pascalCase(item?.sys?.contentType?.sys?.id);
      if (COLLECTION_ITEM_TYPES.includes(type)) return type;

      return 'Card';
    }
  }
};
