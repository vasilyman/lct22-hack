import TDocument from "./TDocument";

export interface TFormIdeaDescription {
  title: string,
  description: string,
}

export interface TFormIdea extends TFormIdeaDescription {
  title: string,
  description: string,
  files?: TDocument[],
}

export class FormIdea implements TFormIdea {
  title: string;
  description: string;
  files?: TDocument[];

  constructor(data?: TFormIdea) {
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.files = data?.files || [];
  }
};