import { db } from "config/firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUserUid } from "utils/getUser";
import crypto from "crypto";
import { WordpressConnection } from "utils/wordpress";

export default async function ConnectToWordpress(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Invalid method on route. Use POST instead",
        code: "api/method",
      });
    }
    const userUid: string | null = await getUserUid(req);
    const wpWebsite: string | undefined = req.body;

    if (!userUid) {
      return res.status(400).json({
        error: "Not authenticated",
        code: "user/not-authenticated",
      });
    } else if (!wpWebsite) {
      return res.status(400).json({
        error: `Expected wpWebsite to be a string but got: ${wpWebsite}`,
        code: "api/missing-parameter",
      });
    }

    const userRef = db.collection("users").doc(userUid);
    const user = await userRef.get();

    if (!user.exists) {
      return res.status(503).json({
        error: "User does not exist",
      });
    }

    const newWpConnectionRef = userRef.collection("wordpress").doc();

    const newApiKey: string = crypto.randomBytes(30).toString("base64").slice(0, 40);

    const newWpConnection: WordpressConnection = {
      apiKey: newApiKey,
      wpWebsite: wpWebsite,
      userId: user.id,
    };

    await newWpConnectionRef.set(newWpConnection);

    return res.json(newWpConnection);
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
}
