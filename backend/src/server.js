const Config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Checkcar server running here!');
});

app.get('/api/test', (req, res) => {
  res.send({message: "Checkcar API it's working! \o/" });
});

module.exports = app;