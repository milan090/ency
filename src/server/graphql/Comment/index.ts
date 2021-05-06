import { objectType } from "nexus";

const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.model.id();
    t.model.createdDate();
    t.model.content();
    t.model.projectId();
    t.model.user();
    t.model.userId();
  },
});

export default [Comment];
