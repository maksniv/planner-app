export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern-compiler'
        }
      },
    },
  },
  css: ['@/assets/style/reset.css', '@/assets/style/variables.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  modules: ['@nuxtjs/google-fonts', 'nuxt-icon', '@pinia/nuxt', '@nuxtjs/color-mode'],
  plugins: [
    {src: '~/plugins/vClickOutside.client.ts', mode: 'all'},
  ],
  googleFonts: {
    families: {
      'Plus Jakarta Sans': {
        wght: [300, 400, 700],
      },
    },
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
  }
});
