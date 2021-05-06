import { extendType, objectType } from "nexus";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.createdAt();
    t.model.email();
    t.model.emailVerified();
    t.model.bio();
    t.model.coins();
    t.model.comments();
    t.model.image();
    t.model.likes();
    t.model.projects();
  },
});

const UserQueries = extendType({
  type: "Query",
  definition(t) {
    t.field("currentUser", {
      type: "User",
      resolve: async (_root, _args, ctx) => {
        if (!ctx.user?.id) return null;
        return ctx.prisma.user.findUnique({ where: { id: ctx.user.id } });
      },
    });
  },
});

export default [User, UserQueries];
