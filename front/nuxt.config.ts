export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['@/assets/style/reset.css', '@/assets/style/variables.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: ['@nuxtjs/google-fonts', 'nuxt-icon', '@pinia/nuxt'],
  googleFonts: {
    families: {
      'Plus Jakarta Sans': {
        wght: [300, 400, 700],
      },
    },
  },
});
