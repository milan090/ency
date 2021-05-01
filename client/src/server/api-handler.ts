import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import nc from "next-connect";
import { error } from "next/dist/build/output/log";

interface Request extends NextApiRequest {
  // Passport adds these to the request object
  logout: () => void;
  user?: {
    name: string;
    email: string;
    id: string;
  };
}

export function handler() {
  return nc<Request, NextApiResponse>({
    onError: (err, _, res) => {
      error(err);
      res.status(500).end(err.toString());
    },
  }).use(async (req, res, next) => {
    // Attach User
    const session = await getSession({ req });
    if (session?.user) {
      const { user } = session;
      req.user = {
        name: user.name,
        email: user.email,
        id: user.id,
      };
    }
    next();
  });
}
