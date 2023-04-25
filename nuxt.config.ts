// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/',
    },
  },
  vite: {
    define: {
      'window.global': {},
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
        '#imports': resolve(__dirname, './.nuxt/imports.d.ts')
      },
    },
  },
  // routeRules: {
  //   '/**': { headers: { 'Access-Control-Allow-Origin': '*' } },
  //   '/api/v1/**': { cors: true },
  // },
})
