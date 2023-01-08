import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../src/cors';

type Data = {
  name: string;
};

const themeHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);

  res.status(200).json({ name: 'John Doe' });
};

export default themeHandler;
