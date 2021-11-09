const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.argv.includes('--mode=development')

module.exports  = {
    mode: 'production',
    devtool: false,
    entry: {
        index: './src/index.js'
    },
    optimization:{
        usedExports: true,
        // minimize: !isDev,
        moduleIds: 'named',
        chunkIds: 'named'
    },
    resolve:{
        fallback:{
            'crypto': false,
            'stream': false,
            'buffer': false
        }
    },
    output: {
        filename: '[name].js',
        chunkFilename:'[name].js',
        path: path.resolve(__dirname, './lib'),
        library: 'Signature',
        libraryTarget: 'umd',
        environment: {
            arrowFunction: false,
            const: false,
            destructuring: false,
            forOf: false,
            module: false
        }
    },
    devServer:{
        port: 8080
    },
    module:{
        rules:[
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
            template:'./index.html'
        })
    ].filter(Boolean)
}
