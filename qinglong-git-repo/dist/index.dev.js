"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var app = express();

var _require = require('http-proxy-middleware'),
    createProxyMiddleware = _require.createProxyMiddleware;

var dynamicPath = 'smallfawn';
app.use("/".concat(dynamicPath), createProxyMiddleware({
  target: 'https://github.com',
  changeOrigin: true,
  pathRewrite: _defineProperty({}, "^/".concat(dynamicPath), "/".concat(dynamicPath))
}));
app.listen(3000, function () {
  console.log('Server is running on port 3000');
});