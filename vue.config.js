/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('./package.json')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

process.env.VUE_APP_VERSION = pkg.version

module.exports = {
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
          }
        }
      }
    }
  }
  // configureWebpack: config => {
  //   // get a reference to the existing ForkTsCheckerWebpackPlugin
  //   const existingForkTsChecker = config.plugins.filter(
  //     p => p instanceof ForkTsCheckerWebpackPlugin
  //   )[0]

  //   // remove the existing ForkTsCheckerWebpackPlugin
  //   // so that we can replace it with our modified version
  //   config.plugins = config.plugins.filter(
  //     p => !(p instanceof ForkTsCheckerWebpackPlugin)
  //   )

  //   // copy the options from the original ForkTsCheckerWebpackPlugin
  //   // instance and add the memoryLimit property
  //   const forkTsCheckerOptions = existingForkTsChecker.options
  //   // forkTsCheckerOptions.memoryLimit = 8192
  //   forkTsCheckerOptions.workers = 2

  //   config.plugins.push(new ForkTsCheckerWebpackPlugin(forkTsCheckerOptions))
  // }
}
