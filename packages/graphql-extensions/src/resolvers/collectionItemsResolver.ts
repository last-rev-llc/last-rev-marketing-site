import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { queryContentful } from '@last-rev/graphql-contentful-extensions/dist/utils/queryContentful';

export interface CollectionSettings {
  contentType: string;
  limit?: number;
  offset?: number;
  filter?: any;
  order?: string;
  filters: Array<{
    id: string;
    key: string;
  }>;
}

const collectionItemsResolver = async (collection: any, _args: any, ctx: ApolloContext) => {
  let items = getLocalizedField(collection.fields, 'items', ctx) ?? [];
  try {
    const { contentType, limit, offset, order, filter } =
      (getLocalizedField(collection.fields, 'settings', ctx) as CollectionSettings) || {};
    if (contentType) {
      items = await queryContentful({ contentType, ctx, order, filter, limit, skip: offset });
      return ctx.loaders.entryLoader.loadMany(items?.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview })));
    }
  } catch (error: any) {
    return 'error from Collection extension';
  }
  return items;
};

export default collectionItemsResolver;
