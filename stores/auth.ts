import { defineStore } from 'pinia';
import TLogin from '@/types/TLogin';

interface TAuthStore {
  credentials: TLogin,
  token: string | null,
}

export const useAuthStore = defineStore('auth', {
  state: (): TAuthStore => ({
    credentials: {
      email: '',
    },
    token: null,
  }),
  actions: {
    signup() {
      //
    },
    login() {
      this.token = this.credentials.email;
    },
  },
  getters: {
    isAuthorised(): boolean {
      return !!this.token;
    },
  },
});
