import environments from './environments'
import pkg from '../package.json'

const env = process.env.NODE_ENV || 'development'
const overrides = environments[env]

const config = {
  compiler_cssModules: true,
  compiler_devtool: 'eval-source-map',
  compiler_hashType: 'hash',
  compiler_failOnWarning: false,
  compiler_quiet: false,
  compiler_publicPath: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendor: Object.keys(pkg.dependencies),
  globals: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    '__DEV__': env === 'development',
    '__PROD__': env === 'production',
    '__TEST__': env === 'test',
    '__APP_NAME__': JSON.stringify(pkg.name),
    '__APP_VERSION__': JSON.stringify(pkg.version),
  }
};

if (overrides) {
  Object.assign(config, overrides(config))
}

export default config
