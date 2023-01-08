import { Configuration, OpenAIApi } from 'openai';

import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../../src/cors';

type Data = {
    prompt: string;
    response: string;
  };
  const initializeOpenAI = () => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY // process.env.API_KEY,
    });
    return new OpenAIApi(configuration);
  };

// Initialize the OpenAIApi object with the necessary organization and API key
const openai = initializeOpenAI();

const defaultOptions = {
  model: 'text-davinci-003',
  temperature: 0.7,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
};

// Prompt for the OpenAI API

const createRewritePrompt = (text: string) => {
    return `Rewrite the following text using the best grammar and spelling you can. The text should be written in the same style as the original text.\n\nOriginal text:\n\n${text}`;
}

const createSummarizePrompt = (text: string) => {
    return `Summarize the following text using the best grammar and spelling you can. The text should be written in the same style as the original text.\n\nOriginal text:\n\n${text}`;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  let prompt: string = "";
  const args = { ...req.body };
  
  try {
    
    switch (args.textAction) {
        case 'rewrite':
            prompt = createRewritePrompt(args.text);
            break;
        case 'summarize':
            prompt = createSummarizePrompt(args.text);
            break;

        default:
            break;
    }

    // Send a request to the OpenAI API for recommended changes
    const response = await openai.createCompletion({ ...defaultOptions, prompt });

    // Get the recommended changes from the API response
    if (response?.data?.choices[0]?.text)
      res.status(200).json({ prompt: prompt, response: response?.data?.choices[0]?.text });
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

export default handler;