const router = require("koa-router")(),
    socialService = require("../../../service/recruitService"),
    lang = require('../../common/lang'),
    resultModel = require('../../common/resultModel'),
    enums = require('../../common/enums')

router
    .post("/saveBasicInfo", async function(ctx, next) {
        let model = {
            Id: 1,
            FirstName: "阳",
            LastName: "毅",
            Pinyin: "YangYi",
            IsMarital: 1,
            IsFamilyInTencent: 1,
            FamilyEnglishName: "kindywu",
            RelationShip: 1,
            FamilyName: "阳二",
            Email: "943130995@qq.com",
            Mobile: "13138899620",
            WeChat: "yy943130995",
            PostalAddress: "宝安区西乡宝源二区",
            EmergencyContact: "阳三",
            EmergencyContactRelationShip: 1,
            EmergencyContactMobile: "13138899666",
            EmergencyContactAddress: "湖北枣阳",

            EnglishName: "byyang",
            SpareEnglishOne: "byyang1",
            SpareEnglishTwo: "byyang2",
            EntryDate: "2017-03-20",
            EntryTime: "9:00-10:00",
            SpareEntryDataOne: "2017-03-21",
            SpareEntryTimeOne: "9:00-10:00",

            CreateName: "v_byyang"
        };

        let data = await socialService.saveBasicInfo(model);
        if (data) {
            ctx.body = resultModel.set(1, lang.NOTICE_COMMON_ACTION_SUCCESS, model.Key)
        } else {
            ctx.body = resultModel.set(0, lang.NOTICE_COMMON_ACTION_ERROR, "")
        }
    })
    .post("/submitBasicInfo", async function(ctx, next) {
        let model = {
            Id: 1,
            FirstName: "阳",
            LastName: "毅",
            Pinyin: "YangYi",
            IsMarital: 1,
            IsFamilyInTencent: 1,
            FamilyEnglishName: "kindywu",
            RelationShip: 1,
            FamilyName: "阳二",
            Email: "943130995@qq.com",
            Mobile: "13138899620",
            WeChat: "yy943130995",
            PostalAddress: "宝安区西乡宝源二区",
            EmergencyContact: "阳三",
            EmergencyContactRelationShip: 1,
            EmergencyContactMobile: "13138899666",
            EmergencyContactAddress: "湖北枣阳",

            EnglishName: "byyang",
            SpareEnglishOne: "byyang1",
            SpareEnglishTwo: "byyang2",
            EntryDate: "2017-03-20",
            EntryTime: "9:00-10:00",
            SpareEntryDataOne: "2017-03-21",
            SpareEntryTimeOne: "9:00-10:00",

            CreateName: "v_byyang"
        };

        if (!model.FirstName || !model.LastName || !model.Pinyin || !model.IsMarital || !model.IsFamilyInTencent || !model.FamilyName || !model.Mobile || !model.WeChat || !model.PostalAddress || !model.EmergencyContact || !model.EmergencyContactRelationShip || !model.EmergencyContactMobile || !model.EmergencyContactAddress || !model.EnglishName || !model.SpareEnglishOne || !model.SpareEnglishTwo || !model.EntryDate || !model.EntryTime || !model.SpareEntryDataOne || !model.SpareEntryTimeOne) {
            ctx.body = resultModel.set(0, lang.NOTICE_COMMON_PARAMS_ERROR, "")
        } else {
            model.Step=enums.Step.BasicCertificate;
            let data = await socialService.saveBasicInfo(model);
            if (data) {
                ctx.body = resultModel.set(1, lang.NOTICE_COMMON_ACTION_SUCCESS, model.Key)
            } else {
                ctx.body = resultModel.set(0, lang.NOTICE_COMMON_ACTION_ERROR, "")
            }
        }
    })

module.exports = router;