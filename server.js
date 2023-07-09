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
      const response = await axios.get(rawUrl, {headers: {'Accept-Encoding': 'identity'}});
      res.send(response.data);
      //console.log(response)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
    //res.send('URL参数获取成功');
  });
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});