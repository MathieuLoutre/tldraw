/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')

const { NODE_ENV } = process.env

const isProduction = NODE_ENV === 'production'

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    disable: !isProduction,
    dest: 'public',
  },
  productionBrowserSourceMaps: true,
  webpack: (config, options) => {
    config.plugins.push(
      new options.webpack.DefinePlugin({
        'process.env.NEXT_IS_SERVER': JSON.stringify(options.isServer.toString()),
      })
    )

    config.module.rules.push({
      test: /.*packages.*\.js$/,
      use: ['source-map-loader'],
      enforce: 'pre',
    })

    return config
  },
})
