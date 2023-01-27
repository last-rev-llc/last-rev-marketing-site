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

const formatBodyText = (body: any, length: number) => {
  let bodyText: any = body?.content
    .map((item: any) => item.content[0].value)
    .join(' ')
    .toString()
    .substring(0, length);

  // TODO:
  // Check other punctuation (?!)
  const dot = bodyText?.substr(0, bodyText.lastIndexOf('.'));
  const space = bodyText?.substr(0, bodyText.lastIndexOf(' '));

  bodyText = dot ? `${dot}.` : bodyText;
  bodyText = !dot && bodyText.length > 50 ? `${space}...` : bodyText;
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
      }
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
          body = createRichText(formatBodyText(body, 200));
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

const blog: ContentfulPathsGenerator = async (blogItem, _loaders, defaultLocale, _locales, _preview) => {
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
  PageBlog: blog
};
