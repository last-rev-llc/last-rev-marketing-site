import { Collection_BaseFragmentFragment } from '@last-rev-marketing-site/graphql-sdk';
import { CollectionVariants } from '../Collection/Collection.types';
export interface CollectionCarouselProps extends Collection_BaseFragmentFragment {
  variant?: CollectionVariants;
}

export interface CollectionCarouselClasses {
  root: string;
  contentContainer: string;
  introText: string;
  itemsContainer: string;
  item: string;
  actionsContainer: string;
  action: string;
  carouselContainer: string;
  carouselItem: string;
}

export declare type CollectionCarouselClassKey = keyof CollectionCarouselClasses;
