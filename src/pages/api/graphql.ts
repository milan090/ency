import { handler, Request } from "src/server/api-handler";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/server/graphql/schema";
import { getRequestOrigin } from "src/server/utils/get-origin";
import prisma from "src/server/prisma/prisma";
import { PrismaClient } from "@prisma/client";
import { User } from "src/types/auth.types";

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface GraphQLContext {
  user?: User;
  prisma: PrismaClient;
  origin: string;
}

export default handler().use(
  new ApolloServer({
    schema,
    context: ({ req }: { req: Request }): GraphQLContext => ({
      user: req.user,
      origin: getRequestOrigin(req),
      prisma,
    }),
  }).createHandler({
    path: "/api/graphql",
  })
);
