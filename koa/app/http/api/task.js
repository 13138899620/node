const router = require("koa-router")()
    , taskService = require("../../../service/taskService")
    , aesHelper = require("../../helper/aesHelper")
    , zlib = require("zlib")
    , utils = require('../../common/utils')
    , fs = require("fs")
    , path = require("path")
    , multer = require('koa-multer');

let storage = multer.memoryStorage();
let upload = multer({ storage, limits: { files: 1 } }).any()

router
    .post("/getTaskList", async function (ctx, next) {
        let data = await taskService.getTaskList();
        ctx.body = data;
    })
    .post("/getTask", async function (ctx, next) {
        if (!ctx.request.body.Id) {
            throw new Error("id is required")
        } else {
            let data = await taskService.findTask({ Id: ctx.request.body.Id })
            ctx.body = data;
        }
    })
    .put("/updateTask", upload,
    async function (ctx, next) {
        ctx.request.body = ctx.req.body;
        try {
            writeAesFile(path.resolve(ctx.cwd, "resource/images", ctx.request.body.PicId), ctx.req.files[0].buffer)
            let task = await taskService.update({ Id: ctx.request.body.Id }, { Name: ctx.request.body.Name, IsUpdated: true });
            ctx.body = await taskService.findTask({ Id: ctx.request.body.Id });
        } catch (err) {
            ctx.log.error.error(err);
            ctx.body = err;
        }
    })
    .get("/media/:TaskId/:PicId", async function (ctx, next) {
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(ctx.params.PicId)) {
            ctx.throw(404, "not resource")
        }
        try {
            let filePath = path.resolve(ctx.cwd, "resource/images", ctx.params.PicId);
            if (await utils.isExist(filePath)) {
                let raw = fs.createReadStream(filePath);
                let decrypt = aesHelper.aesDecryptStream();
                ctx.set("content-type", "jpg");
                ctx.body = raw.pipe(decrypt);
            } else {

                ctx.throw(404, "not resource")
            }

        } catch (err) {
            ctx.throw(404, "not resource")
        }
    })



function writeAesFile(path, buf) {
    return new Promise((resolve, reject) => {
        let w = fs.createWriteStream(path);
        w.write(aesHelper.aesEncryptFile(buf));
        w.close();
        w.on("finish", function () {
            resolve()
        })
        w.on("error", function () {
            reject()
        })
    })

}

module.exports = router;