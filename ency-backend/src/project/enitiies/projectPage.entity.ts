import { Prisma, ProjectPage } from "@prisma/client";

/**
 * ProjectPageEntity without the `data` property
 */
export class ProjectPageEntityNoData {
  id!: number;
  projectId!: number;
  name!: string;
}

export class ProjectPageEntity implements ProjectPage {
  id!: number;
  projectId!: number;
  name!: string;
  data!: Prisma.JsonValue;
}
