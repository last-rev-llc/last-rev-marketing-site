require('dotenv').config();

const LastRevAppConfig = require('@last-rev/app-config');
const extensions = require('./packages/graphql-extensions/dist');
const { resolve } = require('path');

const testForEnvVar = (name) => {
  const envVar = process.env[name];
  if (!envVar) {
    throw Error(`Environment variable ${name} is required`);
  }
  return envVar;
};

const parseNumberEnvVar = (value = '') => {
  if (!value.length) return undefined;
  const result = parseInt(value, 10);
  return isNaN(result) ? undefined : result;
};

const parseBooleanEnvVar = (value) => {
  const val = value ? value.toString().toLowerCase() : '';
  return /^(true|1|yes|y)$/.test(val);
};

const spaceId = testForEnvVar('CONTENTFUL_SPACE_ID');
const contentDeliveryToken = testForEnvVar('CONTENTFUL_DELIVERY_TOKEN');
const contentPreviewToken = testForEnvVar('CONTENTFUL_PREVIEW_TOKEN');
const env = testForEnvVar('CONTENTFUL_ENV');
const usePreview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW) || false;

const config = new LastRevAppConfig({
  cms: 'Contentful',
  strategy: 'redis',
  contentStrategy: 'fs',
  cmsCacheStrategy: 'redis',
  sites: [process.env.SITE],
  extensions,
  contentful: {
    contentPreviewToken,
    contentDeliveryToken,
    spaceId,
    env,
    usePreview,
    maxBatchSize: parseNumberEnvVar(process.env.CONTENTFUL_MAX_BATCH_SIZE)
  },
  algolia: {
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
    contentTypeIds: ['blog'],
    indexDraftContent: parseBooleanEnvVar(process.env.ALGOLIA_INDEX_DRAFT_CONTENT)
  },
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
  sitemap: {
    domain: `${process.env.DOMAIN}`,
    excludePages: ['error_404']
  }
});

module.exports = config;
