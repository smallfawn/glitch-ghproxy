const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const fs = require('fs');

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