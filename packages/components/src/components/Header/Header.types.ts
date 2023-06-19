import { Header_BaseFragmentFragment } from '@answersai-marketing/graphql-sdk';

export interface HeaderProps extends Header_BaseFragmentFragment {
  variant?: 'elevation' | 'outlined' | undefined;
  color?: any;
  colorScheme?: string;
  sidekickLookup?: any;
  menuVisible?: boolean;
  menuBreakpoint?: string;
}

export interface HeaderClasses {
  root: string;
  superNav: string;
  superNavContainer: string;
  supernavIcon: string;
  supernavLink: string;
  logo: string;
  logoRoot: string;
  contentContainer: string;
  contentSpacer: string;
  headerMenuNav: string;
  headerMenuNavItems: string;
  headerMenuNavItem: string;
  headerMenuMobileCtas: string;
  headerMenuMobileCtaItem: string;
  headerMenuCtas: string;
  headerMenuCtaItem: string;
}

export declare type HeaderClassKey = keyof HeaderClasses;
