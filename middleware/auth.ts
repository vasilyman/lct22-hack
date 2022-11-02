import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {

  const authStore = useAuthStore();
  const isAuthorized = authStore.isAuthorised;

  console.log('middleware auth');
  
  
  if (isAuthorized) {
    return navigateTo('/');
  }
})
