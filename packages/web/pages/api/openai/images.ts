import { Configuration, OpenAIApi, CreateImageRequest } from 'openai';

import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../../src/cors';

type Data = {
    prompt: string;
    response: any;
  };
  const initializeOpenAI = () => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY // process.env.API_KEY,
    });
    return new OpenAIApi(configuration);
  };

// Initialize the OpenAIApi object with the necessary organization and API key
const openai = initializeOpenAI();


const defaultOptions: CreateImageRequest = {
    prompt: '',
    response_format: 'url',
    size: '512x512',
    n: 1
};

// Prompt for the OpenAI API

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  
  const args = { ...req.body };
  const prompt: string = args.prompt;
    console.log('getting image with prompt', args.prompt);
  try {
    console.log('GETTING PROMPT', prompt);
    // Send a request to the OpenAI API for recommended changes
    const response = await openai.createImage({ ...defaultOptions, prompt });
    
    // Get the recommended changes from the API response
    if (response?.data?.data)
    console.log('IMAGE DATA RETURNED', response?.data?.data)
      res.status(200).json({ prompt: prompt, response: response?.data?.data} as any);
  } catch (err: any) {
    console.log(err);
    // Check if the error is a response error
    if (err.response) {
      // Get the error message and status code from the response
      const { message, status } = err.response;

      res.status(500).json({ prompt: prompt, response: { message, status  } } as any);
    }
  }
};

export default handler;