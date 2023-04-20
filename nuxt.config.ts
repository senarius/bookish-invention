// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/',
    },
  },
  routeRules: {
    '/**': { headers: { 'Access-Control-Allow-Origin': '*' } },
    '/api/v1/**': { cors: true },
  },
  
})
