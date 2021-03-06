const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const os = require('os');

function networkIP() {
  const ifaces = os.networkInterfaces();
  let ip = '';
  for (let dev in ifaces) {
    ifaces[dev].forEach(details => {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address;
        return;
      }
    });
  }

  return ip || '127.0.0.1';
}

const HOST = process.env.HOST;
const IP = networkIP();

module.exports = {
  mode: 'development',
  entry: './index.js',
  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    },
    clientLogLevel: 'none',
    historyApiFallback: true,
    host: HOST || IP,
    port: 8080,
    contentBase: path.join(__dirname, '../static'),
    proxy: {
      '/api': {
        target: 'http://192.168.1.189:9081',
        // target: 'http://10.129.9.248:9081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  output: {
    chunkFilename: '[name].[hash].bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  optimization: {
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
        test: /\.(js|vue)$/,
        exclude: [path.resolve(__dirname, '../node_modules')],
        use: ['eslint-loader'],
        enforce: 'pre'
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
          runtimeCompat: true,
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
        loader: 'csv-loader'
      }
    ]
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      title: '?????????'
    }),
    new FaviconsWebpackPlugin('public/favicon.ico'),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./build/library/library.json')
    })
  ]
};
