const express = require('express');
const fs = require('fs').promises;

const app = express();

app.use(express.static('public'));

app.get('config', async (req, res) => {
  const configFile = fs.readFile('config.json');
  return configFile;
});

app.listen(3544, '0.0.0.0');
