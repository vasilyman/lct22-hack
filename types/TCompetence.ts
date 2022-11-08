import { TThemeColor } from "./TThemeColor";


const colors: TThemeColor[] = ['success', 'primary', 'white', 'warning', 'danger', 'info'];

export default interface TCompetence {
  id?: string,
  codeId: string,
  title: string,
  color: TThemeColor,
}

export interface TCompetenceUser extends TCompetence {
  is_expert: boolean,
  tested_At: string,
  ordered: number,
}

export class Competence implements TCompetence {
  id?: string;
  codeId: string;
  title: string;
  color: TThemeColor;

  constructor(data?: TCompetence | any) {
    this.id = data?.id;
    this.codeId = data?.id;
    this.title = data?.title;
    this.color = data?.color || colors[data?.id] || 'white';
  }
}

export class CompetenceUser extends Competence {
  is_expert: boolean;
  tested_At: string;
  ordered: number;

  constructor(data?: TCompetenceUser | any) {
    super(data);

    this.is_expert = data?.is_expert ?? false;
    this.tested_At = data?.tested_At;
    this.ordered = data?.ordered;
  }
}