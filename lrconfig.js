require('dotenv').config();

const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');

const extensions = require('@last-rev-marketing-site/graphql-extensions');
const { resolve } = require('path');
const LastRevAppConfig = require('@last-rev/app-config');
// TODO extract this function into a package that doesnt required the runner
// const { parseBooleanEnvVar } = require('@last-rev-marketing-site/utils');
const parseBooleanEnvVar = (value = '') => {
  // values parsed as true: true, 1, yes, y, => ignore caps
  const val = value.toString().toLowerCase();
  return /^(true|1|yes|y)$/.test(val);
};

const parseNumberEnvVar = (value = '') => {
  if (!value.length) return undefined;
  const result = parseInt(value, 10);
  return Number.isNaN(result) ? undefined : result;
};

const config = new LastRevAppConfig({
  cms: 'Contentful',
  contentStrategy: 'fs',
  sites: [process.env.SITE],
  extensions,
  graphql: { port: 5000 },
  contentful: {
    contentPreviewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    contentDeliveryToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    env: process.env.CONTENTFUL_ENV,
    usePreview: parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW),
    maxBatchSize: parseNumberEnvVar(process.env.CONTENTFUL_MAX_BATCH_SIZE)
  },
  // algolia: {
  //   applicationId: process.env.ALGOLIA_APPLICATION_ID,
  //   adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
  //   contentTypeIds: ['blog'],
  //   indexDraftContent: parseBooleanEnvVar(process.env.ALGOLIA_INDEX_DRAFT_CONTENT)
  // },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
    tls: {},
    maxBatchSize: parseNumberEnvVar(process.env.REDIS_MAX_BATCH_SIZE)
  },
  fs: { contentDir: resolve(__dirname, './packages/graphql-runner/cms-sync') },
  logLevel: 'debug',
  features: {
    disableCoreSidekickLookup: true
  },
  apolloServerOptions: {
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
  }
});

module.exports = config;
