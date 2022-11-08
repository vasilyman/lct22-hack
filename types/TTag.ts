import { TThemeColor } from "./TThemeColor";


const colors: TThemeColor[] = ['success', 'primary', 'white', 'warning', 'danger', 'info'];

export default interface TTag {
  codeId: string,
  title: string,
  color: string,
}

export interface TTagProject extends TTag {
  ordered: number,
}

export class Tag implements TTag {
  codeId: string;
  title: string;
  color: string;

  constructor(data?: TTag | any) {
    this.codeId = data?.id;
    this.title = data?.title;
    this.color = data?.color || colors[data?.id] || 'white';
  }
}

export class TagProject extends Tag {
  ordered: number;

  constructor(data?: TTagProject | any) {
    super(data);
    this.ordered = data?.ordered ?? 0;
  }
}