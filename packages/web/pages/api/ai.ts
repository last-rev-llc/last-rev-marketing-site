import { Configuration, OpenAIApi } from 'openai';

import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../src/cors';

type Data = {
  prompt: string;
  response: string;
};
const initializeOpenAI = () => {
  const configuration = new Configuration({
    organization: process.env.OPEN_ORG, // process.env.ORGANIZATION,
    apiKey: process.env.OPEN_API // process.env.API_KEY,
  });
  return new OpenAIApi(configuration);
};

// Initialize the OpenAIApi object with the necessary organization and API key
const openai = initializeOpenAI();

const defaultOptions = {
  model: 'text-davinci-003',
  temperature: 0.7,
  max_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
};

const themeHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  console.log(req.query);
  // Extract the Configuration and OpenAIApi initialization into a separate function
  const args = { ...req.body, ...req.query };
  try {
    // Send a request to the OpenAI API for recommended changes
    const response = await openai.createCompletion({ ...defaultOptions, ...args });

    // Get the recommended changes from the API response
    if (response?.data?.choices[0]?.text)
      res.status(200).json({ prompt: args.prompt, response: response?.data?.choices[0]?.text });
  } catch (err: any) {
    console.log(err);
    // Check if the error is a response error
    if (err.response) {
      // Get the error message and status code from the response
      const { message, status } = err.response;

      res.status(200).json({ err } as any);
    }
  }
};

export default themeHandler;
