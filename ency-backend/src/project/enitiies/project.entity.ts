import { Project } from "@prisma/client";

export class ProjectEntity implements Project {
  id!: number;
  userUid!: string;

  title!: string;
  tags!: string[];
  isPublic!: boolean;

  iconSrc!: string | null;
  description!: string | null;
  pageCount?: number;
}
