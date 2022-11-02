import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const token = useCookie('token');
  authStore.init(token.value || null);
})
