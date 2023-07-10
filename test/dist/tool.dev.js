"use strict";

module.exports = {
  extractUsername: extractUsername,
  checkUrl: checkUrl
};
/**
 * 正则取用户名
 * @param {*} url 网址
 * @returns 
 */

function extractUsername(url) {
  var regex = /https:\/\/github\.com\/([^/]+)/;
  var match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
} //下载


var exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i; //反代proxy

var exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob|raw)\/.*$/i;
var exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i; //请求

var exp4 = /^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+?\/.+$/i;
var exp5 = /^(?:https?:\/\/)?gist\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+$/i; //未知

var exp6 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/tags.*$/i;
/**
 * 检测网址
 * @param {*} u 
 * @returns 
 */

function checkUrl(url) {
  if (url.search(exp1) === 0) {
    return "download";
  } else if (url.indexOf(".git") !== -1) {
    return "git";
  }

  for (var _i = 0, _arr = [exp2, exp4, exp5, exp6]; _i < _arr.length; _i++) {
    var i = _arr[_i];

    if (url.search(i) === 0) {
      return true;
    }
  }

  return false;
}