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
const refresh = require('./refresh');
app.use(proxyMiddleware);
refresh()
// 其他路由和中间件

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});