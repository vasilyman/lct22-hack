import { defineStore } from 'pinia';

interface Store {
  dark: boolean,
}

export const useAppStore = defineStore('context', {
  state: (): Store => ({
    dark: true,
  }),
  actions: {
    toggleDarkMode(dark?: boolean) {
      this.dark = dark ?? !this.dark;
      try {
        localStorage.theme = this.dark ? 'dark' : 'light';
      } catch (error) {
        return;
      }
    },
    init() {
      try {
        let dark = this.dark;
        if ('theme' in localStorage) dark = localStorage.theme === 'dark';
        this.toggleDarkMode(dark);
      } catch (error) {
        return;
      }
    },
  },
});
