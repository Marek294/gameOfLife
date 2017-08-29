import express from 'express';
import path from 'path';

let app = express();

let webpack;
let webpackMiddleware;
let webpackHotMiddleware;
let webpackConfig;

if(process.env.NODE_ENV.trim() === 'development') {
    webpack = require('webpack');
    webpackMiddleware = require('webpack-dev-middleware');
    webpackHotMiddleware = require('webpack-hot-middleware');

    webpackConfig = require('../webpack.config.dev');
    const compiler = webpack(webpackConfig);

    app.use(webpackMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
    }));
}

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => console.log(`Running on localhost:${app.get('port')}`));