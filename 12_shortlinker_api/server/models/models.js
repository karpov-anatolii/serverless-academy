const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Url = sequelize.define('url', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  short: { type: DataTypes.STRING },
  original: { type: DataTypes.STRING },
});

module.exports = {
  Url,
};
