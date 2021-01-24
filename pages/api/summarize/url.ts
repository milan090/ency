import type { NextApiRequest, NextApiResponse } from "next";
import { getUserUid } from "utils/getUser";
import axios from "axios";

export default async function SummarizeUrl(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({
        error: "Invalid method on route. Use POST instead",
      });
    }
    const { url } = req.body;
    const userUid: string | null = await getUserUid(req);

    if (!userUid) {
      return res.status(400).json({
        error: "Not authenticated",
      });
    } else if (!url) {
      return res.status(400).json({
        error: `Expected url to be a string, but got url: ${url}`,
      });
    }

    const response = await axios.post(`${process.env.AI_API_URL}/summarize-url`, {
      url: url,
      length: 5,
    });
    const data = response.data;

    return res.json({ output: data.output });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
}
