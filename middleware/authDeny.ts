import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {

  const authStore = useAuthStore();
  const isAuthorized = authStore.isAuthorised;

  if (isAuthorized) {
    return navigateTo('/');
  }
})
