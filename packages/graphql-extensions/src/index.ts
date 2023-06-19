import merge from 'lodash/merge';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { Source, DocumentNode, GraphQLSchema } from 'graphql';

import {
  Card,
  Collection,
  Hero,
  Media,
  NavigationItem,
  Page,
  Section,
  Theme
} from '@last-rev/graphql-contentful-extensions';

import * as ModuleIntegration from './ModuleIntegration';
import * as Quote from './Quote';
import * as Block from './Block';
import * as GlobalFooter from './GlobalFooter';
import * as SectionCustom from './Section';
import * as Header from './Header';
import * as PageCustom from './Page';
import * as MediaCustom from './Media';
import * as NavigationItemCustom from './NavigationItem';
import * as PageBlog from './PageBlog';
import * as Topic from './Topic';
import * as Person from './Person';
import * as CollectionCustom from './Collection';
import * as RichText from './RichText';
import * as TableOfContents from './TableOfContents';
import * as Link from './Link';
import * as CardCustom from './Card';
import * as Text from './Text';

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
  Block,
  Card,
  CardCustom,
  Collection,
  CollectionCustom,
  Header,
  Hero,
  Link,
  Media,
  MediaCustom,
  ModuleIntegration,
  NavigationItem,
  NavigationItemCustom,
  Page,
  Person,
  RichText,
  Theme,
  Quote,
  GlobalFooter,
  Section,
  PageBlog,
  PageCustom,
  TableOfContents,
  SectionCustom,
  Text,
  Topic
];

export const typeDefs = mergeTypeDefs(extensions.map((e) => e.typeDefs).filter((t) => !!t) as any[]);

export const resolvers = mergeResolvers(extensions.map((e) => e.resolvers).filter((t) => !!t) as any[]) as Record<
  string,
  any
>;

export const mappers = merge({}, ...(extensions.map((e) => e.mappers).filter((t) => !!t) as any[]));

export const typeMappings = merge({}, ...(extensions.map((e) => e.typeMappings).filter((t) => !!t) as any[]));

export const pathsConfigs = merge({}, ...(extensions.map((e) => e.pathsConfigs).filter((t) => !!t) as any[]));
