export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  folder?: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  color?: string;
}
