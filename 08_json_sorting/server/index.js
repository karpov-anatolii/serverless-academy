require('dotenv').config();
const path = require('path');
const express = require('express');
const router = require('./routes/index');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/sls-team', router);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log('Error server starting:', err);
  }
};

start();
