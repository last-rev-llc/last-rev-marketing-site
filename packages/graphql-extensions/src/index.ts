import { compact, map, merge } from 'lodash';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { Source, DocumentNode, GraphQLSchema } from 'graphql';

import {
  Card,
  Header,
  Hero,
  Media,
  NavigationItem,
  Section as LRSection,
  Theme
} from '@last-rev/graphql-contentful-extensions';

import * as Quote from './Quote';
import * as Footer from './Footer';
import * as Section from './Section';
import * as Page from './Page';
import * as PageBlog from './PageBlog';
import * as Collection from './Collection';
import * as RichText from './RichText';
import * as TableOfContents from './TableOfContents';
import * as Link from './Link';

// Uncomment if using Algolia, else delete the related file
// import * as Algolia from './Algolia';

export type GraphQlExtension = {
  typeDefs?: string | DocumentNode | Source | GraphQLSchema;
  resolvers?: {};
  mappers?: {};
  typeMappings?: {};
  pathsConfigs?: {};
};

const extensions: GraphQlExtension[] = [
  Card,
  Collection,
  Header,
  Hero,
  Link,
  Media,
  NavigationItem,
  Page,
  RichText,
  Theme,
  Quote,
  Footer,
  LRSection,
  PageBlog,
  Section,
  TableOfContents
];

export const typeDefs = mergeTypeDefs(compact(map(extensions, 'typeDefs')));
export const resolvers = mergeResolvers(compact(map(extensions, 'resolvers'))) as Record<string, any>;
export const mappers = merge({}, ...compact(map(extensions, 'mappers')));
export const typeMappings = merge({}, ...compact(map(extensions, 'typeMappings')));
export const pathsConfigs = merge({}, ...compact(map(extensions, 'pathsConfigs')));
