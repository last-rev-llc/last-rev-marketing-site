import gql from 'graphql-tag';
import { getDefaultFieldValue } from '@last-rev/graphql-contentful-core';
import { ContentfulPathsGenerator } from '@last-rev/types';

export const createPath = (...slug: string[]) => {
  let path = slug.join('/').replace(/\/\//g, '/');
  if (path[0] !== '/') path = '/' + path;

  if (path != '/' && path[path.length - 1] === '/') path = path.slice(0, -1);
  return path;
};

export const typeDefs = gql`
  extend type BlogDetail {
    relatedLinks: [Link]
    featuredMedia: [Media]
  }
`;

export const mappers: any = {
  BlogDetail: {
    BlogDetail: {}
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
  BlogDetail: blog
};
