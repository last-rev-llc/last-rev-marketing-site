import { MediaProps } from '../Media';
import { LinkProps } from '../Link';

export interface PageBlogProps {
  variant?: 'default' | 'text-image';
  __typename?: string;
  sidekickLookup?: any;
  title?: string;
  creationDate?: string;
  slug?: string;
  featuredMedia?: Array<MediaProps>;
  author?: any;
  body?: any;
  quote?: string;
  tagsText?: Array<string>;
  relatedLinks?: LinkProps[];
  contents?: any;
  header: any;
  footer: any;
  topics?: any;
  landingPageSummary?: string;
  seo: any;
}

export interface PageBlogClasses {
  /** Styles applied to the root element. */
  root: string;
  blogHero: string;
  blogInfo: string;
  contentContainer: string;
  mediaWrap: string;
  contentsWrapper: string;
  blogTitle: string;
  authorTypography: string;
  bodyText: string;
}

export declare type PageBlogClassKey = keyof PageBlogClasses;
