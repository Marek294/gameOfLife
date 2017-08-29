'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);

var webpack = void 0;
var webpackMiddleware = void 0;
var webpackHotMiddleware = void 0;
var webpackConfig = void 0;

if (process.env.NODE_ENV.trim() === 'development') {
    webpack = require('webpack');
    webpackMiddleware = require('webpack-dev-middleware');
    webpackHotMiddleware = require('webpack-hot-middleware');

    webpackConfig = require('../webpack.config.dev');
    var compiler = webpack(webpackConfig);

    app.use(webpackMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
    }));
}

app.use(_express2.default.static('public'));

app.get('/*', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../public/index.html'));
});

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function () {
    return console.log('Running on localhost:' + app.get('port'));
});
//# sourceMappingURL=index.js.map