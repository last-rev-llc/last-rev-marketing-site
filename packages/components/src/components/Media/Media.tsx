import React from 'react';
import { MediaProps } from '@last-rev/component-library/dist/components/Media';
import LRMedia from './LRMedia';
import { styled } from '@mui/system';
import sidekick from '@last-rev/contentful-sidekick-util';
export type { MediaProps, MediaClassKey, MediaClasses } from '@last-rev/component-library/dist/components/Media';

const isVideo = (src?: string) => src && /mp4|webm/.test(src);
let lazyVideoObserver: IntersectionObserver | null = null;

const Media = (props: MediaProps) => {
  if (isVideo(props?.file?.url)) {
    const ref = React.useRef<HTMLVideoElement>(null);
    React.useEffect(() => {
      if (ref?.current) {
        if ('IntersectionObserver' in window) {
          if (!lazyVideoObserver) {
            lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
              entries.forEach(function (video) {
                if (video.isIntersecting) {
                  for (var source in video?.target?.children) {
                    var videoSource = video?.target?.children[source as any] as HTMLSourceElement;

                    if (
                      typeof videoSource.tagName === 'string' &&
                      videoSource.tagName === 'SOURCE' &&
                      videoSource?.dataset?.src
                    ) {
                      videoSource.src = videoSource.dataset.src;
                    }
                  }
                  // @ts-ignore
                  video?.target?.load();
                  // @ts-ignore
                  video?.target?.play();
                  if (ref.current) lazyVideoObserver?.unobserve(ref.current);
                }
              });
            });
          }
          // console.log('OBserve', ref?.current);

          lazyVideoObserver.observe(ref?.current);
        }
      }
    }, [ref]);

    return (
      <VideoRoot
        ref={ref}
        {...sidekick(props.sidekickLookup)}
        preload="auto"
        data-testid={props.testId || 'Media'}
        {...(props as any)}
        autoPlay={true}
        muted
        loop
        playsinline={true}
        sx={{ width: '100%', height: '100%', ...props.sx }}>
        <source data-src={props?.file?.url} />
        Your browser does not support the video tag.
      </VideoRoot>
    );
  }
  return <LRMedia {...props} sx={{ maxWidth: `${props?.file?.width}px` }} />;
};

const VideoRoot = styled('video', {
  name: 'Media',
  slot: 'VideoRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>``;

export default Media;
