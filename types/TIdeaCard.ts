import TAvatarItem from "./TAvatarItem";
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
  documents?: {
    codeId: string,
    type: string,
    url: string,
    title: string,
    size: string,
  }[],
  imageUrl?: string,
}