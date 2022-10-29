import { defineStore } from 'pinia';
import TProfile from '@/types/TProfile';
import profileService from '@/services/profileService';

interface TProfileStore {
  profile: TProfile | null,
}

export const useProfileStore = defineStore('profile', {
  state: (): TProfileStore => ({
    profile: null,
  }),
  actions: {
    fetchProfile(id: string, signal?: AbortSignal) {
      return profileService.get(this.$http)(id, signal)
        .then((res) => {          
          return res.data;
        });
    },
  },
  getters: {
    fullname: () => (profile: TProfile) => {
      return [profile.firstname || '', profile.lastname || profile.username].join(' ');
    }
  },
});
