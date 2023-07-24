const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.argv.includes('--mode=development')
const esModule = process.env.BUILD_TARGET === 'esModule'
const isMinify = process.env.MINIFY === 'true'

const config = {
  mode: 'production',
  devtool: false,
  entry: {
    index: './src/index.js'
  },
  optimization: {
    usedExports: true,
    minimize: isMinify, // !isDev,
    // moduleIds: 'named',
    // chunkIds: 'named'
  },
  resolve: {
    fallback: {
      'crypto': false,
      'stream': false,
      'buffer': false
    }
  },
  output: {
    filename: isMinify ? '[name].min.js' : '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, esModule ? './es' : './lib'),
    library:
      esModule ? {
          type: 'module'
        }
        :
        {
          type: 'umd',
          name: 'Signature'
        },
    environment: {
      arrowFunction: false,
      const: false,
      destructuring: false,
      forOf: false,
      module: false
    }
  },
  devServer: {
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: [
    isDev &&
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ].filter(Boolean)
}

if (esModule) {
  config.experiments = {
    outputModule: true
  }
}

module.exports = config
