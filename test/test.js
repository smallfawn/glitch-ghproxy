const express = require('express');
const url = require('url');
const path = require('path')
const app = express();
const tool = require("./tool")
const addProxyMiddleware = require('./proxy');
const axios = require('axios');
app.get('*', async (req, res ,next) => {
    const originalUrl = req.originalUrl;
    const parsedUrl = url.parse(originalUrl);
    const pathname = parsedUrl.pathname;
    const parameter = pathname.substring(1); // 去除路径中的斜杠
    console.log(parameter);
    if (parameter == "") {
        console.log(`无任何请求参数`);
        const filePath = path.join(__dirname, 'index.html');
        res.sendFile(filePath);
    } else {
        if (tool.checkUrl(parameter) == "download") {
            console.log(`下载`);

        } else if (tool.checkUrl(parameter) == "git") {
            console.log(`git拉库`);
            let username = tool.extractUsername(parameter)
            axios.request({url:`https:githubproxy.glitch.me/gh/${username}`})
             next()
        } else if (tool.checkUrl(parameter) == true) {
            console.log(`请求静态文件`);
        } else {
            console.log(`不是github链接`);
        }
    }
    // 在这里可以对parameter进行进一步的处理
    //res.send('Received parameter: ' + parameter);
});

app.get('/gh/:path', async (req, res, next) => {
    const dynamicPath = req.params.path;
    console.log(dynamicPath);
    /*if (dynamicPath.includes('smallfawn')) {
        
    }*/
    await addProxyMiddleware(app, dynamicPath);
    next();
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


/*app.get('*', async (req, res) => {

 
         addProxyMiddleware(app, 'smallfawn')

    // 在这里可以对parameter进行进一步的处理
    //res.send('Received parameter: ' + parameter);
});*/