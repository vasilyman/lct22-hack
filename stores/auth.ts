import { defineStore } from 'pinia';
import TLogin from '@/types/TLogin';
import profileService from '@/services/profileService';
import jwt_decode from "jwt-decode";
import { TRole } from '~~/types/TRole';
import Cookies from 'js-cookie';

interface TUser {
  id: string,
  sub: string,
  exp: number,
  roles: TRole[],
  type: string,
}

interface TAuthStore {
  token: string | null,
  user: TUser | null,
  role: TRole | null,
}

class User implements TUser {
  id: string;
  sub: string;
  exp: number;
  roles: TRole[];
  type: string;

  constructor(data?: TUser | any) {
    this.id = data?.id;
    this.sub = data?.sub;
    this.exp = data?.exp;
    this.roles = data?.roles;
    this.type = data?.type;
  }
}

/**
 * 
 * @param exp проверяет если не истекло действие
 * @returns true если не истекло действие
 */
const checkExp = (exp: number = 0) => {
  return exp * 1000 > Date.now();
}

export const useAuthStore = defineStore('auth', {
  state: (): TAuthStore => ({
    token: null,
    user: null,
    role: null,
  }),
  actions: {
    signup() {
      //
    },
    async login(credentials: TLogin, signal?: AbortSignal) {
      return profileService.login(this.$http)(credentials, signal)
        .then((res) => {
          const token = res.data.accessToken;
          if (!token) throw new Error('ошибка авторизации');
          Cookies.set('token', token);
          this.init(token);
          return token;
        });
    },
    async logout() {
      Cookies.remove('token');
      this.token = null;
      this.role = null;
      this.user = null;
    },
    init(token = Cookies.get('token')) {
      if (!token) {
        this.logout();
        return;
      }
      try {
        const decoded = jwt_decode(token);
        if (!decoded) throw new Error('bad token');
        this.user = decoded as TUser;
        if (!checkExp(this.user?.exp)) throw new Error('expired token');
        this.role = this.user?.roles[0] ?? null;
        this.token = token;
      } catch (error) {
        console.log(error);
        
        this.logout();
        return;
      }
    },
  },
  getters: {
    isAuthorised(): boolean {
      return checkExp(this.user?.exp);
    },
    getUser(): TUser | null {
      return this.user;
    },
    isAdmin(): boolean {
      return this.role?.name === 'ROLE_ADMIN';
    },
  },
});
