const models = require('../model'),
    redis = require('../app/helper/redisHelper')

exports.createUserInfo = async function(model) {
    model.CreateTime=Date.now();
    let data = await models.RecruitBaseInfo.findOrCreate({
        where: {
            RecruitCaseID: model.RecruitCaseID
        },
        defaults: model,
        raw: true
    })
    let status=data[1];
    let result=data[0];
    if (!status) {
        model.UpdateName = model.CreateName;
        model.UpdateTime = Date.now();
        model.CreateName = result.CreateName;
        model.CreateTime = result.CreateTime;
        result = await models.RecruitBaseInfo.update(model, {
            where: {
                RecruitCaseID: model.RecruitCaseID
            },
            raw:true
        })
    }
    return result;
}
