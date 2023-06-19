import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

const SITE_ID = process.env.DEFAULT_SITE_ID || process.env.SITE_ID;

const footerResolver = async (page: any, _args: any, ctx: ApolloContext) => {
  const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
  const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? SITE_ID, preview: !!ctx.preview });
  const siteFooter: any = getLocalizedField(site?.fields, 'footer', ctx);

  const footer: any = getLocalizedField(page?.fields, 'footer', ctx);
  return footer ?? siteFooter;
};

export default footerResolver;
