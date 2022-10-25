// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
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
