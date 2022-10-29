export default interface TMediaObject {
  codeId: string,
  title?: string,
  message: string,
  author: {
    name: string,
    photoUrl: string,
  },
  createdAt?: string,
  media?: TMediaObject[],
}