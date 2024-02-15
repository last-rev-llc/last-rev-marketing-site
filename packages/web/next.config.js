const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@last-rev-marketing-site/components',
  '@last-rev/component-library'
]);
const { getWinstonLogger } = require('@last-rev/logging');

const logger = getWinstonLogger({
  package: 'web',
  module: 'next.config'
});

// Allow bundle analysis via ANALYZE_BUNDLE env variable
const enableAnalyzer = !!(process.env.ANALYZE_BUNDLE && process.env.ANALYZE_BUNDLE.toLowerCase() === 'true');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: enableAnalyzer
});

const ContentSecurityPolicy = `
  default-src 'self' *.sentry.io app.netlify.com *.netlify.app *.vercel.app *.s3.amazonaws.com *.hubapi.com *.hsforms.com *.hs-scripts.com *.hsforms.net *.hscollectedforms.net *.facebook.com *.google-analytics.com *.googleoptimize.com *.googletagmanager.com *.hs-scripts.com code.jquery.com *.hsforms.net;
  style-src 'self' 'unsafe-inline' *.hs-scripts.com *.hsforms.net *.sentry.io fonts.googleapis.com;
  script-src 'unsafe-eval' 'self' 'unsafe-inline' *.sentry.io app.netlify.com *.netlify.app *.vercel.app *.hs-analytics.net *.hs-banner.com *.hsadspixel.net *.hscollectedforms.net analytics.google.com *.google-analytics.com *.googletagmanager.com *.googleoptimize.com *.jquery.com *.hs-scripts.com *.hsforms.net *.googletagmanager.com *.hs-scripts.com code.jquery.com *.hsforms.net;
  font-src 'self' *.sentry.io *.hs-scripts.com *.hsforms.net fonts.gstatic.com data:;
  worker-src data: 'self' blob:;
  frame-src 'self' https://calendly.com https://forms.hsforms.com *.youtube.com;
  img-src * data:;
  media-src * data:;
  object-src 'none';
  frame-ancestors 'self' https://app.contentful.com https://lastrev.com https://lr-live-editor.netlify.app;
`;

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  },
  // {
  //   key: 'X-Frame-Options',
  //   value: 'SAMEORIGIN'
  // },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

const hasAllSentryVars = !!(
  process.env.SENTRY_PROJECT &&
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_URL &&
  process.env.SENTRY_ORG &&
  process.env.NEXT_PUBLIC_SENTRY_DSN
);

if (!hasAllSentryVars) {
  logger.warn('Sentry is disabled.  Please check your environment variables.');
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const nextConfig = {
  ...(process.env.NODE_ENV === 'production' && {
    async headers() {
      return [
        {
          // Apply these headers to all routes in your application.
          source: '/:path*',
          headers: securityHeaders
        },
        {
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
            {
              key: 'Access-Control-Allow-Headers',
              value:
                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
            }
          ]
        }
      ];
    }
  }),
  /**
   * @type {import('next').NextConfig}
   */
  experimental: {},
  i18n: {
    // TODO: generate these and read from that
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  reactStrictMode: true,
  env: {
    CONTENTFUL_SETTINGS_ID: process.env.CONTENTFUL_SETTINGS_ID,
    GRAPHQL_SERVER_URL: process.env.GRAPHQL_SERVER_URL,
    CONTENTFUL_USE_PREVIEW: process.env.CONTENTFUL_USE_PREVIEW,
    SITE: process.env.SITE,
    SITE_SETTINGS: process.env.SITE_SETTINGS,
    DEFAULT_SITE_ID: process.env.DEFAULT_SITE_ID || process.env.SITE_ID,
    SITE_ID: process.env.DEFAULT_SITE_ID || process.env.SITE_ID,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
    CONTENTFUL_ENV: process.env.CONTENTFUL_ENV,
    DEPLOY_URL: process.env.DEPLOY_URL,
    VERCEL_URL: process.env.VERCEL_URL
  },
  productionBrowserSourceMaps: enableAnalyzer,
  images: {
    domains: ['images.ctfassets.net', 'videos.ctfassets.net'],
    // Disabled as it's timing out on Netlify
    // formats: ['image/avif', 'image/webp']
    formats: ['image/webp'],
    loader: 'custom',
    loaderFile: './src/contentfulLoader.ts'
  },
  sentry: {
    disableServerWebpackPlugin: !hasAllSentryVars,
    disableClientWebpackPlugin: !hasAllSentryVars,
    hideSourceMaps: true,
    widenClientFileUpload: true
  },
  webpack: (config, { webpack }) => {
    // Important: return the modified config
    config.resolve.alias = {
      ...config.resolve.alias,
      'react': path.resolve(__dirname, '../../node_modules', 'react'),
      '@emotion/react': path.resolve(__dirname, '../../node_modules', '@emotion/react'),
      '@mui': path.resolve(__dirname, '../../node_modules/@mui')
    };
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false
      })
    );
    return config;
  }
};

const plugins = [[withTM], withBundleAnalyzer];

if (process.env.NODE_ENV === 'production') {
  plugins.push([withSentryConfig, sentryWebpackPluginOptions]);
}

module.exports = withPlugins(plugins, nextConfig);
