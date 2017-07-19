const crypto = require('crypto'),
    resultModel = require('../common/resultModel'),
    lang = require('../common/lang'),
    aseHelper = require('../helper/aesHelper'),
    redisHelper = require('../helper/redisHelper')

//签名校验
module.exports = function(opts) {
    return async(ctx, next) => {
        let headers = ctx.headers;
        if (!headers["timestamp"] || !headers["signature"] || !headers["uid"]) {
            ctx.log.error.error(`请求头缺失,签名验证不通过：${JSON.stringify(headers)},API:${ctx.originalUrl}`);
            return ctx.body = resultModel.set(0, lang.NOTICE_COMMON_REQUEST_ERROR, "")
        }
        let secretKey = "f72e51440bb645bf9ad0bdc1c7345124";
        let sigToken = "654321";
        let data = ctx.request.body.data;
        let timestamp = headers["timestamp"];
        let signature = headers["signature"];
        let uid = headers["uid"];
        let nowTimestamp = (new Date().getTime());
        let flag=await redisHelper.ExistsTimestamp(uid, timestamp);
        if (flag) {
            ctx.log.error.error(`时间戳重复请求:${JSON.stringify(headers)},API:${ctx.originalUrl}`);
            return ctx.body = resultModel.set(0, lang.NOTICE_COMMON_REQUEST_ERROR, "")
        }
        redisHelper.AddTimestamp(uid, timestamp);
        let source = uid + timestamp + data;
        let computedSignature = aseHelper.HmacSHA1(source, sigToken);
        if (computedSignature === signature) {
            let dencrypt = aseHelper.AesDecryptStr(data, secretKey);
            data=JSON.parse(dencrypt);
            ctx.request.body=data;
            await next();
        } else {
            ctx.log.error.error(`签名验证不通过，签名不一致：${JSON.stringify(headers)},Server签名:${computedSignature},API:${ctx.originalUrl}`);
            return ctx.body = resultModel.set(0, lang.NOTICE_COMMON_REQUEST_ERROR, "")
        }
    };
};