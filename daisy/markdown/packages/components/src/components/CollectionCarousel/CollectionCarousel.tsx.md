import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import styled from '@mui/system/styled';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, A11y } from 'swiper';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import sidekick from '@last-rev/contentful-sidekick-util';
import { CollectionCarouselProps } from './CollectionCarousel.types';

export const CollectionCarousel = ({
  items,
  variant,
  itemsWidth,
  itemsVariant,
  sidekickLookup
}: CollectionCarouselProps) => {
  const [carouselLoaded, setCarouselLoaded] = useState(false);

  useEffect(() => {
    setCarouselLoaded(true);
  }, []);

  if (!items?.length) return null;
  const itemsWithVariant = items.map((item: any) => ({ ...item, variant: itemsVariant ?? item?.variant }));

  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        variant={variant}
        style={!carouselLoaded ? { opacity: 0 } : undefined}
        data-testid="CollectionCarousel">
        <ContentContainer maxWidth={itemsWidth} disableGutters>
          <CarouselContainer
            modules={[Autoplay, A11y]}
            {...{
              loop: true,
              slidesPerView: 4,
              spaceBetween: 80,
              loopedSlides: items?.length,
              pagination: false,
              navigation: false,
              speed: 10000,
              autoplay: {
                delay: 1,
                disableOnInteraction: false
              },
              breakpoints: {
                684: {
                  slidesPerView: 1,
                  spaceBetween: 40
                },
                780: {
                  slidesPerView: 2,
                  spaceBetween: 80
                },
                1024: {
                  slidesPerView: 3
                },
                1440: {
                  slidesPerView: 4
                }
              }
            }}>
            {itemsWithVariant.map((item: any, idx: number) => (
              <SwiperSlide key={idx}>
                <CarouselItem>
                  <ContentModule {...item} />
                </CarouselItem>
              </SwiperSlide>
            ))}
          </CarouselContainer>
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'CollectionCarousel',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

const ContentContainer = styled(Container, {
  name: 'CollectionCarousel',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(() => ({}));

const CarouselContainer = styled(Swiper, {
  name: 'CollectionCarousel',
  slot: 'CarouselContainer',
  overridesResolver: (_, styles) => [styles.carouselContainer]
})<{ variant?: string }>(({ theme }) => ({
  'width': '100%',
  'overflow': 'hidden',
  [theme.breakpoints.down('sm')]: {
    minWidth: 'calc(200vw - 20%)'
  },
  '--swiper-theme-color': theme.palette.primary.main,
  '& > .swiper-pagination-bullets span.swiper-pagination-bullet': {
    margin: '0 10px'
  },
  '& .swiper-pagination-bullet': {
    width: 10,
    height: 10
  },
  '& .swiper-button-prev, .swiper-button-next': {
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  },
  '& .swiper-wrapper': {
    alignItems: 'center'
  }
}));

const CarouselItem = styled(Box, {
  name: 'CollectionCarousel',
  slot: 'CarouselItem',
  overridesResolver: (_, styles) => [styles.carouselItem]
})<{ variant?: string }>(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
}));

export default CollectionCarousel;
