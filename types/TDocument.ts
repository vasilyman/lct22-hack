export default interface TDocument {
  codeId?: string,
  type: string,
  url?: string,
  title: string,
  size: number,
  file?: File,
};

export class Doc implements TDocument {
  codeId?: string;
  type: string;
  url?: string;
  title: string;
  size: number;

  constructor(data?: TDocument | any) {
    this.codeId = data?.codeId;
    this.type = data?.type;
    this.url = data?.url;
    this.title = data?.title;
    this.size = data?.size;
  }
}
