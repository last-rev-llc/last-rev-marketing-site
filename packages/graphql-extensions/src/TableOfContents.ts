import gql from 'graphql-tag';
import { NonRelativeModuleNameResolutionCache } from 'typescript';

export const typeDefs = gql`
  type Heading {
    level: Int
    text: String
    id: String
  }

  extend type TableOfContents {
    content: [Heading]
  }
`;

type Heading = {
  level: number;
  text: string;
  id: string;
};

export const mappers = {
  TableOfContents: {
    TableOfContents: {
      content: async (item: any, _: NonRelativeModuleNameResolutionCache) => {
        const richText = item.__richTextJson;
        const headings: Heading[] = [];

        richText.content.forEach((node: any) => {
          if (node.nodeType.startsWith('heading')) {
            const level = parseInt(node.nodeType.slice(-1), 10);
            const text = node.content[0].value;
            const id = node.data?.id;

            headings.push({ level, text, id });
          }
        });
        return headings;
      }
    }
  }
};
