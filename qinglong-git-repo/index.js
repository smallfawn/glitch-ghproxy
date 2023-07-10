
const express = require('express');
const app = express()

const { createProxyMiddleware } = require('http-proxy-middleware');
let dynamicPath = 'smallfawn'
app.use(`/${dynamicPath}`, createProxyMiddleware({
    target: 'https://github.com',
    changeOrigin: true,
    pathRewrite: {
        [`^/${dynamicPath}`]: `/${dynamicPath}`
    }
}));


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
