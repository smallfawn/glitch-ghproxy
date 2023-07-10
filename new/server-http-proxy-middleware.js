const express = require('express');
const app = express();
const addProxyMiddleware = require('./proxy');

app.get('/:path', async (req, res, next) => {
    const dynamicPath = req.params.path;
    console.log(dynamicPath);
    if (dynamicPath.includes('smallfawn')) {
        
    }
    await addProxyMiddleware(app, dynamicPath);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});