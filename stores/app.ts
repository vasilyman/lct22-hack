import { defineStore } from 'pinia';

interface TAppStore {
  dark: boolean,
}

export const useAppStore = defineStore('app', {
  state: (): TAppStore => ({
    dark: true,
  }),
  actions: {
    toggleDarkMode(dark?: boolean) {
      this.dark = dark ?? !this.dark;
    },
  },
});
