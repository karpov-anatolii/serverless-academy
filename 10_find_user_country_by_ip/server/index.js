const express = require('express');
const cors = require('cors');

const ipRouter = require('./routes/ip.routes');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/getip', ipRouter);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log('Ошибка запуска сервера', err);
  }
};

start();
