import { handler } from "src/server/api-handler";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "src/server/graphql/schema";
import { GraphQLContext } from "src/server/graphql/context";
import { getRequestOrigin } from "src/server/utils/get-origin";
import prisma from "src/server/prisma/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler().use(
  new ApolloServer({
    schema,
    context: ({ req }): GraphQLContext => ({
      user: req.user,
      origin: getRequestOrigin(req),
      prisma,
    }),
  }).createHandler({
    path: "/api/graphql",
  })
);
