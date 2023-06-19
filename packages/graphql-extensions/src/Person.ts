import gql from 'graphql-tag';
import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ContentfulPathsGenerator, ContentfulLoaders, ApolloContext } from '@last-rev/types';

import createPath from './utils/createPath';
import headerResolver from './resolvers/headerResolver';
import footerResolver from './resolvers/footerResolver';
import hrefUrlResolver from './resolvers/hrefUrlResolver';

export const typeDefs = gql`
  type Person {
    header: Header
    footer: Content
    slug: String
    socialLinks: [Link]
  }
`;

export const mappers = {
  Person: {
    Person: {
      header: headerResolver,
      footer: footerResolver
    },
    Card: {
      title: 'name',
      subtitle: 'jobTitle',
      media: async (ref: any, _args: any, ctx: ApolloContext) => {
        const mainImageRef = getLocalizedField(ref?.fields, 'mainImage', ctx);
        const rolloverImageRef = getLocalizedField(ref?.fields, 'rolloverImage', ctx);

        const mainImage =
          mainImageRef?.sys?.id &&
          (await ctx.loaders.assetLoader.load({
            id: mainImageRef?.sys?.id,
            preview: !!ctx.preview
          }));

        const rolloverImage =
          rolloverImageRef?.sys?.id &&
          (await ctx.loaders.assetLoader.load({
            id: rolloverImageRef?.sys?.id,
            preview: !!ctx.preview
          }));

        const media = [];

        if (mainImage) media.push(mainImage);
        if (rolloverImage) media.push(rolloverImage);

        return media || [];
      },
      link: null,
      actions: 'socialLinks'
    },
    Link: {
      href: hrefUrlResolver
    }
  }
};

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
  person: generatePaths
};
