const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const exp1 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:releases|archive)\/.*$/i
const exp2 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:blob|raw)\/.*$/i
const exp3 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/(?:info|git-).*$/i
const exp4 = /^(?:https?:\/\/)?raw\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+?\/.+$/i
const exp5 = /^(?:https?:\/\/)?gist\.(?:githubusercontent|github)\.com\/.+?\/.+?\/.+$/i
const exp6 = /^(?:https?:\/\/)?github\.com\/.+?\/.+?\/tags.*$/i

function checkUrl(u) {
  if (u.search(exp1) === 0) {
    return "download"
  }
  for (let i of [exp2, exp3, exp4, exp5, exp6]) {
    if (u.search(i) === 0) {
      return true
    }
  }
  return false
}

//
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});
app.get(/^\/(.+)$/, (req, res) => {
  const apiUrl = req.params[0];
  // 在这里可以使用apiUrl参数进行相应的处理逻辑
  console.log(apiUrl);
  if (checkUrl(apiUrl) == "download") {
    download(apiUrl, res)
  } else {
    show(apiUrl, res)
  }
  //res.send('API请求的参数为: ' + apiUrl);
});



function download(fileUrl, res) {
  const lastIndex = fileUrl.lastIndexOf('/');
  const filename = fileUrl.substring(lastIndex + 1, fileUrl.length);
  axios({
    url: fileUrl,
    method: 'GET',
    responseType: 'stream',
    onDownloadProgress: progressEvent => {
      const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      console.log(progress)
      //监听下载进度
    },
  }).then(response => {
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    response.data.pipe(res);
  }).catch(error => {
    console.error('下载文件时发生错误:', error);
    res.status(500).send('下载文件时发生错误');
  });
}

async function show(rawUrl, res) {
  try {
    console.log(rawUrl)
    const response = await axios.get(rawUrl, { headers: { 'Accept-Encoding': 'identity' } });
    res.send(response.data);
    //console.log(response)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

const configPath = path.join(__dirname, 'config.json');
let config = {};
try {
  const configFile = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configFile);
} catch (error) {
  console.error(error);
}
if (config.refreshStatus && config.refreshTime && config.glitchAppUrl) {
  setInterval(async () => {
    try {
      const response = await axios.get(config.glitchAppUrl);
      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, config.refreshTime);
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});