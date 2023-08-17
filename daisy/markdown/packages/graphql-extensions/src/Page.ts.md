import gql from 'graphql-tag';
import capitalize from 'lodash/capitalize';
import { getDefaultFieldValue, getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext, ContentfulPathsGenerator, Mappers } from '@last-rev/types';
import { Page } from '@last-rev/graphql-contentful-extensions';
import createType from './utils/createType';

export const typeMappings = {};

const BLOGS_LANDING_ID = '36E6TQCwE9QNOkT7YkLgdy';

// TODO: Move this function to utilities
export const createPath = (...slug: string[]) => {
  const path = slug.join('/').replace(/\/\//g, '/');
  if (path[0] === '/') return path;
  else return '/' + path;
};

const WRAPPER_SECTION_SETTINGS: any = {
  Collection: { contentWidth: 'xl', contentSpacing: 4 },
  Card: { contentWidth: 'xl' }
};

const pageContentsResolver = async (page: any, _args: any, ctx: ApolloContext) => {
  // Get the Page contents
  const contentsRef = getLocalizedField(page?.fields, 'contents', ctx);
  if (contentsRef?.length) {
    // Load the Page contents
    const contents = await ctx.loaders.entryLoader.loadMany(
      contentsRef.map((content: any) => ({ id: content?.sys?.id, preview: !!ctx.preview }))
    );
    // Map the Page contents (if not a Section wrap it)
    return contents
      ?.filter((content) => !!content)
      .map((content: any) => {
        if (!content) return null;
        const variant = getLocalizedField(content.fields, 'variant', ctx);
        const itemsWidth = getLocalizedField(content.fields, 'itemsWidth', ctx);
        const contentType = capitalize(content?.sys?.contentType?.sys?.id);
        const settings =
          WRAPPER_SECTION_SETTINGS[contentType] ||
          WRAPPER_SECTION_SETTINGS[`${contentType}_${variant ?? 'default'}`] ||
          {};

        return contentType === 'Section'
          ? content
          : createType('Section', {
              contents: [content],
              variant: `${contentType}_${variant ?? 'default'}_section-wrapper`,
              ...settings,
              // Avoid duplicating itemsWidth
              contentWidth: itemsWidth ? undefined : settings.contentWidth
            });
      });
  }
  return [];
};

const topicContentsResolver = async (_: any, _args: any, ctx: ApolloContext) => {
  const blogsLanding = await ctx.loaders.entryLoader.load({ id: BLOGS_LANDING_ID, preview: !!ctx.preview });
  const contentsRef = getLocalizedField(blogsLanding?.fields, 'contents', ctx);
  if (contentsRef?.length) {
    // Load the Page contents
    const contents = await ctx.loaders.entryLoader.loadMany(
      contentsRef.map((content: any) => ({ id: content?.sys?.id, preview: !!ctx.preview }))
    );
    // Map the Page contents (if not a Section wrap it)
    return contents
      ?.filter((content) => !!content)
      .map((content: any) => {
        if (!content) return null;
        const variant = getLocalizedField(content.fields, 'variant', ctx);
        const itemsWidth = getLocalizedField(content.fields, 'itemsWidth', ctx);
        const contentType = capitalize(content?.sys?.contentType?.sys?.id);
        const settings =
          WRAPPER_SECTION_SETTINGS[contentType] ||
          WRAPPER_SECTION_SETTINGS[`${contentType}_${variant ?? 'default'}`] ||
          {};

        return contentType === 'Section'
          ? content
          : createType('Section', {
              contents: [content],
              variant: `${contentType}_${variant ?? 'default'}_section-wrapper`,
              ...settings,
              // Avoid duplicating itemsWidth
              contentWidth: itemsWidth ? undefined : settings.contentWidth
            });
      });
  }
  return [];
};

export const mappers: Mappers = {
  Page: {
    Page: {
      header: Page.mappers.Page.Page.header,
      footer: Page.mappers.Page.Page.footer,
      contents: pageContentsResolver,
      hero: async (page: any, _args: any, ctx: ApolloContext) => {
        const heroRef: any = getLocalizedField(page.fields, 'hero', ctx);
        if (heroRef) {
          return ctx.loaders.entryLoader.load({ id: heroRef?.sys?.id, preview: !!ctx.preview });
        }
        return null;
      }
    }
  },
  Topic: {
    Topic: {
      header: Page.mappers.Page.Page.header,
      footer: Page.mappers.Page.Page.footer,
      contents: topicContentsResolver,
      hero: async (_: any, _args: any, ctx: ApolloContext) => {
        const blogsLanding = await ctx.loaders.entryLoader.load({ id: BLOGS_LANDING_ID, preview: !!ctx.preview });
        const heroRef: any = getLocalizedField(blogsLanding?.fields, 'hero', ctx);
        const hero = await ctx.loaders.entryLoader.load({ id: heroRef?.sys?.id, preview: !!ctx.preview });
        if (!hero) return heroRef;
        return hero;
      }
    }
  }
};

export const typeDefs = gql`
  extend type Page {
    header: Header
    footer: Footer
    hero: Hero
    contents: [Content]
  }
  extend type Topic {
    header: Header
    footer: Content
    contents: [Content]
    hero: Hero
  }
`;

const page: ContentfulPathsGenerator = async (pageItem, _loaders, defaultLocale, _locales, _preview = false, _site) => {
  const slug = getDefaultFieldValue(pageItem, 'slug', defaultLocale);
  const fullPath = createPath(slug);
  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: pageItem?.sys?.id,
      excludedLocales: []
    }
  };
};

const topic: ContentfulPathsGenerator = async (topicItem, _loaders, defaultLocale, _locales, _preview = true) => {
  const slug = getDefaultFieldValue(topicItem, 'slug', defaultLocale);
  const fullPath = createPath('blog', slug);
  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: topicItem.sys.id,
      excludedLocales: []
    }
  };
};

export const pathsConfigs = {
  page,
  topic
};
