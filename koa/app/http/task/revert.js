const router = require('koa-router')(),
    taskService = require("../../../service/taskService"),
    GateMiddleware = require('../../middlewares/GateMiddleware'),
    AesMiddleware = require('../../middlewares/AesMiddleware'),
    path = require("path"),
    fs = require("fs")

router.use(GateMiddleware(), AesMiddleware())
    .post("/", async function(ctx, next) {
        try {
            let data = await taskService.findTask({
                IsUpdated: true,
                taskId: ctx.request.body.data
            });
            if (data) {
                let buf = await fileBuffer(path.resolve(ctx.cwd, `resource/images/${data.PicId}`))
                ctx.body = {
                    IsEncrypted: true,
                    Data: data,
                    AttachmentList: [{
                        Name: data.Name,
                        FileName: data.PicName,
                        FileContent: Array.prototype.slice.call(buf, 0)
                    }]
                };
            }else{
                ctx.body = {
                    IsEncrypted: true,
                    Data: {}
                };
            }


        } catch (err) {
            ctx.throw(err);
        }
    })

function fileBuffer(path) {
    return new Promise((resolve, reject) => {

        let rs = fs.createReadStream(path)
        let file = Buffer.from("")
        rs.on("data", function(data) {
            file = Buffer.concat([file, data])
        })
        rs.on("end", function() {
            resolve(file)
        })
        rs.on("error", (err) => {
            reject(err)
        })
    })

}


module.exports = router;