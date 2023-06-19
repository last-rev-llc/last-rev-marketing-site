import gql from 'graphql-tag';
import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext, ContentfulLoaders, ContentfulPathsGenerator, Mappers } from '@last-rev/types';
import headerResolver from './resolvers/headerResolver';
import footerResolver from './resolvers/footerResolver';
import hrefUrlResolver from './resolvers/hrefUrlResolver';
import { queryContentful } from '@last-rev/graphql-contentful-extensions/dist/utils/queryContentful';
import createPath from './utils/createPath';
import createType from './utils/createType';

export const typeMappings = {};

const BLOGS_LANDING_ID = '36E6TQCwE9QNOkT7YkLgdy';

export const typeDefs = gql`
  type Topic {
    header: Header
    footer: Content
    headerOverride: Header
    footerOverride: Content
    contents: [Content]
    hero: Hero
  }
`;

export const mappers: Mappers = {
  Topic: {
    Topic: {
      header: async (_: any, args: any, ctx: ApolloContext) => {
        const blogsLanding = await ctx.loaders.entryLoader.load({ id: BLOGS_LANDING_ID, preview: !!ctx.preview });
        return headerResolver(blogsLanding, args, ctx);
      },
      footer: async (_: any, args: any, ctx: ApolloContext) => {
        const blogsLanding = await ctx.loaders.entryLoader.load({ id: BLOGS_LANDING_ID, preview: !!ctx.preview });
        return footerResolver(blogsLanding, args, ctx);
      },
      parentPage: 'parentPage',

      hero: async (_: any, _args: any, ctx: ApolloContext) => {
        const blogsLanding = await ctx.loaders.entryLoader.load({ id: BLOGS_LANDING_ID, preview: !!ctx.preview });
        const heroRef: any = getLocalizedField(blogsLanding?.fields, 'hero', ctx);
        // const hero = await ctx.loaders.entryLoader.load({ id: heroRef?.sys?.id, preview: !!ctx.preview });
        if (!heroRef) return null;
        return heroRef;
      },
      contents: async (topic: any, _args: any, ctx: ApolloContext) => {
        const settings = {
          filter: { topics: [topic.sys.id] },
          filters: [
            {
              id: 'topics',
              key: 'fields.topics.sys.id[in]',
              type: 'select',
              label: 'Topic'
            },
            {
              id: 'body',
              key: 'query',
              type: 'text',
              label: 'Search'
            }
          ],
          contentType: 'pageBlog'
        };

        const { contentType, filters, filter } = settings;

        const items = await queryContentful({ contentType, filters, filter, ctx });

        console.log({ items });

        return [
          createType('Section', {
            contents: [
              createType('Collection', {
                id: topic?.sys?.id,
                variant: 'threePerRow',
                itemsVariant: 'default',
                items: items?.length
                  ? await ctx.loaders.entryLoader.loadMany(
                      items.map((x: any) => ({ id: x?.sys?.id, preview: !!ctx.preview }))
                    )
                  : null
              })
            ]
          })
        ];
      }
    },
    Link: {
      href: hrefUrlResolver,
      text: async (topic: any, _args: any, ctx: ApolloContext) => {
        const title = getLocalizedField(topic?.fields, 'title', ctx);
        return title;
      }
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
  } else {
    paths.push('/blog');
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
  topic: generatePaths
};
