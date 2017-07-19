/**
 * Created by v_lianwang on 2016/9/23.
 */
const Koa = require('koa'),
    onerror = require('koa-onerror'),
    convert = require('koa-convert'),
    json = require('koa-json'),
    body = require('koa-bodyparser'),
    app = new Koa(),
    router = require('./http/routes').router,
    log = require('./helper/logHelper'),
    logger = log.logger('error'),
    model = require('../model'),
    path = require("path"),
    session = require('koa-generic-session'),
    redis = require('./helper/redisHelper'),
    resultModel = require('./common/resultModel')


app.context.model = model;
app.context.log = {};
app.context.log.illegal = log.logger('illegal');
app.context.log.error = logger;
app.context. = process.cwd();

//使用log4中间件
app.use(log.koaLogger);

//中间件 错误提示
onerror(app);

//错误处理中间件
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        let status = err.status || 500;
        let message = err.message || '服务器错误';
        ctx.status = status;
        ctx.body = resultModel.set(0, message, "");
    }
});



//中间件 body解析
app.use(body());

//映射路由
app.use(router.routes());

//只允许符合类型的请求
app.use(router.allowedMethods());

//记录错误日志
app.on('error', (err, ctx) => {
    logger.error(err)
});

//session存储在缓存中
// app.use(session({
//     store: redis.store
// }));

app.proxy = true;

module.exports = app;