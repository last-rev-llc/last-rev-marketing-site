import React from 'react';
import styled from '@mui/system/styled';
import { MediaProps } from '@last-rev/component-library/dist/components/Media';
import { useAmp } from 'next/amp';
import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
// import ArtDirectedImage from '../ArtDirectedImage';
import sidekick from '@last-rev/contentful-sidekick-util';

import useThemeProps from '../../utils/useThemeProps';
import Box from '@mui/material/Box';
// import dynamic from 'next/dynamic';

// const Image = dynamic(() => import('../Image'));
// const ArtDirectedImage = dynamic(() => import('../ArtDirectedImage'));

const Media = (inProps: MediaProps) => {
  const isAmp = useAmp();
  const props = useThemeProps({
    name: 'Media',
    props: inProps
  });
  const { variant, file, title, fileMobile, fileTablet, testId, sidekickLookup, nextImageOptimization, ...other } =
    props;
  // TODO: Add support for video
  const image = file;
  const alt = title;

  if (variant === 'embed' && isAmp) {
    return (
      <ErrorBoundary>
        {/* @ts-expect-error */}
        <amp-iframe
          {...sidekick(sidekickLookup)}
          src={image?.url}
          data-testid={testId || 'Media'}
          width={image?.width ?? 800}
          height={image?.height ?? 400}
          layout="responsive"
          sandbox="allow-scripts allow-same-origin"
        />
      </ErrorBoundary>
    );
  }

  if (variant === 'embed') {
    return (
      <ErrorBoundary>
        <EmbedRootWrap>
          <EmbedRoot
            {...sidekick(sidekickLookup)}
            {...(props as React.IframeHTMLAttributes<any>)}
            src={image?.url}
            sx={{ width: '100%', height: '100%', ...props.sx }}
            data-testid={testId || 'Media'}
          />
        </EmbedRootWrap>
      </ErrorBoundary>
    );
  }

  if (variant === 'video') {
    return (
      <ErrorBoundary>
        <VideoRoot
          {...sidekick(sidekickLookup)}
          preload="auto"
          data-testid={testId || 'Media'}
          {...(props as any)}
          sx={{ width: '100%', height: '100%', ...props.sx }}>
          <source src={file?.url} />
          Your browser does not support the video tag.
        </VideoRoot>
      </ErrorBoundary>
    );
  }
  // if (fileTablet || fileMobile) {
  //   return (
  //     <ErrorBoundary>
  //       <ArtDirectedRoot
  //         {...sidekick(sidekickLookup)}
  //         {...other}
  //         title={title}
  //         file={file}
  //         fileTablet={fileTablet}
  //         fileMobile={fileMobile}
  //         testId={testId || 'Media'}
  //       />
  //     </ErrorBoundary>
  //   );
  // }
  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        {...image}
        {...other}
        nextImageOptimization={nextImageOptimization}
        src={image?.url}
        alt={alt as any}
        testId={testId || 'Media'}
      />
    </ErrorBoundary>
  );
};

// Define the pieces of the Media customizable through Theme

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'fileName' &&
  prop !== 'testId' &&
  prop !== 'priority' &&
  prop !== 'sidekickLookup' &&
  prop !== 'sx' &&
  prop !== 'file' &&
  prop !== 'nextImageOptimization';

const Root = styled(Image, {
  name: 'Media',
  slot: 'Root',
  shouldForwardProp: (prop: string) => prop !== 'variant' && prop !== 'fileName' && prop !== 'sidekickLookup',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

// const ArtDirectedRoot = styled(ArtDirectedImage, {
//   name: 'Media',
//   slot: 'Root',
//   overridesResolver: (_, styles) => [styles.root]
// })<{ variant?: string }>``;

const EmbedRootWrap = styled(Box, {
  name: 'Media',
  slot: 'EmbedRootWrap',
  overridesResolver: (_, styles) => [styles.embedRootWrap]
})<{}>(({ theme }) => ({
  'position': 'relative',
  'paddingBottom': '56.25%', // 16:9 aspect ratio
  'height': 0,
  'overflow': 'hidden',
  'marginTop': theme.spacing(2),
  'marginBottom': theme.spacing(4),

  '& iframe': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
}));

const EmbedRoot = styled('iframe', {
  name: 'Media',
  slot: 'EmbedRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})``;

const VideoRoot = styled('video', {
  name: 'Media',
  slot: 'VideoRoot',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

export default Media;
