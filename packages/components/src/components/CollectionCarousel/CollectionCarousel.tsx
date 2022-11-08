import React from 'react';
import LRCollectionCarousel, {
  CollectionCarouselProps
} from '@last-rev/component-library/dist/components/CollectionCarousel';
export type {
  CollectionCarouselProps,
  CollectionCarouselClassKey,
  CollectionCarouselClasses
} from '@last-rev/component-library/dist/components/CollectionCarousel';
import { Box } from '@mui/system';

import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const CollectionCarousel = (props: CollectionCarouselProps) => {
  return (
    <Box py={[3, 2]}>
      <LRCollectionCarousel
        {...props}
        CarouselVariantProps={{
          carousel: {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 80,
            pagination: false,
            navigation: false,
            speed: 10000,
            autoplay: {
              delay: 1,
              disableOnInteraction: false
            },
            breakpoints: {
              684: {
                slidesPerView: 1
              },
              780: {
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
    </Box>
  );
};

export default CollectionCarousel;
