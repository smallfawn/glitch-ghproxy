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

module.exports = {
    extractUsername,

};