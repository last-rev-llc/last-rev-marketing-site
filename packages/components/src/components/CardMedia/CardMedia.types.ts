import { Card_BaseFragmentFragment } from '@last-rev-marketing-site/graphql-sdk/dist';

type CardMediaVariants = 'mediaFill' | 'mediaContained' | 'mediaSquare' | undefined;

export interface CardMediaProps extends Card_BaseFragmentFragment {
  loading?: boolean;
  variant?: CardMediaVariants;
  colorScheme?: string;
  position?: number;
  isFirst?: Boolean;
}

export interface CardMediaClasses {
  root: string;
  cardLink: string;
  cardMedia: string;
}

export declare type CardMediaClassKey = keyof CardMediaClasses;
