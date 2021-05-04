import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import path from "path";
import User from "./User";
import Comment from "./Comment";
import Like from "./Like";
import Project from "./Project";
import ProjectPage from "./ProjectPage";

const shouldGenerateArtifacts = process.env.NODE_ENV === "development" || !!process.env.GENERATE;

export const schema = makeSchema({
  types: [User, Comment, Like, Project, ProjectPage],
  plugins: [
    nexusPrisma({
      shouldGenerateArtifacts,
    }),
  ],
  contextType: {
    module: path.join(process.cwd(), "src/pages/api/graphql.ts"),
    export: "GraphQLContext",
  },
  // Generate the files
  shouldGenerateArtifacts,
  outputs: {
    typegen: path.join(process.cwd(), "src/server/graphql/nexus-types.generated.ts"),
    schema: path.join(process.cwd(), "src/server/graphql/schema.graphql"),
  },
});
