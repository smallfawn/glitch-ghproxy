"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('http-proxy-middleware'),
    createProxyMiddleware = _require.createProxyMiddleware;

function addProxyMiddleware(app, dynamicPath) {
  app.use("/".concat(dynamicPath), createProxyMiddleware({
    target: 'https://github.com',
    changeOrigin: true,
    pathRewrite: _defineProperty({}, "^/".concat(dynamicPath), "/".concat(dynamicPath))
  }));
}

module.exports = addProxyMiddleware;