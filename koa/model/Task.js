/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Task', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    TaskId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PicName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PicId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    CreatorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    CreatorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IsDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0"
    },
    DeleterId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DeleterName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DeleteTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    LastUpdaterId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    LastUpdaterName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IsUpdated: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
      tableName: 'Task',
      freezeTableName: true,
      createdAt: "CreateTime",
      updatedAt: "LastUpdateTime"
    });
};
