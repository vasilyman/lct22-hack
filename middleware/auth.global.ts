import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const token = useCookie('token');
  await authStore.init(token.value || null);
  if (!authStore.isAuthorised) token.value = '';
})
