/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DictionaryInfo', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    DictionaryKey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DictionaryValue: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Ordering: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    EnableFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "0"
    },
    CreateName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CreateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    UpdateName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    UpdateTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'DictionaryInfo',
    timestamps: false
  });
};
