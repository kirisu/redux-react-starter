import path from 'path'
import webpack from 'webpack'
import HtmlPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import DependencyInjectionPlugin from 'inject-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

import config from './config'

const { __DEV__, __PROD__ } = config.globals

const MAIN = 'index.js'
const APP_ENTRY_PATHS = [MAIN]

let plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlPlugin({
    template: 'index.html',
    hash: false,
    filename: 'index.html',
    inject: true
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[' + config.compiler_hashType + '].js')
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
    new ExtractTextPlugin('[name]-[' + config.compiler_hashType + '].css'),
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
    loader: 'react-hot!babel!eslint'
  }, {
    test: /\.scss?$/,
    loader: 'style!css?modules&localIdentName=[local][hash:base64:5]&sourceMap!sass?sourceMap'
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
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules!postcss!sass')
  }, {
    test: /\.css?$/,
    loader: ExtractTextPlugin.extract('style', 'css')
  })
}

export default {
  devtool: config.compiler_devtool,
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: APP_ENTRY_PATHS,
    vendor: config.compiler_vendor
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[' + config.compiler_hashType + '].js',
    publicPath: config.compiler_publicPath
  },
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins,
  module: {
    loaders: loaders
  },
  stats: config.compiler_stats,
  devServer: {
    publicPath: config.compiler_publicPath,
    hot: true,
    historyApiFallback: true,
    stats: config.compiler_stats,
    host: '0.0.0.0',
    port: '4000'
  },
  postcss: __PROD__ ? [ autoprefixer, cssnano ] : []
};
