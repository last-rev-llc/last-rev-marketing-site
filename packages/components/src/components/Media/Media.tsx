import React from 'react';
import LRMedia, { MediaProps } from '@last-rev/component-library/dist/components/Media';
import { styled } from '@mui/system';
import sidekick from '@last-rev/contentful-sidekick-util';
export type { MediaProps, MediaClassKey, MediaClasses } from '@last-rev/component-library/dist/components/Media';

const isVideo = (src?: string) => src && /mp4|webm/.test(src);

const Media = (props: MediaProps) => {
  if (isVideo(props?.file?.url)) {
    return (
      <VideoRoot
        {...sidekick(props.sidekickLookup)}
        preload="auto"
        data-testid={props.testId || 'Media'}
        {...(props as any)}
        autoPlay={true}
        muted
        loop
        sx={{ width: '100%', height: '100%', ...props.sx }}>
        <source src={props?.file?.url} />
        Your browser does not support the video tag.
      </VideoRoot>
    );
  }
  return <LRMedia {...props} />;
};

const VideoRoot = styled('video', {
  name: 'Media',
  slot: 'VideoRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

export default Media;
