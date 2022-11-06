import React from 'react';
import LRCollectionCarousel, {
  CollectionCarouselProps
} from '@last-rev/component-library/dist/components/CollectionCarousel';
export type {
  CollectionCarouselProps,
  CollectionCarouselClassKey,
  CollectionCarouselClasses
} from '@last-rev/component-library/dist/components/CollectionCarousel';

import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Autoplay]);

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
          speed: 10000,
          autoplay: {
            delay: 1,
            disableOnInteraction: false
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
