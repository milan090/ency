import axios from "axios";
import { auth } from "config/firebase";

export interface SummarizeUrl {
  output: string;
}

export const summarizeUrl = async (url: string): Promise<SummarizeUrl> => {
  const userIdToken = await auth.currentUser?.getIdToken();
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/summarize-url`,
    {
      url: url,
    },
    {
      headers: {
        Authorization: `Bearer ${userIdToken}`,
      },
    }
  );
  const data = res.data;
  return { output: data.output };
};

export interface SummarizeText {
  output: string;
}

export const summarizeText = async (text: string, length?: number): Promise<SummarizeUrl> => {
  const userIdToken = await auth.currentUser?.getIdToken();
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_AI_API_URL}/summarize-text`,
    {
      text: text,
      length: length || 5,
    },
    {
      headers: {
        Authorization: `Bearer ${userIdToken}`,
      },
    }
  );
  const data = res.data;
  return { output: data.output };
};
