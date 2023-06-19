import React from 'react';
import { ContentModule } from '@last-rev/component-library';
import { Page } from '../../../graphql-sdk';
import BackToTop from '@last-rev/component-library/dist/components/BackToTop/BackToTop';
import Head from 'next/head';
import { styled } from '@mui/material/styles';
import sidekick from '@last-rev/contentful-sidekick-util';

const PageTopic = ({
  header,
  hero,
  contents,
  // id,
  // title,
  footer,
  disableBackToTop,
  sidekickLookup,
  slug
}: Page & { __typename: string; title?: string; onClearFilter: any }) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://lastrev.com/blog/', //add topic
    'mainEntityOfPage': `https://lastrev.com/blog/${slug}`,
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

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      {header ? <ContentModule {...(header as any)} /> : null}

      {hero && <BlogLandingHero {...(hero as any)} />}

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

export default PageTopic;
