/**
 * Created by v_lianwang on 2016/11/17.
 */
const multer = require('koa-multer')
    , reg = new RegExp(/^=\?utf-8\?b\?(.*)\?=$/i)
    , aesHelper = require('../helper/aesHelper');

let storage = multer.diskStorage({
    destination: 'resource/images',
    filename: function (req, file, cb) {
        // req.body.data.PicId = `${req.body.data.Id}-${req.body.data.PicId}`
        cb(null, req.body.data.PicId)
    }
});


//图片加解密
module.exports = function () {
    return async (ctx, next) => {
        let headers = ctx.headers;
        if (!headers["timestamp-source"] || !headers["signature-source"]) {
            ctx.log.illegal.error(`${ctx.request.ip} is illicit request`);
            ctx.body = "Not Found";
        } else {
            //todo:使用
            let timestamp = headers["timestamp-source"];
            let signature = headers["signature-source"];
            if (ctx.is("multipart")) {
                let receive = await multer({
                    storage,
                    fileFilter
                }).any();

                try {
                    await receive(ctx, async function (ctx) {
                        await next();
                    });
                } catch (err) {
                    ctx.log.error.error(err);
                    return ctx.body = "Not Found";
                }
            } else {
                let sourceData = ctx.request.body || {};
                let computedSignature = aesHelper.md5Signature(timestamp, sourceData.data);
                if (computedSignature !== signature) {
                    ctx.log.illegal.error(`${ctx.request.ip} is illicit request`);
                    return ctx.body = "Not Found";
                } else {
                    ctx.req.sourceBody = sourceData;
                    sourceData.data = JSON.parse(aesHelper.aesDecrypt(sourceData.data));
                    ctx.request.body = ctx.req.body = sourceData;
                    await next();
                }
            }
            if (ctx.body.IsEncrypted) {
                ctx.body.Data = aesHelper.aesEncrypt(JSON.stringify(ctx.body.Data));
            }

            function fileFilter(req, file, cb) {
                let sourceData = req.body;
      
                let computedSignature = aesHelper.md5Signature(timestamp, sourceData.data);
                if (computedSignature !== signature) {
                    ctx.log.illegal.error(`${ctx.request.ip} is illicit request`);
                    cb(new Error(`${ctx.request.ip} is illicit request`));
                } else {
                    req.sourceBody = sourceData;
                    sourceData.data = JSON.parse(aesHelper.aesDecrypt(sourceData.data))
                    ctx.request.body = req.body = sourceData;
                    cb(null, true);
                }

            }
        }
    }
};