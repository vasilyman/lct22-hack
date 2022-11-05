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
}

export class FormIdea implements TFormIdea {
  id?: string;
  title: string;
  description: string;
  files?: TDocument[];
  tags?: TTag[];

  constructor(data?: TFormIdea) {
    this.id = data?.title;
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.files = data?.files || [];
    this.tags = data?.tags || [];
  }
};