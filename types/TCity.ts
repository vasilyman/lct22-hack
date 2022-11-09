export interface TCity {
  id: string,
  codeId: string,
  title: string
}

export class City implements TCity {
  id: string;
  codeId: string;
  title: string;

  constructor(data?: TCity | any) {
    this.id = data?.id;
    this.codeId = `${data?.id}`;
    this.title = data?.title;
  }
}