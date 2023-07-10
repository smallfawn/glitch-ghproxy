"use strict";

var express = require('express');

var app = express();

var addProxyMiddleware = require('./proxy');

app.get('/:path', function (req, res, next) {
  var dynamicPath = req.params.path;
  console.log(dynamicPath);
  /*if (dynamicPath.includes('smallfawn')) {
      
  }*/

  addProxyMiddleware(app, dynamicPath);
  next();
});
app.listen(3000, function () {
  console.log('Server is running on port 3000');
});