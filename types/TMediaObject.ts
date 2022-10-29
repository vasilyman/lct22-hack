export default interface TMediaObject {
  codeId: string,
  message: string,
  author: {
    name: string,
    photoUrl: string,
  },
  createdAt: string,
  media?: TMediaObject[],
}