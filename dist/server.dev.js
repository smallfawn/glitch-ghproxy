"use strict";

var express = require('express');

var app = express();

var path = require('path');

var axios = require('axios');

var fs = require('fs');

var exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i;
var exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob|raw)\/.*$/i;
var exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i;
var exp4 = /^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+?\/.+$/i;
var exp5 = /^(?:https?:\/\/)?gist\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+$/i;
var exp6 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/tags.*$/i;

function checkUrl(u) {
  if (u.search(exp1) === 0) {
    return "download";
  }

  for (var _i = 0, _arr = [exp2, exp3, exp4, exp5, exp6]; _i < _arr.length; _i++) {
    var i = _arr[_i];

    if (u.search(i) === 0) {
      return true;
    }
  }

  return false;
} //


app.get('/', function (req, res) {
  var filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});
app.get(/^\/(.+)$/, function (req, res) {
  var apiUrl = req.params[0]; // 在这里可以使用apiUrl参数进行相应的处理逻辑

  console.log(apiUrl);

  if (checkUrl(apiUrl) == "download") {
    download(apiUrl, res);
  } else {
    show(apiUrl, res);
  } //res.send('API请求的参数为: ' + apiUrl);

});

function download(fileUrl, res) {
  var lastIndex = fileUrl.lastIndexOf('/');
  var filename = fileUrl.substring(lastIndex + 1, fileUrl.length);
  axios({
    url: fileUrl,
    method: 'GET',
    responseType: 'stream',
    onDownloadProgress: function onDownloadProgress(progressEvent) {
      var progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
      console.log(progress); //监听下载进度
    }
  }).then(function (response) {
    res.setHeader('Content-Disposition', "attachment; filename=".concat(filename));
    res.setHeader('Content-Type', 'application/octet-stream');
    response.data.pipe(res);
  })["catch"](function (error) {
    console.error('下载文件时发生错误:', error);
    res.status(500).send('下载文件时发生错误');
  });
}

function show(rawUrl, res) {
  var response;
  return regeneratorRuntime.async(function show$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(rawUrl);
          _context.next = 4;
          return regeneratorRuntime.awrap(axios.get(rawUrl, {
            headers: {
              'Accept-Encoding': 'identity'
            }
          }));

        case 4:
          response = _context.sent;
          res.send(response.data); //console.log(response)

          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            error: 'An error occurred'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

var configPath = path.join(__dirname, 'config.json');
var config = {};

try {
  var configFile = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configFile);
} catch (error) {
  console.error(error);
}

if (config.refreshStatus && config.refreshTime && config.glitchAppUrl) {
  setInterval(function _callee() {
    var response;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(axios.get(config.glitchAppUrl));

          case 3:
            response = _context2.sent;
            _context2.next = 9;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 6]]);
  }, config.refreshTime);
}

var port = 3000;
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});