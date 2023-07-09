const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});
app.get('/raw/*', async (req, res) => {
  const rawUrl = req.params[0];
  console.log(rawUrl);
  try {
    const response = await axios.get(rawUrl, { headers: { 'Accept-Encoding': 'identity' } });
    res.send(response.data);
    //console.log(response)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
  //res.send('URL参数获取成功');
});

/*setInterval(async () => {
  const response = await axios.get('https://这里写你的项目地址')
  console.log(response.data);
}, 300000);*///每5分钟请求一次自己的API保活防止休眠

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});