
const router = require('koa-router')()
    , taskService = require("../../../service/taskService")
    , GateMiddleware = require('../../middlewares/GateMiddleware')
    , AesMiddleware = require('../../middlewares/AesMiddleware')

router.use(GateMiddleware(), AesMiddleware())
    .post("/", async function(ctx, next) {
        try {
            let Id = ctx.request.body.data.Id;
            await taskService.delTask([Id])
            ctx.body = {
                IsEncrypted: true,
                Data: ctx.request.body.data
            };
        } catch (err) {
            ctx.throw("remove fail")
        }
    })


module.exports = router;    