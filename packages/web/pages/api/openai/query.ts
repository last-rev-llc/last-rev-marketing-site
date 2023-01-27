import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

import cors from '../../../src/cors';

// const PINECONE_SERVER = 'https://jira-query-full-project-e2306a4.svc.us-west1-gcp.pinecone.io/query';
const PINECONE_SERVER = 'https://jira-adam-e2306a4.svc.us-west1-gcp.pinecone.io/query';
// const PINECONE_SERVER = 'https://jira-test-project-e2306a4.svc.us-west1-gcp.pinecone.io/query';
// const PINECONE_SERVER = 'https://jira-query-e2306a4.svc.us-west1-gcp.pinecone.io/query';


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

const pineconeQuery = async (embeddings: number[], filters: any) => {
  try {
      const response = await axios.post(PINECONE_SERVER, {
          vector: embeddings,
          topK: 4,
          namespace: "jira",
          includeMetadata: true,
      }, {
          headers: {
              'Content-Type': 'application/json',
              'Api-Key': process.env.PINECONE_API_KEY
          }
      });
      return response.data;
  } catch (error) {
      console.error(error);
  }
};

const createContext = (id: string, metadata: Record<string, string>): string => {
  let string = 'ISSUE ID: ' + id + '\n\n';
  for (const key in metadata) {
    if (metadata.hasOwnProperty(key)) {
      string += `${key}: ${metadata[key]}\n\n`;
    }
  }
  return string;
}


// Prompt for the OpenAI API

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await cors(req, res);
  
  const args = { ...req.body };
  const prompt: string = args.prompt;

  console.log('args', args)
  const statusCategory: string = args.statusCategory;
    console.log('getting image with prompt', args.prompt);
  try {
    console.log('GETTING PROMPT', prompt);
    // Send a request to the OpenAI API for embeddings based on query
    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: prompt,
    });
    const embeddings = embeddingResponse.data?.data[0]?.embedding;

    const pineconeData = await pineconeQuery(embeddings, { statusCategory });

    const context = pineconeData.matches.map((item: any) => {
      return createContext(item.id, item.metadata);
    }).join('\n\n');


    const openAIresponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer the following question based on the context provided:\n\nCONTEXT:\n${context}\n\nQuestion:\n${prompt}\n\nAnswer:\n`,
      max_tokens: 700,
      temperature: 0,
    });

    const answer = openAIresponse.data.choices[0].text;
    
    
    // Get the recommended changes from the API response
    if (answer)
    console.log('ANSWER', answer)
      res.status(200).json({ prompt: prompt, answer: answer, context: context} as any);
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