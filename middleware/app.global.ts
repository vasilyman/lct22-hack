import { useAppStore } from '@/stores/app';

export default defineNuxtRouteMiddleware((to, from) => {
  const appStore = useAppStore();
  const dark = useCookie('dark').value === 'dark';
  appStore.toggleDarkMode(dark);
})
