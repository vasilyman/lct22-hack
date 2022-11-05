import TCompetence from "./TCompetence";
import TDocument from "./TDocument";
import TTag from "./TTag";

export interface TFormIdeaDescription {
  title: string,
  description: string,
}

export interface TFormIdea extends TFormIdeaDescription {
  id?: string,
  title: string,
  description: string,
  tags?: TTag[],
  files?: TDocument[],
  competencies?: TCompetence[],
}

export class FormIdea implements TFormIdea {
  id?: string;
  title: string;
  description: string;
  files?: TDocument[];
  tags?: TTag[];
  competencies?: TCompetence[];

  constructor(data?: TFormIdea) {
    this.id = data?.title;
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.files = data?.files || [];
    this.tags = data?.tags || [];
    this.competencies = data?.competencies || [];
  }
};