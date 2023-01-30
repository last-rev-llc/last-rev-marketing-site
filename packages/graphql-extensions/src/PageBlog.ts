import gql from 'graphql-tag';
import { getDefaultFieldValue, getLocalizedField, createRichText } from '@last-rev/graphql-contentful-core';
import { ContentfulPathsGenerator, ApolloContext } from '@last-rev/types';
import { Page } from '@last-rev/graphql-contentful-extensions';
import createType from './utils/createType';

export const createPath = (...slug: string[]) => {
  let path = slug.join('/').replace(/\/\//g, '/');
  if (path[0] !== '/') path = '/' + path;
  if (path != '/' && path[path.length - 1] === '/') path = path.slice(0, -1);
  return path;
};

export const typeDefs = gql`
  extend type PageBlog {
    relatedLinks: [Link]
    featuredMedia: [Media]
    header: Header
    footer: Content
  }
`;

/**
 * This function:
 * - Converts the body object into a string
 * - Removes headlines, lists, etc
 * - Trims string to last punctuation
 * - Ellipsis if longer and ends with space
 */
const formatBodyText = (body: any, length: number) => {
  const punctuation = ['.', '!', '?'];
  let bodyText: any = body?.content
    .map((item: any, idx: number) => {
      if (!item.nodeType.includes('paragraph')) {
        delete item.content[0];
        return undefined;
      }
      const str = item.content[0].value;
      const hasPunc = str && punctuation.includes(str.charAt(str.length - 1));
      if (!hasPunc && idx !== 0) return undefined;
      return str;
    })
    .join(' ')
    .toString()
    .substring(0, length);

  const truncateText = (body: any) => {
    if (bodyText.length > 50 && bodyText.at(-1) === ' ') {
      const space = bodyText?.substr(0, bodyText.lastIndexOf(' '));
      bodyText = bodyText.length > 50 ? `${space}...` : bodyText;
      return bodyText;
    }
    let lastIndex = -1;
    punctuation.forEach((punctuation) => {
      const index = body.lastIndexOf(punctuation);
      if (index > lastIndex) {
        lastIndex = index;
      }
    });
    return lastIndex > -1 ? bodyText.substr(0, lastIndex + 1) : bodyText;
  };

  bodyText = truncateText(bodyText).trim();
  return bodyText;
};

export const mappers: any = {
  PageBlog: {
    Hero: {
      image: 'featuredMedia',
      variant: 'featured-image',
      subtitle: async (blog: any, _args: any, ctx: ApolloContext) => {
        const author: any = getLocalizedField(blog.fields, 'author', ctx);
        const creationDate: any = getLocalizedField(blog.fields, 'creationDate', ctx);
        return author && creationDate ? `${author}, ${creationDate}` : `${author || creationDate}`;
      },
      body: async (blog: any, _args: any, ctx: ApolloContext) => {
        let body: any = getLocalizedField(blog.fields, 'body', ctx);
        const summary: any = getLocalizedField(blog.fields, 'landingPageSummary', ctx);
        if (summary) {
          body = createRichText(summary);
        } else {
          body = createRichText(formatBodyText(body, 300));
        }
        return body;
      },
      actions: async (blog: any, _args: any, ctx: ApolloContext) => {
        const slug = createPath('blog', getLocalizedField(blog.fields, 'slug', ctx));
        const link = createType('Link', {
          href: slug,
          text: 'Read more',
          variant: 'button-contained',
          color: 'white'
        });
        return [link];
      },
      internalTitle: () => null
    },
    PageBlog: {
      header: Page.mappers.Page.Page.header,
      footer: Page.mappers.Page.Page.footer
    },
    Card: {
      media: async (blog: any, _args: any, ctx: ApolloContext) => {
        const featuredMedia: any = getLocalizedField(blog.fields, 'featuredMedia', ctx);
        if (!featuredMedia) return null;
        return featuredMedia;
      },
      body: async (blog: any, _args: any, ctx: ApolloContext) => {
        let body: any = getLocalizedField(blog.fields, 'body', ctx);
        const summary: any = getLocalizedField(blog.fields, 'landingPageSummary', ctx);
        if (!summary && !body) return null;
        if (summary) {
          body = createRichText(summary);
        } else {
          // Trim body a bit for long card titles
          const title: any = getLocalizedField(blog.fields, 'title', ctx);
          const bodyChars = title.length < 140 ? 250 : 180;
          body = createRichText(formatBodyText(body, bodyChars));
        }
        return body;
      },
      actions: async (blog: any, _args: any, ctx: ApolloContext) => {
        const slug = createPath('blog', getLocalizedField(blog.fields, 'slug', ctx));
        const link = createType('Link', {
          href: slug,
          text: 'Read more',
          variant: 'text'
        });
        return [link];
      }
    }
  }
};

const pageBlog: ContentfulPathsGenerator = async (blogItem, _loaders, defaultLocale, _locales, _preview) => {
  const slug = getDefaultFieldValue(blogItem, 'slug', defaultLocale);
  const blogLandingSlug = 'blog';
  const fullPath = createPath(blogLandingSlug, slug);
  return {
    [fullPath]: {
      fullPath,
      isPrimary: true,
      contentId: blogItem.sys.id,
      excludedLocales: []
    }
  };
};

export const pathsConfigs = {
  pageBlog
};
