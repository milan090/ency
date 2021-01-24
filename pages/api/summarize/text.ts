import type { NextApiRequest, NextApiResponse } from "next";
import { getUserUid } from "utils/getUser";
import axios from "axios";

export default async function SummarizeText(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({
        error: "Invalid method on route. Use POST instead",
      });
    }
    const { text } = req.body;
    const userUid: string | null = await getUserUid(req);

    if (!userUid) {
      return res.status(400).json({
        error: "Not authenticated",
      });
    } else if (!text) {
      return res.status(400).json({
        error: `Expected text to be a string, but got text: ${text}`,
      });
    }

    const response = await axios.post(`${process.env.AI_API_URL}/summarize-text`, {
      text: text,
      length: 5,
    });
    const data = response.data;
    console.log(data);

    return res.json({ output: data.output });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
}
