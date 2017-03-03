import path from 'path'
import webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import DependencyInjectionPlugin from 'inject-webpack-plugin'
import cssnext from 'postcss-cssnext'
import postcssUrl from 'postcss-url';
import postcssImport from 'postcss-import';
import postcssReporter from 'postcss-reporter';
import postcssBrowserReporter from 'postcss-browser-reporter';

import pkg from './package.json'

const env = process.env.NODE_ENV || 'development'
const globals = {
  'process.env.NODE_ENV': JSON.stringify(env),
  '__DEV__': env === 'development',
  '__PROD__': env === 'production'
}
const { __DEV__, __PROD__ } = globals

const devtool = __DEV__ ? 'eval-source-map' : null
const hashtype = __DEV__ ? 'hash' : 'chunkhash'
const publicPath = '/'
const stats = {
  colors: true,
  hash: false,
  timings: true,
  chunks: __DEV__ ? false : true,
  chunkModules: __DEV__ ? false : true,
  modules: false
}

let plugins = [
  new webpack.DefinePlugin(globals),
  new HtmlPlugin({
    template: 'index.html',
    hash: false,
    filename: 'index.html',
    inject: true
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[' + hashtype + '].js')
]

if (__DEV__) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DependencyInjectionPlugin({
      'store/configure': 'store/configure.dev',
      'domains/Root': 'domains/Root/index.dev'
    })
  )
} else if (__PROD__) {
  plugins.push(
    new ExtractTextPlugin('[name]-[' + hashtype + '].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
        drop_console: true
      },
      comments: false
    })
  )
}

let loaders = [];

if (__DEV__) {
  loaders.push({
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    loader: 'react-hot!babel'
  }, {
    test: /\.pcss?$/,
    loader: 'style!css?modules!sourceMap!postcss'
  }, {
    test: /\.css?$/,
    loader: 'style!css'
  })
} else if (__PROD__) {
  loaders.push({
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    loader: 'babel'
  }, {
    test: /\.pcss$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
  }, {
    test: /\.css?$/,
    loader: ExtractTextPlugin.extract('style', 'css')
  })
}

export default {
  devtool: devtool,
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['babel-polyfill', 'index.js'],
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[' + hashtype + '].js',
    publicPath: publicPath
  },
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins,
  module: {
    loaders: loaders
  },
  stats: stats,
  devServer: {
    publicPath: publicPath,
    hot: true,
    historyApiFallback: true,
    stats: stats,
    host: '0.0.0.0',
    port: 4000
  },
  postcss: [
    cssnext,
    postcssBrowserReporter,
    postcssReporter,
    postcssUrl,
    postcssImport
  ]
};
