'use strict';

module.exports = (sequelize, DataTypes) => {
  const scan = sequelize.define('scan', {
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: (models) => {
        scan.hasMany(models.host);
      }
    }
  });
  return scan;
}
