import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import nc from "next-connect";
import { error } from "next/dist/build/output/log";
import { User } from "src/types/auth.types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: string;
      email: string;
      provider: string;
      redirect?: string;
    }
  }
}

export interface Request extends NextApiRequest {
  // Passport adds these to the request object
  user?: User;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

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
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }
    next();
  });
}
