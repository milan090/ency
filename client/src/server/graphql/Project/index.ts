import { extendType, nonNull, objectType, stringArg } from "nexus";

const Project = objectType({
  name: "Project",
  definition(t) {
    t.model.id();
    t.model.description();
    t.model.color();
    t.model.isPublic();
    t.model.pages();
    t.model.title();
    t.model.tags();
    t.model.iconSrc();

    t.model.comments();
    t.model.likes();
    t.model.user();
    t.model.userId();
  },
});

const ProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createProject", {
      type: Project,
      args: {
        title: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) => {
        if (!ctx.user) return null;

        return await ctx.prisma.project.create({
          data: {
            user: {
              connect: {
                id: ctx.user.id,
              },
            },
            title: args.title,
            color: "",
            isPublic: false,
          },
        });
      },
    });
  },
});

export default [Project, ProjectMutation];
