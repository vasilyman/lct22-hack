import { TThemeColor } from "./TThemeColor";


const colors: TThemeColor[] = ['success', 'primary', 'white', 'warning', 'danger', 'info'];

export default interface TCompetence {
  codeId: string,
  title: string,
  color: string,
}

export class Competence implements TCompetence {
  codeId: string;
  title: string;
  color: string;

  constructor(data?: TCompetence | any) {
    this.codeId = data?.id;
    this.title = data?.title;
    this.color = data?.color || colors[data?.id] || 'white';
  }
}