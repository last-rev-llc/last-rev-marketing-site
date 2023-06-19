import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';
import { PageProps } from './Page.types';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import sidekick from '@last-rev/contentful-sidekick-util';

const BackToTop = dynamic(() => import('@last-rev/component-library/dist/components/BackToTop/BackToTop'));

const Page = ({ header, hero, contents, footer, disableBackToTop, sidekickLookup, ...props }: PageProps) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://lastrev.com/blog/',
    'mainEntityOfPage': 'https://lastrev.com/blog',
    'name': 'LastRev Blog',
    'description': 'Thoughts about technology',
    'publisher': {
      '@type': 'Organization',
      '@id': 'https://lastrev.com',
      'name': 'LastRev',
      'logo': {
        '@type': 'ImageObject',
        '@id':
          'https://images.ctfassets.net/imglmb3xms7o/1VUPTATYD3ZMlFk4KQDJxl/12006d2bc2c51df42430a4765aff7042/Lastrev_logotype_trimmed.svg',
        'url':
          'https://images.ctfassets.net/imglmb3xms7o/1VUPTATYD3ZMlFk4KQDJxl/12006d2bc2c51df42430a4765aff7042/Lastrev_logotype_trimmed.svg',
        'width': '344',
        'height': '58'
      }
    }
  };

  const isBlogLanding = props.slug === '/blog';
  /**
   * Filter out hero from card list
   */
  // if (isBlogLanding) {
  //   // NOTE: contents is required
  //   // @ts-ignore
  //   const sections = contents[0]?.contents;
  //   if (sections) {
  //     const collection = sections
  //       ?.find((item: any) => item?.__typename === 'Collection')
  //       .items?.filter((card: any) => card?.id !== hero?.id);
  //     if (collection) {
  //       sections?.forEach((item: any, i: number) => {
  //         if (item?.__typename === 'Collection') sections[i].items = collection;
  //       });
  //     }
  //   }
  // }

  return (
    <>
      {isBlogLanding ? (
        <Head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        </Head>
      ) : null}

      {header ? <ContentModule {...(header as any)} /> : null}

      {hero && !isBlogLanding ? <ContentModule {...(hero as any)} /> : null}

      {hero && isBlogLanding ? <BlogLandingHero {...(hero as any)} /> : null}

      <Main {...sidekick(sidekickLookup, 'contents')}>
        {contents?.map((content: any) => (
          <ContentModule key={content?.id} {...content} component="section" />
        ))}
        {!disableBackToTop ? <BackToTop /> : null}
      </Main>

      {footer ? <ContentModule {...(footer as any)} /> : null}
    </>
  );
};

const Main = styled('main', {
  name: 'Page',
  slot: 'Main',
  overridesResolver: (_, styles) => [styles.root]
})(() => ({}));

const BlogLandingHero = styled(ContentModule, {
  name: 'Page',
  slot: 'BlogLandingHero'
})<{ variant?: string }>(({ theme }) => ({
  'background': `linear-gradient(180deg, ${theme.palette.primary.dark}, ${theme.palette.primary.dark}, ${theme.palette.common.white})`,
  'color': theme.palette.primary.contrastText,

  '[class*=MuiTypography-h2]': {
    marginBottom: '1rem',
    fontSize: '1.25rem',
    fontWeight: 400,
    lineHeight: '1.5rem'
  }
}));

export default Page;
