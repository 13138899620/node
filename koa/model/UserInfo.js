/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('UserInfo', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RecruitId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IDCard: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Mobile: {
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
    tableName: 'UserInfo',
    timestamps: false
  })
}
