'use strict';

module.exports = (sequelize, DataTypes) => {
  const scan = sequelize.define('scan', {
    userID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        scan.hasMany(models.host);
      }
    }
  });
  return scan;
}
