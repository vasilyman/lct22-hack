import { defineStore } from 'pinia';
import TProfile from '@/types/TProfile';

interface TProfileStore {
  profile: TProfile | null,
}

export const useProfileStore = defineStore('profile', {
  state: (): TProfileStore => ({
    profile: null,
  }),
  actions: {
    getProfile() {
      //
    },
  },
});
