const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: [path.resolve(__dirname, '../node_modules')],
        use: [{ loader: 'vue-loader' }, { loader: 'vue-svg-inline-loader' }]
      },
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, '../node_modules')],
        use: [
          {
            loader: 'thread-loader'
          },
          'babel-loader'
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, '../postcss.config.js')
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: [path.resolve(__dirname, '../src/icons')],
        loader: 'url-loader',
        options: {
          esModule: false,
          name: '[name].[ext]?[hash]',
          limit: 8192
        }
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, '../src/icons')],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        // exclude: [path.resolve(__dirname, '../node_modules')],
        loader: 'url-loader'
      },
      {
        test: /\.(csv|tsv)$/,
        exclude: [path.resolve(__dirname, '../node_modules')],
        use: ['csv-loader']
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./build/library/library.json')
    })
  ]
};
