import { PageBlog_BaseFragmentFragment } from '@last-rev-marketing-site/graphql-sdk';

export interface PageBlogProps extends PageBlog_BaseFragmentFragment {}

export interface PageBlogClasses {
  root: string;
  featuredMedia: string;
  featuredMediaWrap: string;
  creationDate: string;
  title: string;
  summary: string;
  author: string;
  body: string;
  blogCategories: string;
  blogCategory: string;
  tags: string;
  tag: string;
  relatedItems: string;
}

export declare type PageBlogClassKey = keyof PageBlogClasses;
