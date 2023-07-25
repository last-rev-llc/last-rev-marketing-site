Document how the provided React file functions as part of a larger application.
"""
import React from 'react';
// import Head from 'next/head';
import NextImage from 'next/image';
import ErrorBoundary from '../ErrorBoundary';
// import getImgSrcTag from '../../utils/getImgSrcTag';
import { ImageProps } from './Image.types';

const Image = React.forwardRef<any, ImageProps>((props, ref) => {
  const {
    src,
    className,
    media,
    columns = 12,
    priority = true,
    itemProp,
    testId,
    disableInlineSVG,
    nextImageOptimization,
    q,
    unoptimized,
    width,
    height,
    alt,
    ...imageProps
  } = props;
  if (!src) return null;
  // const imgPreload = React.useMemo(
  //   () => (
  //     <Head>
  //       <link
  //         rel="preload"
  //         href={src}
  //         // @ts-ignore
  //         imagesrcset={getImgSrcTag({ src, numColumns: columns, q, unoptimized })?.srcSet}
  //         as="image"
  //         media={media}
  //       />
  //     </Head>
  //   ),
  //   [src, columns, q, unoptimized]
  // );
  const imgContent = React.useMemo(() => {
    const isSVG = src?.endsWith('.svg');

    let content;
    if (isSVG && !disableInlineSVG && imageProps.svgContent) {
      content = (
        <>
          <svg
            ref={ref}
            className={className}
            data-testid={testId}
            height={height}
            width={width}
            focusable={false}
            role="img"
            // TODO: Figure out better a11y support for svg
            dangerouslySetInnerHTML={{ __html: `<title>${alt}</title>${imageProps.svgContent}` }}
          />
        </>
      );
    } else if (!isSVG && nextImageOptimization) {
      content = (
        <NextImage
          src={src}
          // TODO: NextImage doesn't support ref
          // ref={ref}
          data-testid={testId}
          className={className}
          itemProp={itemProp}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          height={height}
          width={width}
          sizes={imageProps.sizes}
          alt={alt}
        />
      );
    } else {
      content = (
        <>
          <img
            src={src}
            ref={ref}
            data-testid={testId}
            className={className}
            itemProp={itemProp}
            loading={priority ? 'eager' : 'lazy'}
            height={height}
            width={width}
            alt={alt}
            {...imageProps}
          />
          {/* {imgPreload} */}
        </>
      );
    }
    return content;
  }, [props]);

  return <ErrorBoundary>{imgContent}</ErrorBoundary>;
});

export default Image;

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