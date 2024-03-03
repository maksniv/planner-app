export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  css: ['@/assets/style/reset.css'],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/style/variables.sass"',
        },
      },
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: ['@nuxtjs/google-fonts', 'nuxt-icon', '@pinia/nuxt'],
  googleFonts: {
    families: {
      Lato: {
        wght: [300, 400, 700],
        ital: '300',
      },
    },
  },
});
