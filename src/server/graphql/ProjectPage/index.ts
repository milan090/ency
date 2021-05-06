import { objectType } from "nexus";

const ProjectPage = objectType({
  name: "ProjectPage",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.project();
    t.model.projectId();
  },
});

export default [ProjectPage];
