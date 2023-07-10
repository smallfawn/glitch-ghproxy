"use strict";

var express = require('express');

var app = express();

var addProxyMiddleware = require('./proxy');

app.get('/:path', function _callee(req, res, next) {
  var dynamicPath;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          dynamicPath = req.params.path;
          console.log(dynamicPath);

          if (dynamicPath.includes('smallfawn')) {}

          _context.next = 5;
          return regeneratorRuntime.awrap(addProxyMiddleware(app, dynamicPath));

        case 5:
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Server is running on port 3000');
});