//let dynamicPath = 'smallfawn'
/*app.use(`/${dynamicPath}`, createProxyMiddleware({
    target: 'https://github.com',
    changeOrigin: true,
    pathRewrite: {
        [`^/${dynamicPath}`]: `/${dynamicPath}`
    }
}));*/
const express = require('express');
const app = express();
const proxyMiddleware = require('./proxyMiddleware');

app.use(proxyMiddleware);

// 其他路由和中间件

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});