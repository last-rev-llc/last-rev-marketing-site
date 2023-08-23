import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import handleWebhook from '@last-rev/contentful-webhook-handler';
import Cors from 'cors';

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
    methods: ['POST', 'OPTIONS']
  })
);

export const config = {
  api: {
    bodyParser: true
  }
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  try {
    await handleWebhook(
      lrConfig.clone({
        contentStrategy: 'cms',
        cmsCacheStrategy: 'redis'
      }),
      JSON.parse(req.body),
      req.headers as Record<string, string>
    );
    res.status(200).json('Success');
  } catch (err) {
    res.status(400).json(`There was an error, we are on it. ${err}`);
  }
};

export default handler;
