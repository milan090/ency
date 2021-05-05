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

    t.nonNull.int("pageCount");
  },
});

const ProjectQueries = extendType({
  type: "Query",
  definition(t) {
    t.list.field("myProjects", {
      type: "Project",
      resolve: async (_root, args, ctx) => {
        if (!ctx.user) return null;
        const projects = await ctx.prisma.project.findMany({
          where: { userId: ctx.user.id },
          include: {
            _count: {
              select: {
                pages: true,
              },
            },
          },
        });

        return projects.map((project) => ({
          ...project,
          pageCount: project._count?.pages || 0,
        }));
      },
    });
  },
});

const ProjectMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createProject", {
      type: Project,
      args: {
        title: nonNull(stringArg()),
        color: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) => {
        if (!ctx.user) return null;
        const project = await ctx.prisma.project.create({
          data: {
            user: {
              connect: {
                id: ctx.user.id,
              },
            },
            title: args.title,
            color: args.color,
            isPublic: false,
          },
        });
        return {
          ...project,
          pageCount: 0,
        };
      },
    });
  },
});

export default [Project, ProjectQueries, ProjectMutation];
