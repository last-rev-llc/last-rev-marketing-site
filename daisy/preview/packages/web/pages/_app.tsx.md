Document how the provided React file functions as part of a larger application.
"""
import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { ThemeProvider } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@last-rev-marketing-site/components/src/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Open_Sans } from '@next/font/google';
import '@last-rev/component-library/dist/styles.css';
import SEO from '@last-rev/component-library/dist/components/SEO';

// import { LazyMotion } from 'framer-motion';

import { createEmotionCache } from '../src/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();
const openSans = Open_Sans({ subsets: ['latin'] });

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
// const loadFeatures = () => import('../src/features').then((res) => res.default);

// Make sure this URLs matche what font files your site loads
// const FONT_URLS = ['https://fonts.gstatic.com/s/opensans/v29/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-mu0SC55I.woff2'];

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      {pageProps.pageData?.page?.seo ? <SEO seo={pageProps.pageData.page.seo} /> : null}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {!!pageProps.pageData?.page?.seo?.title ? <title>{pageProps.pageData.page.seo.title.value}</title> : null}
        <meta name="contentful_space" content={process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID} />
        <meta name="contentful_environment" content={process.env.NEXT_PUBLIC_CONTENTFUL_ENV} />
      </Head>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png" />
        <link rel="manifest" href="images/site.webmanifest" />
      </Head>
      {process.env.NEXT_PUBLIC_GTM_ID ? (
        <>
          <Head>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
          </Head>
          <Script
            id="GTM_TAG"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `
            }}
          />
          <noscript>
            <iframe
              title="GTM-NOSCRIPT"
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      ) : null}
      <ThemeProvider theme={theme}>
        {/* <LazyMotion strict features={loadFeatures}> */}
        <CssBaseline />
        <div className={openSans.className}>
          <Component {...pageProps} />
        </div>
        {/* </LazyMotion> */}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;

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