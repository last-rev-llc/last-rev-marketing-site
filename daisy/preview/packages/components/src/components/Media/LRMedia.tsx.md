Document how the provided React file functions as part of a larger application.
"""
import React from 'react';
import styled from '@mui/system/styled';
import { MediaProps } from '@last-rev/component-library/dist/components/Media';
import { useAmp } from 'next/amp';
import ErrorBoundary from '../ErrorBoundary';
import Image from '../Image';
// import ArtDirectedImage from '../ArtDirectedImage';
import sidekick from '@last-rev/contentful-sidekick-util';

import useThemeProps from '../../utils/useThemeProps';
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
        <EmbedRoot
          {...sidekick(sidekickLookup)}
          {...(props as React.IframeHTMLAttributes<any>)}
          src={image?.url}
          sx={{ width: '100%', height: '100%', ...props.sx }}
          data-testid={testId || 'Media'}
        />
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

"""
Describe how the file interacts with other components in the application.
Identify whether the component is a server or client-side component.
Create a markdown table listing all the props used by this component.
Provide detailed descriptions of user interaction and how the component handles state.
Describe all sub-components and their interactions with this component.
List out any questions developers may have while working on this codebase that relate to this file.
List out any known issues or bugs with the component and any todo items that need to be addressed.
Template:
Summary:
<brief overview of the file and all its major components>

Import statements:
<describe the imports and dependencies>

Component:
<Summary of component>

Hooks:
<list of hooks with descriptions>

Event Handlers:
<list of Event Handlers with descriptions>

Rendered components:
<list of Rendered components with descriptions>

Interaction Summary:
<a summary of how the file could interact with the rest of the application>

Developer Questions:
<a list of questions Developers working with this component may have the following questions when debugging>