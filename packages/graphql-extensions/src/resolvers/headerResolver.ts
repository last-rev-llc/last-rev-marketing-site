import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

const headerResolver = async (page: any, _args: any, ctx: ApolloContext) => {
  const header: any = getLocalizedField(page?.fields, 'headerOverride', ctx);
  if (header) {
    return header;
  }

  // TODO - Uncomment these lines and remove lines 16 & 17 when the headerOverride field is added to the Page content model
  // const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
  // const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? SITE_ID, preview: !!ctx.preview });
  // return getLocalizedField(site?.fields, 'header', ctx);
  const siteHeader = await ctx.loaders.entryLoader.load({ id: '651oZabdh8L3VI0Ry28wse', preview: !!ctx.preview });
  return siteHeader;
};

export default headerResolver;
