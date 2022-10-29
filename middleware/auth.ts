import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const isAuthorized = authStore.isAuthorised;

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('to', to, isAuthorized);
  
  if (isAuthorized && to.path === '/login') {
    return navigateTo('/');
  }
})
