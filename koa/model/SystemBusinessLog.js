/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SystemBusinessLog', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    LogType: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ObjectData: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CreateName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CreaterTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'SystemBusinessLog',
    timestamps: false
  });
};
