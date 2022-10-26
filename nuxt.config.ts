// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
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
      baseURL: process.env.NUXT_APP_BASE_URL,
    },
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '~/assets/css/tailwind.css',
    '~/assets/css/transitions.css',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
});
