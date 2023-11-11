require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');

const authRouter = require('./routes/auth.routes');
const meRouter = require('./routes/me.routes');
const jsonRouter = require('./routes/json.routes');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
//app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/me', meRouter);
app.use('/demo_bucket', jsonRouter);

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
