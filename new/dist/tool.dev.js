"use strict";

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
}

module.exports = {
  extractUsername: extractUsername
};