import { RichText } from '@last-rev/graphql-contentful-extensions';
import merge from 'lodash/merge';
import createHeadingId from './utils/createHeadingId';

export const mappers = merge({}, RichText.mappers, {
  RichText: {
    RichText: {
      json: async (raw: any, args: any, ctx: any, info: any) => {
        const json = await (RichText.mappers.RichText.RichText.json as Function)(raw, args, ctx, info);

        json.content.forEach((node: any) => {
          if (node.nodeType.startsWith('heading')) {
            node.data.id = createHeadingId(node.content?.[0]?.value);
          }
        });

        return json;
      },
      links: async (raw: any, args: any, ctx: any, info: any) => {
        const { assets, entries } = await (RichText.mappers.RichText.RichText.links as Function)(raw, args, ctx, info);

        return {
          assets,
          entries: entries.map((e: any) => {
            if (e.__typename === 'TableOfContents') {
              e.__richTextJson = raw;
            }
            return e;
          })
        };
      }
    }
  }
});
