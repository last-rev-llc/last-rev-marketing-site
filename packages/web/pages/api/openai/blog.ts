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
  max_tokens: 2000,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
};

// Prompt for the OpenAI API

const createBlogTitlePrompt = (text: string) => {
    return `Write an engaging blog title for the following text using the best grammar and spelling you can.\n\nOriginal text:\n\n${text}`;
}

const createBlogHeadersPrompt = (text: string) => {
    return `Provide 5 headings for a blog post topic on "${text}" using the best grammar and spelling you can. The headings should be stored in a json object with the keys following the format "heading1", "heading2", etc.`
}

const createBlogMarkdownPrompt = (text: string, headings: any) => {
    const headingsArray = Object.values(headings)
    return `Write a blog post about ${text} using the following headings ${headingsArray.join(", ")}. Each heading should have 2 paragraphs of content that uses varying sentence structure. Your response should be in valid markdown format. Important keywords and topics should use tags such as bold, italic, and underlines.`;
}

const createBlogTagsPrompt = (text: string) => {
    return `Provide only 5 tags for a blog post topic on "${text}" using the best grammar and spelling you can. The tags should be seperated comma seperated.`;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  let prompt: string = "";
  const args = { ...req.body };
    console.log('getting stuff', args.textAction, args.text, args.headings);
  try {
    
    switch (args.textAction) {
        case 'blogTitle':
            prompt = createBlogTitlePrompt(args.text);
            break;
        case 'blogHeaders':
            prompt = createBlogHeadersPrompt(args.text);
            break;
        case 'blogMarkdown':
            prompt = createBlogMarkdownPrompt(args.text, JSON.parse(args.headings));
            break;
        case 'blogTags':
            prompt = createBlogTagsPrompt(args.text);
            break;
        default:
            break;
    }

    console.log('GETTING PROMPT', prompt);

    // Send a request to the OpenAI API for recommended changes
    const response = await openai.createCompletion({ ...defaultOptions, prompt });
    // console.log(response)
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