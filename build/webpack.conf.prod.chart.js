const path = require('path')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const common = require('./webpack.conf.common')

module.exports = merge(common, {
  entry: {
    index: path.resolve(__dirname, '../src/')
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../lib'),
    filename: '[name].js',
    library: 'qcharts',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  externals: {
    spritejs: {
      root: 'spritejs',
      commonjs2: 'spritejs/dist/spritejs.min.js',
      commonjs: 'spritejs/dist/spritejs.min.js',
      amd: 'spritejs',
      umd: 'spritejs'
    }
  }
  // plugins: [new BundleAnalyzer()]
})
