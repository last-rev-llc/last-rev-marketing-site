import { MediaProps } from '../Media';
import { CollectionProps } from '../Collection';

export interface FooterProps {
  logo?: MediaProps;
  logoUrl?: string;
  navigationItems?: CollectionProps[];
  sidekickLookup: any;
  brandAndYear?: string;
}

export interface FooterClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type FooterClassKey = keyof FooterClasses;
