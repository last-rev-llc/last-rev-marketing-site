import gql from 'graphql-tag';
import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext, ContentfulLoaders, ContentfulPathsGenerator, Mappers } from '@last-rev/types';
import headerResolver from './resolvers/headerResolver';
import footerResolver from './resolvers/footerResolver';
import createPath from './utils/createPath';

export const typeMappings = {};

export const mappers: Mappers = {
  Page: {
    Page: {
      header: headerResolver,
      footer: footerResolver,
      parentPage: 'parentPage',
      // contents: pageContentsResolver,
      hero: async (page: any, _args: any, ctx: ApolloContext) => {
        const heroRef: any = getLocalizedField(page.fields, 'hero', ctx);
        if (heroRef) {
          return ctx.loaders.entryLoader.load({ id: heroRef?.sys?.id, preview: !!ctx.preview });
        }
        return null;
      }
    }
  }
};

export const typeDefs = gql`
  extend type Page {
    header: Header
    footer: Content
    headerOverride: Header
    footerOverride: Footer
    parentPage: Page
    hero: Hero
    contents: [Content]
  }
`;

// only checking for the first item
const generateParentPaths = async (
  page: any,
  loaders: ContentfulLoaders,
  defaultLocale: string,
  preview?: boolean,
  paths: string[] = []
): Promise<string[]> => {
  const parentPageRef = getDefaultFieldValue(page, 'parentPage', defaultLocale);

  if (parentPageRef) {
    const parentPage = await loaders.entryLoader.load({ id: parentPageRef.sys.id, preview: !!preview });

    if (parentPage) {
      const parentSlug = getDefaultFieldValue(parentPage as any, 'slug', defaultLocale);
      paths.push(parentSlug);
      return generateParentPaths(parentPage, loaders, defaultLocale, preview, paths);
    }
  }

  return paths;
};

const generatePaths: ContentfulPathsGenerator = async (
  pageItem,
  loaders,
  defaultLocale,
  _locales,
  preview = false,
  _site
) => {
  const slug = getDefaultFieldValue(pageItem, 'slug', defaultLocale);

  const paths = await generateParentPaths(pageItem, loaders, defaultLocale, preview);

  paths.reverse().push(slug);

  const fullPath = createPath(...paths);
  const excludedLocales = getDefaultFieldValue(pageItem, 'excludeFromLocale', defaultLocale) || [];

  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: pageItem?.sys?.id,
      excludedLocales
    }
  };
};

export const pathsConfigs = {
  page: generatePaths
};
