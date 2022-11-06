import { TMemberStatus } from "./TMemberStatus";
import { Role, TRole } from "./TRole";

export interface TUser {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  roles: TRole[],
  photo: string,
  getFullName: () => string,
};

export interface TUserProjectMember extends TUser {
  status: TMemberStatus,
}

export class User implements TUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: TRole[];
  photo: string;

  constructor(data?: TUser | any) {
    this.id = data?.id ? `${data?.id}` : '';
    this.email = data?.email ?? '';
    this.firstName = data?.firstName ?? '';
    this.lastName = data?.lastName ?? '';
    this.roles = data?.roles?.map((item: TRole) => new Role(item));
    this.photo = data?.photo ?? 'https://placeimg.com/180/180/people';
  }

  static getFullName(user: TUser) {
    const nameParts = [user.firstName, user.lastName].filter((item) => !!item);
    return nameParts.join(' ') || 'ttt';
  }

  getFullName() {
    const nameParts = [this.firstName, this.lastName].filter((item) => !!item);
    return nameParts.join(' ');
  }
}

export class UserProjectMember extends User {
  status: TMemberStatus;

  constructor(data?: TUserProjectMember | any) {
    super(data);
    this.status = data?.status || 'CANDIDATE';
  }
}