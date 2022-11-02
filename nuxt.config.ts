// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'slidefade'
    },
    head: {
      charset: 'utf-8',
      viewport: 'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1', 
      title: 'Collabro',
      meta: [
        { name: 'description', content: 'Collabro' }
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    app: {
      baseURL: '/',
    },
    public: {
      apiUrl: '/',
    },
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '~/assets/css/tailwind.postcss',
    '~/assets/css/transitions.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-proxy',
  ],
  proxy: {
    options: {
      target: 'https://collabro.ru',
      changeOrigin: true,
      pathFilter: [
        '/api',
      ]
    }
  },
});
