import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DependencyInjectionPlugin from 'inject-webpack-plugin';

import vendorManifest from './dist/vendor-manifest.json';

import pkg from './package.json';

const CLIENT_HOST = '0.0.0.0';
const CLIENT_PORT = 4000;

const env = process.env.NODE_ENV || 'development';
const globals = {
  'process.env.NODE_ENV': JSON.stringify(env),
  __DEV__: env === 'development',
  __PROD__: env === 'production',
  CLIENT_HOST: CLIENT_HOST,
  CLIENT_PORT: CLIENT_PORT,
  ASSETS_MANIFEST: ''
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
    manifest: vendorManifest
  }),
  new HtmlWebpackPlugin({
    template: 'index.html',
    hash: false,
    filename: 'index.html',
    inject: true
  })
];

if (__DEV__) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DependencyInjectionPlugin({
      'store/configure': 'store/configure.dev',
      'containers/Root': 'containers/Root/index.dev'
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

let loaders = [];

if (__DEV__) {
  loaders.push({
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    use: ['react-hot-loader', 'babel-loader']
  });
} else if (__PROD__) {
  loaders.push({
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  });
}

export default function(options) {
  return {
    node: {
      __dirname: true,
      __filename: true
    },
    devtool: devtool,
    context: path.resolve(__dirname, 'src'),
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules')
      ]
    },
    entry: {
      app: ['babel-polyfill', 'index.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[' + hashtype + '].js',
      publicPath: publicPath
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
      host: globals.CLIENT_HOST,
      port: globals.CLIENT_PORT
    }
  };
}
