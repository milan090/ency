import { axios } from "src/config/client-axios";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

export async function summ_text(length: number, text: string, keywords: boolean) {
  const data = await axios.post(`${api_url}/summarize-text`, {
    text: text,
    length: length,
    keywords: keywords,
    api_key: api_key,
  });
  return data;
}

export async function summ_url(length: number, url: string, keywords: boolean) {
  const data = await axios.post(`${api_url}/summarize-url`, {
    url: url,
    length: length,
    keywords: keywords,
    api_key: api_key,
  });
  return data;
}

export async function ai_tips(word: string, keywords: boolean) {
  const data = await axios.post(`${api_url}/ai-tips`, {
    word: word,
    keywords: keywords,
    api_key: api_key,
  });
  return data;
}
