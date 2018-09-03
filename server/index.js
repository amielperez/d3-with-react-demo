const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require(path.resolve(__dirname, '../webpack.config.js'));

const app = express();
const compiler = webpack(webpackConfig);
const PUBLIC_DIR = '../client/public';

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    },
}));

app.use(webpackHotMiddleware(compiler));

app.listen(8080, () => {
    console.log('App listening at port 8080');
});
