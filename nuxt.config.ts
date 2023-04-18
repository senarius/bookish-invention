// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  nitro: {
    externals: {
      inline: ['uuid'],
    },
    preset: "aws-lambda",
  },
  vite: {
    define: {
      "window.global": {}
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser'
      }
    }
  },
})
