/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('RecruitBaseInfo', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RecruitCaseID: {
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
    Mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    WeChat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IDCard: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    Step:{
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    //个人信息
    //姓
    FirstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //名
    LastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //姓名拼音
    Pinyin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //婚姻状况
    IsMarital: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //是否有亲属在腾讯工作
     IsFamilyInTencent: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //亲属英文名
    FamilyEnglishName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //与本人关系
    RelationShip: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //亲属姓名
    FamilyName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //通讯地址
    PostalAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //紧急联系人
     EmergencyContact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //与紧急联系人关系
    EmergencyContactRelationShip: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //紧急联系人电话
    EmergencyContactMobile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //紧急联系人地址
    EmergencyContactAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },


    //是否有孩子
    IsChildren: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //是否有房产
    IsHouse: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //QQ
    QQ: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //户口类型
    ResidenceType: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //是否通过公司申请落户
    IsResidence: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    

    //入职信息
    //英文名
    EnglishName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //备选英文名1
    SpareEnglishOne: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //备选英文名2
    SpareEnglishTwo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //入职日期
    EntryDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    //入职时间
    EntryTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //入职日期1
    SpareEntryDataOne: {
      type: DataTypes.DATE,
      allowNull: true
    },
    //入职时间1
    SpareEntryTimeOne: {
      type: DataTypes.STRING,
      allowNull: true
    },

    
    //基本证件
    //银行卡
    Bank: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //开户行所在省份
    BankProvince: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //开户行所在城市
    BankCity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //银行卡账号
    BankCard: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //开户姓名
    BankCardName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //银行卡正面
    BankCardFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //公积金账号
    FundNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //公积金正面
    FundFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //补充公积金账号
    OtherFundNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //补充公积金正面
    OtherFundFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //社保卡账号
    SocialSecurityNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //社保卡正面
    SocialSecurityNumberFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    

    //相关证件
     //国家
     Country: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //省份
    Province: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //城市
    City: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //民族
    Nation: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //证件类型
    CertificateType: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //性别
    Gender: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //出生日期
    Birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    //特殊证件类型
    SpecialCertificateType: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //证件签发机构
    CertificateInstitutions: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //证件开始日期
    CertificateStartDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    //证件结束日期
    CertificateEndDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    //证件正面
    CertificateFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //证件反面
    CertificateOpposite: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //是否上传其他证件
    IsOtherCertificate: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //其他证件号码
    OtherCertificate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //其他证件正面
    OtherCertificateFront: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //其他证件反面
    OtherCertificateOpposite: {
      type: DataTypes.STRING,
      allowNull: true
    },

    //学历信息
    //最高学历
    Education: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    //毕业学校
    School: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //专业
    Speciality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //毕业时间
    GraduateDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    //毕业证书
    GraduateCertificate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //毕业证书是否遗失
    IsGraduateCertificateLost: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //学位证书
    Diplomas: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //学位证书是否遗失
    IsDiplomasLost: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //承诺信息准确性
    IsPromise: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //首次参加工作时间
    FirstWorkTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
     //首次参加工作学历
    FirstWorkEducation: {
       type: DataTypes.INTEGER(11),
      allowNull: true
    },
     //该学历毕业时间
    FirstWorkEducationGraduateDate: {
      type: DataTypes.DATE,
      allowNull: true
    },

    //健康申报
    //血液疾病
    IsBloodDiseases: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //恶性肿瘤
    IsMalignancy: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //癫痫
    IsEpilepsy: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //精神病
    IsMentalDisease: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //心脑血管疾病
    IsCCVd: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //传染性疾病
    IsInfectiousDiseases: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //代谢或免疫系统疾病
    IsImmuneDisease: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //其他重大疾病
    IsOtherDiseases: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    //病史描述
    HistoryDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //健康说明
    HealthNote: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //健康承诺
    IsHealthPromise: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    EnableFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    CreateName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreateTime: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: 'RecruitBaseInfo',
    timestamps: false
  })
}
