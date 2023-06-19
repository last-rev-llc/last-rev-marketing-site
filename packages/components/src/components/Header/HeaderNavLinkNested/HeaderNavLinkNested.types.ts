import { NavigationItem_BaseFragmentFragment } from '@answersai-marketing/graphql-sdk';

export interface HeaderNavLinkNestedProps extends NavigationItem_BaseFragmentFragment {
  id?: string;
  sidekickLookup?: any;
  onRequestClose?: any;
  variant?: string;
}

export interface HeaderNavLinkNestedClasses {
  root: string;
  menuRoot: string;
  menuItem: string;
  navItemLink: string;
}

export declare type HeaderNavLinkNestedClassKey = keyof HeaderNavLinkNestedClasses;
