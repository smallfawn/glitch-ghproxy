"use strict";

var express = require('express');

var url = require('url');

var path = require('path');

var app = express();

var tool = require("./tool");

var addProxyMiddleware = require('./proxy');

var axios = require('axios');

app.get('*', function _callee(req, res, next) {
  var originalUrl, parsedUrl, pathname, parameter, filePath, username;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          originalUrl = req.originalUrl;
          parsedUrl = url.parse(originalUrl);
          pathname = parsedUrl.pathname;
          parameter = pathname.substring(1); // 去除路径中的斜杠

          console.log(parameter);

          if (parameter == "") {
            console.log("\u65E0\u4EFB\u4F55\u8BF7\u6C42\u53C2\u6570");
            filePath = path.join(__dirname, 'index.html');
            res.sendFile(filePath);
          } else {
            if (tool.checkUrl(parameter) == "download") {
              console.log("\u4E0B\u8F7D");
            } else if (tool.checkUrl(parameter) == "git") {
              console.log("git\u62C9\u5E93");
              username = tool.extractUsername(parameter);
              axios.request({
                url: "https:githubproxy.glitch.me/gh/".concat(username)
              });
              next();
            } else if (tool.checkUrl(parameter) == true) {
              console.log("\u8BF7\u6C42\u9759\u6001\u6587\u4EF6");
            } else {
              console.log("\u4E0D\u662Fgithub\u94FE\u63A5");
            }
          } // 在这里可以对parameter进行进一步的处理
          //res.send('Received parameter: ' + parameter);


        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get('/gh/:path', function _callee2(req, res, next) {
  var dynamicPath;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          dynamicPath = req.params.path;
          console.log(dynamicPath);
          /*if (dynamicPath.includes('smallfawn')) {
              
          }*/

          _context2.next = 4;
          return regeneratorRuntime.awrap(addProxyMiddleware(app, dynamicPath));

        case 4:
          next();

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.listen(3000, function () {
  console.log('Server is running on port 3000');
});
/*app.get('*', async (req, res) => {

 
         addProxyMiddleware(app, 'smallfawn')

    // 在这里可以对parameter进行进一步的处理
    //res.send('Received parameter: ' + parameter);
});*/