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
          const token = res.data.token ?? null;
          this.token = token;
          return token;
        });
    },
    async logout() {
      this.token = null;
    },
    init(token: string | null) {
      try {
        this.token = token;
      } catch (error) {
        return;
      }
    },
  },
  getters: {
    isAuthorised(): boolean {
      return !!this.token;
    },
  },
});
