'use strict';

module.exports = (sequelize, DataTypes) => {
  const host = sequelize.define('host', {
    ipAddress: DataTypes.STRING,
    scanID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        host.hasMany(models.openPort);
      }
    }
  });
  return host;
}
