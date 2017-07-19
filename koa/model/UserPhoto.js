/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserPhoto', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    IP: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CertificateType: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    CertificateFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    CertificateOpposite: {
      type: DataTypes.STRING,
      allowNull: true
    },
    BankCardFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    FundFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    OtherFundFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    SocialSecurityFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    GraduationCertificateFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    DiplomaCertificateFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    UpdateTimeStamp:{
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'UserPhoto',
    timestamps: false
  });
};
