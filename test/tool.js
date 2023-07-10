module.exports = {
    extractUsername,
    checkUrl
};

/**
 * 正则取用户名
 * @param {*} url 网址
 * @returns 
 */
function extractUsername(url) {
    const regex = /https:\/\/github\.com\/([^/]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}
//下载
const exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i
//反代proxy
const exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob|raw)\/.*$/i
const exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i
//请求
const exp4 = /^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+?\/.+$/i
const exp5 = /^(?:https?:\/\/)?gist\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+$/i
//未知
const exp6 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/tags.*$/i
/**
 * 检测网址
 * @param {*} u 
 * @returns 
 */
function checkUrl(url) {
    if (url.search(exp1) === 0) {
        return "download"
    } else if (url.indexOf(".git") !== -1) {
        return "git"
    }
    for (let i of [exp2, exp4, exp5, exp6]) {
        if (url.search(i) === 0) {
            return true
        }
    }
    return false
}
