/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RecruitOperationLog', {
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
    RecruiteStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Description: {
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
    tableName: 'RecruitOperationLog',
    timestamps: false
  });
};
