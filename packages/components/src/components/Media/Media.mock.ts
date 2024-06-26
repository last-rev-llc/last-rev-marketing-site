import { lorem } from 'faker';
import { MediaProps } from './Media';

export const mediaMock = (): MediaProps => ({
  file: {
    url: './marketly-logo.jpeg',
    width: 920,
    height: 613
  },
  title: lorem.sentence(),
  description: lorem.sentence()
});

export const mediaVideoMock = {
  __typename: 'Media',
  id: lorem.word(),
  variant: 'embed',
  title: 'Netlify Vimeo video',
  file: {
    url: 'https://player.vimeo.com/video/677844564'
  },
  controls: true
};

export const assetMock = () => ({
  __typename: 'Media',
  id: lorem.word(),
  file: fileMock(),
  title: lorem.sentence(),
  description: lorem.sentence()
});

export const fileMock = () => ({
  url: `/testImage-${Date.now().toString()}-${lorem.word()}-${lorem.word()}/cmp.png?h=180&r=180`,
  width: 180,
  height: 180
});

export const responsiveMediaMock = {
  __typename: 'Media',
  id: lorem.word(),
  file: {
    url: './flower-large.png',
    width: '1728px',
    height: '1152px'
  },
  fileTablet: {
    url: './flower-medium.jpg',
    width: 920,
    height: 613
  },
  fileMobile: {
    url: './flower-small.jpg',
    width: 540,
    height: 540
  },
  title: lorem.sentence(),
  description: lorem.sentence()
};

export const SVGMediaMock = {
  __typename: 'Media',
  id: lorem.word(),
  file: {
    url: './logo.svg',
    width: 1728,
    height: 1152
  },

  title: lorem.sentence(),
  description: lorem.sentence()
};

export const ExternalSVGMediaMock = {
  __typename: 'Media',
  id: lorem.word(),
  file: {
    url: './logo.svg',
    width: 1728,
    height: 1152
  },
  disableInlineSVG: true,
  title: lorem.sentence(),
  description: lorem.sentence()
};
