import { makeSchema, extendType } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import path from "path";

const shouldGenerateArtifacts = process.env.NODE_ENV === "development" || !!process.env.GENERATE;

const Query = extendType({
  type: "Query",
  definition(t) {
    t.string("hello", {
      resolve: () => {
        return "World";
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query],
  plugins: [
    nexusPrisma({
      shouldGenerateArtifacts,
    }),
  ],
  contextType: {
    module: path.join(process.cwd(), "src/server/graphql/context.ts"),
    export: "GraphQLContext",
  },
  // Generate the files
  shouldGenerateArtifacts,
  outputs: {
    typegen: path.join(process.cwd(), "src/server/graphql/nexus-types.generated.ts"),
    schema: path.join(process.cwd(), "src/server/graphql/schema.graphql"),
  },
});
