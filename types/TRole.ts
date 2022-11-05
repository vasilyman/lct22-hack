export interface TRole {
  id: string,
  name: string,
}

export class Role implements TRole {
  id: string
  name: string

  constructor(data?: TRole | any) {
    this.id = data?.id ?? '';
    this.name = data?.name ?? '';
  }
}
