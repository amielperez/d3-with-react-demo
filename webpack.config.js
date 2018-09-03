const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DelWebpackPlugin = require('del-webpack-plugin');

const BASE_DIR = 'client';
const PUBLIC_DIR = 'public'
const SRC_DIR = 'src'

const config = {
    context: path.resolve(__dirname, BASE_DIR),
    entry: {
        vendor: './src/vendor.js',
        'pure-d3': [
            'event-source-polyfill',
            'webpack-hot-middleware/client?reload=true',
            `./${SRC_DIR}/pure-d3/index.js`
        ],
        'd3-react': [
            'event-source-polyfill',
            'webpack-hot-middleware/client?reload=true',
            `./${SRC_DIR}/d3-react/index.js`
        ]
    },
    output: {
        filename: '[name].[hash:8].bundle.js',
        path: path.resolve(__dirname, BASE_DIR, PUBLIC_DIR),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'pure-d3'],
            chunksSortMode: 'manual',
            filename: 'pureD3.html',
            template: `./${SRC_DIR}/pure-d3/index.html`,
        }),
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'd3-react'],
            chunksSortMode: 'manual',
            filename: 'D3React.html',
            template: `./${SRC_DIR}/d3-react/index.html`,
        }),
        new DelWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}

module.exports = config;
