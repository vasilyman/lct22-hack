export default interface TProfile {
  id: string,
  email: string,
  username: string,
  firstname?: string,
  lastname?: string,
  avatar: string,
  competitions: {
    title: string,
    codeId: string,
    isMain: boolean,
  }[],
  birthsday: string,
  createdAt: string,
  city: {
    codeId: string,
    title: string,
  },
}