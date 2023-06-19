import { Person_BaseFragmentFragment } from '@last-rev-marketing-site/graphql-sdk';

export interface PersonProps extends Person_BaseFragmentFragment {}

export interface PersonClasses {
  root: string;
  featuredMedia: string;
  name: string;
  jobTitle: string;
  email: string;
  body: string;
}

export declare type PersonClassKey = keyof PersonClasses;
