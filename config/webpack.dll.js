const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    library: ['vue', 'vue-router', 'vue-i18n', 'axios']
  },

  output: {
    filename: '[name]_[hash].dll.js',
    path: path.resolve(__dirname, './build/library'),
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname, './build/library/[name].json')
    })
  ]
}
