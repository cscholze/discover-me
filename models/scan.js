'use strict';

module.exports = (sequelize, DataTypes) => {
  const scan = sequelize.define('scan', {
    name: DataTypes.DATE
  }, {
    classMethods: {
      associate: (models) => {
        scan.hasMany(models.host, {onDelete: 'cascade'});
      }
    }
  });
  return scan;
}
