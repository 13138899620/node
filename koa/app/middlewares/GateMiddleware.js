/**
 * Created by v_lianwang on 2016/11/5.
 */
const crypto = require('crypto')
    , taskConfig = require('../../config/config.json');

//应用网关鉴权
module.exports = function (opts) {
    return async(ctx, next)=> {
        let headers = ctx.headers;
        if (!headers.timestamp || !headers["signature"] || !headers["x-rio-seq"]) {
            ctx.log.illegal.error(`${ctx.request.ip} is illicit request`);
            ctx.body = 'not headers';
        }

        let timestamp = headers.timestamp;
        let signature = headers["signature"];
        let xRioSeq = headers["x-rio-seq"];
        let nowTimestamp = (new Date().getTime() / 1000).toFixed(0);
        if (Math.abs(nowTimestamp - timestamp) > 180) {
            return ctx.body = 'request timeout';
        }
        let computedSignature = signatureHash(timestamp, taskConfig.token, xRioSeq);
        if (computedSignature === signature) {
            await next();
            let time = (new Date().getTime() / 1000).toFixed(0);
            ctx.set({
                timestamp: time,
                "x-Rio-Seq": xRioSeq,
                signature: signatureHash(time, taskConfig.token, xRioSeq)
            })
        } else {
            ctx.log.illegal.error(`${ctx.request.ip} is illicit request`);
            return ctx.body = 'illicit request';
        }
    };

    function signatureHash(timestamp, token, xRioSeq) {
        let sha256 = crypto.createHash('sha256');
        sha256.update(`${timestamp}${taskConfig.token}${xRioSeq}${timestamp}`);
        return sha256.digest('hex').toUpperCase();
    }
};