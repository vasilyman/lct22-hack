import { nanoid } from "nanoid";
import TAvatarItem from "./TAvatarItem";
import TDocument from "./TDocument";
import { TThemeColor } from "./TThemeColor";

export default interface TIdeaCard {
  codeId: string,
  title: string,
  description: string,
  author: {
    name: string,
    photo: string,
    url: string,
  },
  comments: number,
  likes: number,
  hasGrant: boolean,
  tags?: {
    codeId: string,
    title?: string,
    color?: TThemeColor,
  }[],
  createdAt: string,
  command?: TAvatarItem[],
  documents?: TDocument[],
  imageUrl?: string,
}

export class IdeaCard implements TIdeaCard {
  codeId: string;
  title: string;
  description: string;
  author: {
    name: string,
    photo: string,
    url: string,
  };
  comments: number;
  likes: number;
  hasGrant: boolean;
  tags?: {
    codeId: string,
    title?: string,
    color?: TThemeColor,
  }[];
  createdAt: string;
  command?: TAvatarItem[];
  documents?: TDocument[];
  imageUrl?: string;

  constructor(data?: any) {
    this.codeId = data?.id;
    this.title = data?.title ?? '';
    this.description = data?.description ?? '';
    this.author = data?.author ?? {
      name: '',
      photo: '',
      url: '',
    };
    this.comments = data?.comments ?? 0;
    this.likes = data?.likes ?? 0;
    this.hasGrant = data?.hasGrant ?? false;
    this.tags = data?.tags ?? [];
    this.createdAt = data?.createdAt ?? '';
    this.command = data?.command ?? [];
    this.documents = data?.documents ?? [];
    this.imageUrl = data?.imageUrl ?? '';
  }
}