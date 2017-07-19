const models = require('../model'),
    redis = require('../app/helper/redisHelper')

exports.saveBasicInfo = async function(model) {
    model.UpdateName = model.CreateName;
    model.UpdateTime = Date.now();
    result = await models.RecruitBaseInfo.update(model, {
        where: {
            Id: model.Id
        },
        raw: true
    })
    return result;
}