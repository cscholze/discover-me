'use strict';

module.exports = (sequelize, DataTypes) => {
  const openPort = sequelize.define('openPort', {
    hostID: DataTypes.INTEGER,
    portNumber: DataTypes.INTEGER,
    protocol: DataTypes.STRING,
    service: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        openPort.hasMany(models.vulnerability);
      }
    }
  });
  return openPort;
}
