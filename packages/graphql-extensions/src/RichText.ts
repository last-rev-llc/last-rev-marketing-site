import { RichText } from '@last-rev/graphql-contentful-extensions';
import createHeadingId from './utils/createHeadingId';

export const mappers = {
  RichText: {
    RichText: {
      json: async (raw: any, args: any, ctx: any, info: any) => {
        const json = await (RichText.mappers.RichText.RichText.json as Function)(raw, args, ctx, info);

        json.content.forEach((node: any) => {
          if (node.nodeType.startsWith('heading')) {
            console.log('found heading');
            node.data.id = createHeadingId(node.content?.[0]?.value);
          }
        });

        return json;
      },
      links: async (raw: any, args: any, ctx: any, info: any) => {
        const { assets, entries } = await (RichText.mappers.RichText.RichText.links as Function)(raw, args, ctx, info);
        const json = await (RichText.mappers.RichText.RichText.json as Function)(raw, args, ctx, info);

        return {
          assets,
          entries: (await Promise.all(entries)).map((e: any) => {
            if (e.sys?.contentType?.sys?.id === 'tableOfContents') {
              console.log('setting json here');
              e.__richTextJson = json;
            }
            return e;
          })
        };
      }
    }
  }
};
