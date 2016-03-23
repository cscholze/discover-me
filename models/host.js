'use strict';

module.exports = (sequelize, DataTypes) => {
  const host = sequelize.define('host', {
    ipAddress: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        host.hasMany(models.openPort);
      }
    }
  });
  return host;
}
