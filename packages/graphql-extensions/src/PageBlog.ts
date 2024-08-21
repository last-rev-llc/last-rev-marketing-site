import gql from 'graphql-tag';
import { getDefaultFieldValue, getLocalizedField, createRichText } from '@last-rev/graphql-contentful-core';
import { ContentfulPathsGenerator, ApolloContext } from '@last-rev/types';
import { Page } from '@last-rev/graphql-contentful-extensions';
import getFirstOfArray from '@last-rev/component-library/dist/utils/getFirstOfArray';
import kebabCase from 'lodash/kebabCase';
import createType from './utils/createType';

const mediaFieldResolver = async ({ fields, ctx }: any) => {
  let mediaField: any = null;
  const featuredImage: any = getFirstOfArray(getLocalizedField(fields, 'featuredMedia', ctx));

  if (featuredImage) {
    const featuredImageEntry: any = await ctx.loaders.entryLoader.load({
      id: featuredImage.sys?.id,
      preview: !!ctx.preview
    });

    if (featuredImageEntry) {
      const asset: any = getLocalizedField(featuredImageEntry.fields, 'asset', ctx);

      if (asset) {
        const featuredImageMedia: any = await ctx.loaders.assetLoader.load({
          id: asset.sys?.id,
          preview: !!ctx.preview
        });

        if (featuredImageMedia) {
          const imageFile = getLocalizedField(featuredImageMedia.fields, 'file', ctx);
          const imageTitle = getLocalizedField(featuredImageMedia.fields, 'title', ctx);

          mediaField = {
            id: asset.sys?.id,
            url: imageFile?.url?.startsWith('//') ? `https:${imageFile?.url}` : imageFile?.url,
            title: imageTitle
          };
        }
      }
    }
  }
  return mediaField;
};

const getSeoValue = (value: string | undefined, defaultValue: string) =>
  value && value?.trim() !== '' ? value : defaultValue;

const getSlug = (topic: any, ctx: ApolloContext) => {
  const title = getLocalizedField(topic.fields, 'title', ctx);
  const slug = getLocalizedField(topic.fields, 'slug', ctx);
  return slug ?? kebabCase(title);
};

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
    topics: [Topic]
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
      footer: Page.mappers.Page.Page.footer,
      seo: async (blog: any, _args: any, ctx: ApolloContext) => {
        const seo: any = getLocalizedField(blog.fields, 'seo', ctx);
        const title: any = getLocalizedField(blog.fields, 'title', ctx);
        const summary: any = getLocalizedField(blog.fields, 'landingPageSummary', ctx);

        const body: any = getLocalizedField(blog.fields, 'body', ctx);

        const tags: any = getLocalizedField(blog.fields, 'tags', ctx);

        const seoTitle = getSeoValue(seo?.title?.value, title);
        const seoDescription = getSeoValue(seo?.description?.value, summary);
        const seoKeywords = seo?.keywords?.value ? `${seo?.keywords?.value}, ${tags}` : tags;

        const ogTitle = getSeoValue(seo?.['og:title']?.value, seoTitle);
        const ogDescription = getSeoValue(seo?.['og:description']?.value, seoDescription);

        const canonical =
          seo?.canonical?.value ??
          `${'https//lastrev.com'}${createPath('blog', getLocalizedField(blog.fields, 'slug', ctx))}`;
        const blogDefaultDescription =
          body.content[0].content[0].value ?? 'Thought leadership on technology, content management and engineering';

        return {
          ...seo,
          'title': {
            name: 'title',
            value: seoTitle ?? 'Last Rev Blog'
          },
          'og:title': {
            name: 'og:title',
            value: ogTitle ?? 'Last Rev Blog'
          },
          'description': {
            name: 'description',
            value: seoDescription ?? blogDefaultDescription
          },
          'og:description': {
            name: 'og:description',
            value: ogDescription ?? blogDefaultDescription
          },
          'keywords': {
            name: 'keywords',
            value: seoKeywords ?? 'Technology, Content Management, Engineering'
          },
          'canonical': {
            name: 'canonical',
            value: canonical
          },
          'og:url': {
            name: 'og:url',
            value: canonical
          },
          'og:type': {
            name: 'og:type',
            value: 'article'
          },
          'og:image': {
            name: 'og:image',
            value: seo?.['og:image']?.value ?? (await mediaFieldResolver({ fields: blog.fields, ctx }))
          }
        };
      }
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
        // Get all topics from this blog and convert them into links
        // const topicsLinks: any = getLocalizedField(blog.fields, 'topics', ctx);
        // if (topicsLinks) {
        //   const topics = await ctx.loaders.entryLoader.loadMany(
        //     topicsLinks?.map((topic: any) => ({ id: topic?.sys?.id, preview: !!ctx.preview }))
        //   );

        //   const actions = topics?.map((topic: any) =>
        //     !!topic
        //       ? createType('Link', {
        //           id: topic?.sys?.id,
        //           text: getLocalizedField(topic.fields, 'title', ctx),
        //           href: `/blog/${getSlug(topic, ctx)}`
        //         })
        //       : null
        //   ) as any; // any used to allow adding __fieldName__
        //   actions.__fieldName__ = 'topics';
        //   return actions;
        // }
        const slug = createPath('blog', getLocalizedField(blog.fields, 'slug', ctx));
        const link = createType('Link', {
          href: slug,
          text: 'Read more',
          variant: 'text'
        });
        return [link];
      },
      link: async (blog: any, _args: any, ctx: ApolloContext) => {
        const slug = createPath('blog', getLocalizedField(blog.fields, 'slug', ctx));
        const link = createType('Link', {
          href: slug
        });
        return link;
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
