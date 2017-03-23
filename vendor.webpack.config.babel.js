import webpack from 'webpack';
import path from 'path';

import pkg from './package.json';

export default function(options) {
  return {
    entry: {
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      filename: '[name]-[hash].js',
      path: path.resolve(__dirname, 'dist'),
      library: '[name]_[hash]_lib'
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(__dirname, 'dist', '[name]-manifest.json'),
        name: '[name]_[hash]_lib'
      })
    ],
    module: {
      loaders: [
        {
          test: /\.css?$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  };
}
