const express = require('express');
const axios = require('axios');
const app = express();
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
  
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });