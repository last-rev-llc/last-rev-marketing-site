// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// require('dotenv').config({path: '.envkey'})
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { createVercelHandler } from '@last-rev/graphql-contentful-core';

import lrConfig from '../../../../lrconfig';

function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse<any>) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS']
  })
);

const handler: NextApiHandler = async (req, res) => {
  await cors(req, res);

  return await createVercelHandler(
    lrConfig.clone({
      contentStrategy: 'cms', // always use cms content strategy for live api,
      cmsCacheStrategy: 'redis',
      apolloServerOptions: {
        introspection: false
      }
    })
  )(req, res);
};

export default handler;
