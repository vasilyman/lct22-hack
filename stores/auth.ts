import { defineStore } from 'pinia';
import TLogin from '@/types/TLogin';
import profileService from '@/services/profileService';

interface TAuthStore {
  token: string | null,
}

export const useAuthStore = defineStore('auth', {
  state: (): TAuthStore => ({
    token: null,
  }),
  actions: {
    signup() {
      //
    },
    async login(credentials: TLogin, signal?: AbortSignal) {
      return profileService.login(this.$http)(credentials, signal)
        .then((res) => {          
          this.token = res.data.token ?? null;
        });
    },
  },
  getters: {
    isAuthorised(): boolean {
      return !!this.token;
    },
  },
});
