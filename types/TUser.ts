import { Role, TRole } from "./TRole";

export interface TUser {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  roles: TRole[],
  photo: string,
};

export class User implements TUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: TRole[];
  photo: string;

  constructor(data?: TUser | any) {
    this.id = data?.id ?? '';
    this.email = data?.email ?? '';
    this.firstName = data?.firstName ?? '';
    this.lastName = data?.lastName ?? '';
    this.roles = data?.roles?.map((item: TRole) => new Role(item));
    this.photo = data?.photo ?? 'https://placeimg.com/180/180/people';
  }
}