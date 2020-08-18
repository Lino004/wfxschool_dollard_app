module.exports = {
  pwa: {
    name: 'WFX - Dollar',
    manifestOptions: {
      short_name: 'WFX - Dollar',
      description: 'Service de vente de dollar de WfxSchool',
      theme_color: '#1e70b4',
      background_color: '#274688',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/login',
      icons: [
        {
          src: '/img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
}
