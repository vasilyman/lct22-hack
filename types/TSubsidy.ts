export default interface TSubsidy {
  id: string,
  title: string,
  image: string,
}

export class Subsidy implements TSubsidy {
  id: string;
  title: string;
  image: string;

  constructor(data?: TSubsidy | any) {
    this.id = data?.id;
    this.title = data?.title;
    this.image = data?.image ?? 'https://placeimg.com/180/180/nature';
  }
}