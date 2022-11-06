import gql from 'graphql-tag';
import { getDefaultFieldValue } from '@last-rev/graphql-contentful-core';
import { ContentfulPathsGenerator } from '@last-rev/types';
import { Page } from '@last-rev/graphql-contentful-extensions';
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

export const mappers: any = {
  PageBlog: {
    PageBlog: {
      header: Page.mappers.Page.Page.header,
      footer: Page.mappers.Page.Page.footer
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
