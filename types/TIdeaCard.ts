import { nanoid } from "nanoid";
import TAvatarItem from "./TAvatarItem";
import TCompetence, { Competence } from "./TCompetence";
import TDocument, { Doc } from "./TDocument";
import TProfile from "./TProfile";
import { TagProject, TTagProject } from "./TTag";
import { TThemeColor } from "./TThemeColor";
import { TUser, TUserProjectMember, User, UserProjectMember } from "./TUser";

export interface TProjectStatus {
  codeId: string,
  title: string,
  createdAt: string,
  progress: number,
}

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
  members?: TUserProjectMember[],
  documents?: TDocument[],
  imageUrl?: string,
  innovations?: Object[],
  competencies?: TCompetence[],
  status?: TProjectStatus,
  rating?: number,
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
  members?: TUserProjectMember[];
  documents?: TDocument[];
  imageUrl?: string;
  innovations?: Object[];
  competencies?: TCompetence[];
  status?: TProjectStatus;
  rating?: number;

  constructor(data?: TIdeaCard | any) {
    this.codeId = data?.codeId;
    this.title = data?.title ?? '';
    this.description = data?.description ?? '';
    this.author = new User(data?.author);
    this.comments = data?.comments ?? 0;
    this.likes = data?.likes ?? 0;
    this.hasGrant = data?.hasGrant ?? false;
    this.tags =  data?.tags?.map((item: TTagProject) => new TagProject(item)) ?? [];
    this.createdAt = data?.createdAt ?? '';
    this.members = data?.members?.map((item: TUserProjectMember) => new UserProjectMember(item)) ?? [];
    this.documents = data?.documents?.map((item: TDocument) => new Doc(item)) ?? [new Doc({
      codeId: 'one',
      title: 'Демо документ',
      type: 'application/pdf',
      size: '135647'
    })];
    this.innovations = data?.innovations ?? [];
    this.imageUrl = data?.imageUrl ?? 'https://placeimg.com/180/180/arch';
    this.competencies = data?.competencies?.map((item: TCompetence) => new Competence(item)) ?? [];
    this.status = data?.status;
    this.rating = data?.rating;
  }
}

export class IdeaCardDTO extends IdeaCard {
  constructor(data?: TIdeaCard | any) {
    super(data);

    this.codeId = data?.id;
  }
}