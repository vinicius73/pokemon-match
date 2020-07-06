const { minify } = require('html-minifier')
const fs = require('fs')
const pkg = require('./package.json')

process.env.VUE_APP_VERSION = pkg.version
process.env.VUE_APP_CRITICAL_CSS = minify(
  fs.readFileSync('src/assets/critical.html', { encoding: 'utf-8' }), {
    removeAttributeQuotes: true,
    minifyCSS: {
      level: 2
    }
  }
)

module.exports = {
  productionSourceMap: false,
  css: {
    extract: { ignoreOrder: true }
  },
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
  chainWebpack: config => {
    config.plugin('prefetch').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || []
      options[0].fileBlacklist.push(/page-(.)+?\.js$/)
      return options
    })
  },
  pwa: {
    name: 'Pokémon Match - Game Collection',
    themeColor: '#b72c3d',
    msTileColor: '#b72c3d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    assetsVersion: pkg.version,
    manifestOptions: {
      short_name: 'Pokémon Match',
      orientation: 'portrait',
      description: 'Test your knowledge, do you know these pokémon?',
      screenshots: [{
        src: 'cover.png',
        type: 'image/png'
      }]
    },
    workboxOptions: {
      cacheId: `${pkg.name}@${pkg.version}`,
      clientsClaim: true,
      skipWaiting: true,
      cleanupOutdatedCaches: true,
      exclude: /(_redirects|_headers|cover.png|robots.txt|icons\/apple)/,
      importScripts: [
        '/sw.cache.js'
      ]
    }
  }
}
