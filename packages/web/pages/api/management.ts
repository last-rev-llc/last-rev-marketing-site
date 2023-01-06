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

interface PatchRequest {
  entry: any;
  contentType: string;
  id: string;
  secretToken: string;
}

// Take a contentful entry and patch the entriy using contentful management api
const handler: NextApiHandler = async (req, res) => {
  await cors(req, res);

  const { entry, contentType, id } = req.body as PatchRequest;
  const secretToken = (req.headers['authorization'] as string)?.split('Bearer ')[1];

  if (!secretToken || secretToken !== process.env.SECRET_TOKEN) {
    return res.status(401).send({ ok: false, error: 'Unauthorized' });
  }
  if (!entry || !contentType || !id) {
    return res.status(400).send({
      missing: !entry ? 'entry' : !contentType ? 'contentType' : 'id'
    });
  }

  try {
    const { data }: any = await axios.get(`/entries/${id}`);
    console.log('Data', data);
    // Update contentful entry by id using the management api, iterate over the field values provided in the request body
    const result = await axios
      .patch(
        `/entries/${id}`,

        Object.keys(entry).map((field) => ({
          op: 'replace',
          path: `/fields/${field}/en-US`,
          value: entry[field]
        })),
        {
          headers: {
            'Content-Type': 'application/json-patch+json',
            'X-Contentful-Version': data.sys.version
          }
        }
      )
      .catch((err) => {
        console.log(err);
      });

    res.status(200).send({ ok: true, result: JSON.parse(result as any) });
  } catch (err) {
    console.log(err);
    res.status(200).send({ ok: true, err });
  }

  res.status(200).send({ ok: true });
};

export default handler;
