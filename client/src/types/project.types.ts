export interface ProjectPreview {
  id: number;
  userUid: string;
  title: string;
  tags: string[];
  description: string;
  pageCount: number;
  iconSrc: string;
  color: string;
}

export interface ProjectData {
  id: number;
  userUid: string;

  title: string;
  tags: string[];
  isPublic: boolean;

  iconSrc: string | null;
  description: string | null;
  pageCount: number;
  color: string;
}
