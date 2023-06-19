import { Page_BaseFragmentFragment } from '@last-rev-marketing-site/graphql-sdk';

export interface PageProps extends Page_BaseFragmentFragment {}

export interface PageClasses {
  root: string;
}

export declare type PageClassKey = keyof PageClasses;
