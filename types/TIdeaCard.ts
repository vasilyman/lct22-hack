import { TThemeColor } from "./TThemeColor";

export default interface TIdeaCard {
  id: string,
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
}