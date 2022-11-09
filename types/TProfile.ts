import { City, TCity } from "./TCity";
import { CompetenceUser, TCompetenceUser } from "./TCompetence";

export default interface TProfile {
  id: string,
  email: string,
  username: string,
  firstName: string,
  lastName: string,
  avatar: string,
  competencies: TCompetenceUser[],
  birthsday: string,
  createdAt: string,
  city?: TCity,
  rating?: number,
  ideasCount?: number,
  ownIdeasCount?: number, 
  getFullName: () => string,
  getMainCompetence: () => string,
}

export class Profile implements TProfile {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  competencies: TCompetenceUser[];
  birthsday: string;
  createdAt: string;
  city?: TCity;
  rating?: number;
  ideasCount?: number;
  ownIdeasCount?: number;

  constructor(data?: TProfile | any) {
    this.id = data?.id;
    this.email = data?.email;
    this.username = data?.username;
    this.firstName = data?.firstName ?? '';
    this.lastName = data?.lastName ?? '';
    this.avatar = data?.avatar ?? 'https://placeimg.com/180/180/person';
    this.competencies = data?.competencies?.map((item: TCompetenceUser) => new CompetenceUser(item));
    this.birthsday = data?.birthsday;
    this.createdAt = data?.createdAt;
    this.city = new City(data?.city);
    this.rating = data?.rating ?? 0;
    this.ideasCount = data?.ideasCount ?? 0;
    this.ownIdeasCount = data?.ownIdeasCount ?? 0; 
  }

  getFullName() {
    const nameParts = [this.firstName, this.lastName].filter((item) => !!item);
    return nameParts.join(' ');
  }

  getMainCompetence() {
    return this.competencies?.find((item) => item.is_expert)?.title || '';
  }
}

export class ProfileDTO extends Profile {
  constructor(data?: TProfile | any) {
    super(data);
  }
}
