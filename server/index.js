import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';

let app = express();

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

const port = process.env.port || 3000;

app.listen(port, () => console.log(`Running on localhost:${port}`));