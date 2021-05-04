import { objectType } from "nexus";

const Like = objectType({
  name: "Like",
  definition(t) {
    t.model.id();
    t.model.project();
    t.model.projectId();
    t.model.user();
    t.model.userId();
  },
});

export default [Like];
