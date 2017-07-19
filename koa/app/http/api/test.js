/**
 * Created by v_lianwang on 2016/10/9.
 */
const router = require('koa-router')()
    , path=require('path')
    , fs=require('fs')
    , config = require('../../../config/config.json')
    , crypto = require('crypto')

router
    .get('/', async (ctx, next)=> {
         let data="Hello World!";
         ctx.body = data;
    })
    .get('/wechat', async (ctx, next)=> {
        // 获取微信的请求,注意是 get
        var signature = ctx.request.query.signature;
        var echostr = ctx.request.query.echostr;
        var timestamp = ctx.request.query.timestamp;
        var nonce = ctx.request.query.nonce;
        
        // 这里的token 要和你表单上面的token一致
        var token = config.wechat.token;
        
        // 根文档上面的,我们需要对这三个参数进行字典序排序
        var arr = [token, timestamp, nonce];
        arr.sort();
        var tmpStr = arr.join('');
        
        // 排序完成之后,需要进行sha1加密, 这里我们使用node.js 自带的crypto模块
        var sha1 = crypto.createHash('sha1');
        sha1.update(tmpStr);
        var resStr = sha1.digest('hex');
        console.log(signature, 'resStr: ', resStr);
        
        // 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信,
        // 如果匹配,返回echoster , 不匹配则返回error
        if (resStr === signature) {
            ctx.body = echostr;
        } else {
          return false;
        }
    });


module.exports = router;