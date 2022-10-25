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
  likes: number
}