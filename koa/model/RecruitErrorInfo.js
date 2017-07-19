/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RecruitErrorInfo', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    RecruiteId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    FiledName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ErrorInfo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EnableFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    CreateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CreateName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'RecruitErrorInfo',
    timestamps: false
  });
};
