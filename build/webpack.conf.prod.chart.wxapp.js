const path = require('path')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const common = require('./webpack.conf.common')

const fs = require('fs');

const babelConf = JSON.parse(fs.readFileSync('./.wxapp.babelrc'));
babelConf.babelrc = false;

const os = require('os')
const Happypack = require('happypack')
const threadPoll = Happypack.ThreadPool({ size: os.cpus().length })
common.plugins[1] = new Happypack({
  id: 'babel',
  loaders: [
    {
      loader: 'babel-loader',
      options: babelConf
    }
  ],
  threadPool: threadPoll,
  verbose: false
});

module.exports = merge(common, {
  entry: {
    index: path.resolve(__dirname, '../src/')
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../miniprogram'),
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
      root: './sprite-wxapp.js',
      commonjs2: './sprite-wxapp.js',
      commonjs: './sprite-wxapp.js',
      amd: './sprite-wxapp.js',
      umd: './sprite-wxapp.js'
    }
  }
  // plugins: [new BundleAnalyzer()]
})
