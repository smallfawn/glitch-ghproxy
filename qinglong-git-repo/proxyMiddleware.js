const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(req, res, next) {
    const apiUrl = req.originalUrl.substring(1);
    const proxyMiddleware = createProxyMiddleware({
        target: 'https://github.com',
        changeOrigin: true,
        pathRewrite: {
            [`^/${apiUrl}`]: `/${apiUrl}`
        }
    });

    proxyMiddleware(req, res, next);
};

