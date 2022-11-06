export interface TCity {
  codeId: string,
  title: string
}

export class City implements TCity {
  codeId: string;
  title: string;

  constructor(data?: TCity | any) {
    this.codeId = data?.id;
    this.title = data?.title;
  }
}