const sequelize = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Session = sequelize.define('session', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4 },
  fingerprint: { type: DataTypes.TEXT, allowNull: false },
  expiresIn: { type: DataTypes.BIGINT, allowNull: false },
});

User.hasMany(Session, { onDelete: 'cascade' });
Session.belongsTo(User);

module.exports = {
  User,
  Session,
};
