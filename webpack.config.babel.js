import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import DependencyInjectionPlugin from 'inject-webpack-plugin';
import cssnext from 'postcss-cssnext';
import postcssUrl from 'postcss-url';
import postcssImport from 'postcss-import';
import postcssReporter from 'postcss-reporter';
import postcssBrowserReporter from 'postcss-browser-reporter';

import manifest from './dist/vendor-manifest.json';

import pkg from './package.json';

const env = process.env.NODE_ENV || 'development';
const globals = {
  'process.env.NODE_ENV': JSON.stringify(env),
  __DEV__: env === 'development',
  __PROD__: env === 'production'
};
const { __DEV__, __PROD__ } = globals;

const devtool = __DEV__ ? 'eval-source-map' : false;
const hashtype = __DEV__ ? 'hash' : 'chunkhash';
const publicPath = '/';
const stats = {
  colors: true,
  hash: false,
  timings: true,
  chunks: __DEV__ ? false : true,
  chunkModules: __DEV__ ? false : true,
  modules: false
};

let plugins = [
  new webpack.DefinePlugin(globals),
  new webpack.DllReferencePlugin({
    context: path.resolve(__dirname, 'dist'),
    manifest: manifest
  }),
  new HtmlWebpackPlugin({
    template: 'index.hbs',
    hash: false,
    filename: 'index.html',
    inject: true
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      context: __dirname
    },
    postcss: [
      cssnext,
      postcssBrowserReporter,
      postcssReporter,
      postcssUrl,
      postcssImport
    ]
  })
];

if (__DEV__) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DependencyInjectionPlugin({
      'store/configure': 'store/configure.dev',
      'domains/Root': 'domains/Root/index.dev'
    })
  );
} else if (__PROD__) {
  plugins.push(
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
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
  );
}

let loaders = [
  {
    test: /\.hbs$/,
    use: 'handlebars-loader'
  }
];

if (__DEV__) {
  loaders.push(
    {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      use: ['react-hot-loader', 'babel-loader']
    },
    {
      test: /\.pcss?$/,
      use: ['style-loader', 'css-loader?modules&sourceMap', 'postcss-loader']
    },
    {
      test: /\.css?$/,
      use: ['style-loader', 'css-loader']
    }
  );
} else if (__PROD__) {
  loaders.push(
    {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    },
    {
      test: /\.pcss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?modules', 'postcss-loader']
      })
    },
    {
      test: /\.css?$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }
  );
}

export default {
  devtool: devtool,
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['babel-polyfill', 'index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[' + hashtype + '].js',
    publicPath: publicPath
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['.js', '.jsx']
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
  }
};
