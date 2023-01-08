import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import axios from 'axios';

axios.defaults.baseURL = `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENV}`;

axios.defaults.headers['Authorization'] = `Bearer ${process.env.CONTENTFUL_CMA_TOKEN}`;

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

interface CreateRequest {
    contentType: string;
    id: string;
    fieldData: any;
    secretToken: string;
  }

// Take a contentful entry and patch the entriy using contentful management api
const handler: NextApiHandler = async (req, res) => {
  await cors(req, res);

  const { contentType, id, fieldData } = req.body as CreateRequest;
//   const secretToken = (req.headers['authorization'] as string)?.split('Bearer ')[1];

//   if (!secretToken || secretToken !== process.env.SECRET_TOKEN) {
//     return res.status(401).send({ ok: false, error: 'Unauthorized' });
//   }
  if (!contentType || !id) {
    return res.status(400).send({
      missing: !contentType ? 'contentType' : 'id'
    });
  }

  
  try {
    // Update contentful entry by id using the management api, iterate over the field values provided in the request body
    console.log('PUTTING', `/entries/${id}`);
    console.log('FIELD DATA', fieldData);
    console.log('CONTENTYPE', contentType);
    const result = await axios
      .put(
        `/entries/${id}`,fieldData,
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
            'X-Contentful-Content-Type': contentType
          }
        }
      )
      .catch((err) => {
        console.log('ERROR IN REQEST');
        console.log(err);
      });

    res.status(200).send({ ok: true });
  } catch (err) {
    console.log('ERROR IN other');
    console.log(err);
    res.status(400).send({ ok: false, err });
  }

};

export default handler;
