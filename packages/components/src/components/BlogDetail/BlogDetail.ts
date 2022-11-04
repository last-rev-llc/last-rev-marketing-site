import gql from 'graphql-tag';

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
