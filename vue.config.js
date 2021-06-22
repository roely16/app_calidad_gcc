module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
  ? '/catastro/GestionServicios/apps/app_calidad_gcc/'
  : '/',
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
}