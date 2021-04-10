export interface ProjectPreview {
  title: string;
  tags: ProjectTag[];
  fileCount: number;
  iconSrc: string;
  color: string;
}

export interface ProjectTag {
  value: string;
  color: string;
}
