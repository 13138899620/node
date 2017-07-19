/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('WorkExperience', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    recruitId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    //开始日期
    StartDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    //结束日期
    EndDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    //公司名称
    CompanyName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //部门
    Department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //职位
    Position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //工作地点
    WorkPlace: {
      type: DataTypes.STRING,
      allowNull: true
    },
    EnableFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    CreateName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CreaterTime: {
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
    tableName: 'WorkExperience',
    timestamps: false
  });
};
