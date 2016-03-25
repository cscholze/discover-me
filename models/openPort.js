'use strict';

module.exports = (sequelize, DataTypes) => {
  const openPort = sequelize.define('openPort', {
    portNumber: DataTypes.INTEGER,
    protocol: DataTypes.STRING,
    service: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        openPort.hasMany(models.vulnerability, {onDelete: 'cascade'});
      }
    }
  });
  return openPort;
}
