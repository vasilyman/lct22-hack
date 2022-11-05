import { nanoid } from "nanoid";
import TAvatarItem from "./TAvatarItem";
import TCompetence, { Competence } from "./TCompetence";
import TDocument from "./TDocument";
import TProfile from "./TProfile";
import { TagProject, TTagProject } from "./TTag";
import { TThemeColor } from "./TThemeColor";
import { TUser, User } from "./TUser";

export default interface TIdeaCard {
  codeId: string,
  title: string,
  description: string,
  author: TUser,
  comments: number,
  likes: number,
  hasGrant: boolean,
  tags?: TTagProject[],
  createdAt: string,
  command?: TAvatarItem[],
  documents?: TDocument[],
  imageUrl?: string,
  innovations?: Object[],
  competencies?: TCompetence[],
}

export class IdeaCard implements TIdeaCard {
  codeId: string;
  title: string;
  description: string;
  author: TUser;
  comments: number;
  likes: number;
  hasGrant: boolean;
  tags?: TTagProject[];
  createdAt: string;
  command?: TAvatarItem[];
  documents?: TDocument[];
  imageUrl?: string;
  innovations?: Object[];
  competencies?: TCompetence[];

  constructor(data?: any) {
    this.codeId = data?.id;
    this.title = data?.title ?? '';
    this.description = data?.description ?? '';
    this.author = new User(data?.author);
    this.comments = data?.comments ?? 0;
    this.likes = data?.likes ?? 0;
    this.hasGrant = data?.hasGrant ?? false;
    this.tags =  data?.tags?.map((item: TTagProject) => new TagProject(item)) ?? [];
    this.createdAt = data?.createdAt ?? '';
    this.command = data?.command ?? [];
    this.documents = data?.documents ?? [];
    this.innovations = data?.innovations ?? [];
    this.imageUrl = data?.imageUrl ?? 'https://placeimg.com/180/180/arch';
    this.competencies = data?.competencies?.map((item: TCompetence) => new Competence(item)) ?? [];
  }
}