/**
 * Created by v_lianwang on 2016/10/3.
 */

const models =  require('../../model/index')
    , router = require('koa-router')();

router
    .get('/', async (ctx, next)=> {
            ctx.body = "hello world";
    });

module.exports = router;

