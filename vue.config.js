/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('./package.json')

process.env.VUE_APP_VERSION = pkg.version

module.exports = {
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    node: { Buffer: false },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vuetify: {
            priority: 7,
            test: /\/vuetify/,
            name: 'vuetify',
            chunks: 'all'
          },
          'lodash-es': {
            priority: 6,
            test: /\/lodash-es/,
            name: 'lodash-es',
            chunks: 'all'
          },
          vue: {
            priority: 7,
            test: /(\/vue\/|\/vuex\/|\/vue-router\/)/,
            name: 'vue',
            chunks: 'all'
          }
        }
      }
    }
  },
  pwa: {
    name: 'Pokémon Match - Game Collection',
    themeColor: '#b72c3d',
    msTileColor: '#b72c3d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      short_name: 'Pokémon Match'
    },
    workboxOptions: {
      cacheId: `${pkg.name}@${pkg.version}`,
      clientsClaim: true,
      exclude: /_redirects/,
      importScripts: [
        '/sw.cache.js'
      ]
    }
  }
}
