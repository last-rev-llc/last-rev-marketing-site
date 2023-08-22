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
  if (isBlogLanding) {
    // NOTE: contents is required
    // @ts-ignore
    const sections = contents[0]?.contents;
    if (sections) {
      const collection = sections
        ?.find((item: any) => item?.__typename === 'Collection')
        .items?.filter((card: any) => card?.id !== hero?.id);
      if (collection) {
        sections?.forEach((item: any, i: number) => {
          if (item?.__typename === 'Collection') sections[i].items = collection;
        });
      }
    }
  }

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
      <Main
        {...sidekick({ ...sidekickLookup, fieldName: 'contents' })}
        className={isBlogLanding ? 'blogLanding' : undefined}>
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
  // })``;
})<{}>(({ theme }) => ({
  '&.blogLanding': {
    '[variant=collection_three-per-row_section-wrapper]': {
      background: '#FFFBFF'
    },
    [theme.breakpoints.up('md')]: {
      '[variant=three-per-row]': {
        paddingLeft: 0,
        paddingRight: 0
      }
    },
    [theme.breakpoints.down('md')]: {
      '[class$=Collection-root]': {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
      }
    },
    '[class*=Section-gridContainer]': {
      gap: theme.spacing(2)
    },
    '[class*=Collection-introText] h2': {
      padding: `${theme.spacing(4)} 0 0`,
      fontSize: '3rem',
      lineHeight: '3.5rem'
    },
    '[class$=Card-root]': {
      'display': 'flex',
      'flexDirection': 'column',
      'background': theme.palette.common.white,
      'borderRadius': theme.shape.borderRadius + 4,
      'transition': 'background-color 0.25s linear',

      '&:hover': {
        // @ts-ignore
        backgroundColor: theme.palette.backgroundOption.light,
        transition: 'background-color 0.25s linear'
      },

      'h3': {
        color: theme.palette.common.black,
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: '2rem'
      },

      '[class$=Text-root]': {
        '[class*=MuiTypography-root]': {
          paddingBottom: 0,
          color: theme.palette.common.black,
          fontSize: '0.9rem',
          fontWeight: 400,
          lineHeight: '1.25rem'
        }
      }
    },

    '[class*=MuiCardContent-root]:last-child': {
      paddingBottom: theme.spacing(2)
    },

    '[class*=MuiCardMedia-root] img': {
      aspectRatio: '16/9',
      padding: 0
    },

    '[class*=MuiCardActions-root] a': {
      'fontWeight': 600,

      '&:after': {
        content: '""',
        display: 'inline-block',
        width: '0.5em',
        height: '0.5em',
        marginLeft: '0.25rem',
        borderRight: `2px solid ${theme.palette.primary.main}`,
        borderTop: `2px solid ${theme.palette.primary.main}`,
        verticalAlign: 'middle',
        transform: 'rotate(45deg)',
        transition: 'margin 0.2s ease'
      },

      '&:hover:after': {
        marginLeft: '0.4rem',
        transition: 'margin 0.2s ease'
      }
    }
  }
}));

const BlogLandingHero = styled(ContentModule, {
  name: 'Page',
  slot: 'BlogLandingHero'
})<{ variant?: string }>(() => ({
  // 'background': theme.palette.primary.dark,
  // 'color': theme.palette.primary.contrastText,

  '[class*=MuiTypography-h2]': {
    marginBottom: '1rem',
    fontSize: '1.25rem',
    fontWeight: 400,
    lineHeight: '1.5rem'
  }
}));

export default Page;
