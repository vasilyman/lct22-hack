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
    update(id: string, data: TProfile, signal?: AbortSignal) {
      return profileService.update(this.$http)(id, data, signal)
        .then((res) => {          
          return res.data;
        });
    },
  },
  getters: {
    fullname: () => (profile: TProfile) => {
      return [profile.firstName || '', profile.lastName || profile.username].join(' ');
    }
  },
});
