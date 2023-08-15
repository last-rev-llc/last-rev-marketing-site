import { Page as PageContent } from '@last-rev-marketing-site/graphql-sdk/dist';
export interface PageProps extends PageContent {}

export interface PageClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type PageClassKey = keyof PageClasses;
