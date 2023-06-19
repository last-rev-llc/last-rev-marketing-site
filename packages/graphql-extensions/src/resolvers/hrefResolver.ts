import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

import getPathReader from '../utils/getPathReader';

const hrefResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  const contentRef = getLocalizedField(item.fields, 'linkedContent', ctx);

  if (contentRef) {
    const content = await ctx.loaders.entryLoader.load({ id: contentRef.sys.id, preview: !!ctx.preview });
    if (content) {
      const path = await getPathReader(ctx)?.getPathsByContentId(content.sys.id, undefined, process.env.SITE);

      // TODO: Do we need to support more items?
      if (!!path?.length) return path[0];
    }
  }

  const manualUrl = getLocalizedField(item.fields, 'manualUrl', ctx);
  if (manualUrl) return manualUrl;

  return '#';
};

export default hrefResolver;
