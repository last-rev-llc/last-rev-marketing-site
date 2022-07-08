import { Quote_BaseFragmentFragment } from '@last-rev-marketing-site/graphql-sdk/dist';

export interface QuoteProps extends Quote_BaseFragmentFragment {
  variant?: 'one-column' | 'two-column';
}

export interface QuoteClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the authorRoot element. */
  authorRoot: string;
  /** Styles applied to the mediaItem element. */
  mediaItem: string;
  /** Styles applied to the authorImage element. */
  authorImage: string;
  /** Styles applied to the quoteText element. */
  quoteText: string;
  /** Styles applied to the authorName element. */
  authorName: string;
  /** Styles applied to the quoteSymbol element. */
  quoteSymbol: string;
  /** Styles applied to the authorTitle element. */
  authorTitle: string;
  /** Styles applied to the actionsRoot element. */
  actionsRoot: string;
}

export declare type QuoteClassKey = keyof QuoteClasses;
declare const accordionClasses: QuoteClasses;
export default accordionClasses;
