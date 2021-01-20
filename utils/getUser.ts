import { auth } from "config/firebase-admin";
import { NextApiRequest } from "next";

export async function getUserUid(req: NextApiRequest): Promise<string | null> {
  // Authorization header should be in form: Bearer <TOKEN>
  try {
    const token: string | undefined = req.headers["authorization"]?.split("Bearer ")[1]; // Removed Bearer string

    if (!token) {
      return null;
    }
    const user = await auth.verifyIdToken(token);
    if (!user) {
      return null;
    }

    return user.uid;
  } catch (error) {
    return null;
  }
}
