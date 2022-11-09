import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig> {
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return {
        top: 0,
        behavior: 'smooth',
      };
    }
  },
  routes: (_routes) => [
    ..._routes,
    {
      name: 'new-project',
      path: '/new-project',
      component: () => import('~/pages/form-project.vue'),
      meta: {
        middleware: ['anon-deny'],
      },
    },
    {
      name: 'edit-project',
      path: '/edit-project/:codeId',
      component: () => import('~/pages/form-project.vue'),
      meta: {
        middleware: ['anon-deny'],
      },
    },
    {
      name: 'me',
      path: '/me',
      component: () => import('~/pages/profile.vue'),
      meta: {
        middleware: ['anon-deny'],
      },
    },
    {
      name: 'profile',
      path: '/profile/:codeId',
      component: () => import('~/pages/profile.vue'),
      meta: {
        middleware: ['anon-deny'],
      },
    },
    {
      name: 'edit-profile',
      path: '/edit-rofile',
      component: () => import('~/pages/editProfile.vue'),
      meta: {
        middleware: ['anon-deny'],
      },
    },
  ],
};
