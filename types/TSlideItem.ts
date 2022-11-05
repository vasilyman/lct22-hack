export default interface TSlideItem {
  title: string,
  id: string,
  image?: string,
}

export class SlideItem implements TSlideItem {
  title: string;
  id: string;
  image?: string;

  constructor(data?: TSlideItem | any) {
    this.title = data?.title;
    this.id = data?.id;
    this.image = data?.image;
  }
};
