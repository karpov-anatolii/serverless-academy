require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');

const shortLinkerRouter = require('./routes/shortlinker.routes');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
//app.use(cors());
app.use(express.json());
app.use('/', shortLinkerRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (err) {
    console.log('Ошибка подключения к БД', err);
  }
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log('Ошибка запуска сервера', err);
  }
};

start();
