const router = require("koa-router")(),
    socialService = require("../../../service/socialService"),
    lang = require('../../common/lang'),
    aesHelper = require("../../helper/aesHelper"),
    resultModel = require('../../common/resultModel')

router
    .get("/addStaffInfo", async function(ctx, next) {
        let model = {
            RecruitCaseID: 1,
            Name: "阳毅",
            Email: "943130995@qq.com",
            IDCard: "42068319930206581X",
            Mobile: "13138899620",
            WeChat: "yy943130995",
            CreateName: "v_byyang"
        };
        if (!model.RecruitCaseID || !model.Name || !model.Email || !model.IDCard || !model.Mobile || !model.CreateName || !model.WeChat) {
            ctx.body = resultModel.set(0, lang.NOTICE_SOCIAL_PARAMS_ERROR, "")
        } else {
            model.Key = aesHelper.md5Signature(Date.now(), model.IDCard);
            let data = await socialService.createUserInfo(model);
            if (data) {
                ctx.body = resultModel.set(1, lang.NOTICE_SOCIAL_ACTION_SUCCESS, model.Key)
            } else {
                ctx.body = resultModel.set(0, lang.NOTICE_SOCIAL_ACTION_ERROR, "")
            }
        }
    })



module.exports = router;