import { TableOfContents_BaseFragmentFragment } from '@last-rev-marketing-site/graphql-sdk';

export interface TableOfContentsProps extends TableOfContents_BaseFragmentFragment {}

export interface TableOfContentsClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type TableOfContentsClassKey = keyof TableOfContentsClasses;
