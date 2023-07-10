const { createProxyMiddleware } = require('http-proxy-middleware');

function addProxyMiddleware(app, dynamicPath) {
    app.use(`/${dynamicPath}`, createProxyMiddleware({
        target: 'https://github.com',
        changeOrigin: true,
        pathRewrite: {
            [`^/${dynamicPath}`]: `/${dynamicPath}`
        }
    }));
}

module.exports = addProxyMiddleware;