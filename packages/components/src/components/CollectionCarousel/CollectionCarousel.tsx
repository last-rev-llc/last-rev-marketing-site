import React from 'react';
import LRCollectionCarousel, {
  CollectionCarouselProps
} from '@last-rev/component-library/dist/components/CollectionCarousel';
export type {
  CollectionCarouselProps,
  CollectionCarouselClassKey,
  CollectionCarouselClasses
} from '@last-rev/component-library/dist/components/CollectionCarousel';

const CollectionCarousel = (props: CollectionCarouselProps) => {
  return (
    <LRCollectionCarousel
      {...props}
      CarouselVariantProps={{
        carousel: {
          loop: true,
          slidesPerView: 2,
          spaceBetween: 80,
          pagination: false,
          navigation: false,
          // autoplay is not working properly
          speed: 500,
          autoplay: {
            delay: 500
          },
          breakpoints: {
            684: {
              slidesPerView: 2
            },
            1024: {
              slidesPerView: 3
            },
            1440: {
              slidesPerView: 4
            }
          }
        }
      }}
    />
  );
};

export default CollectionCarousel;
