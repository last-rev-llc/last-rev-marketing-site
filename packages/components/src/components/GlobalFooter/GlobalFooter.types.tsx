import { MediaProps } from '../Media';
import { CollectionProps } from '../Collection/Collection.types';

export interface GlobalFooterProps {
  logo?: MediaProps;
  logoUrl?: string;
  navigationItems?: [CollectionProps];
  sidekickLookup: any;
  brandAndYear?: string;
}

export interface GlobalFooterClasses {
  /** Styles applied to the root element. */
  root: string;
}

export declare type GlobalFooterClassKey = keyof GlobalFooterClasses;
