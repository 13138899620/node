const router = require("koa-router")(),
    userPhotoService = require("../../../service/userPhotoService"),
    aesHelper = require("../../helper/aesHelper"),
    utils = require('../../common/utils'),
    zlib = require("zlib"),
    fs = require("fs"),
    path = require("path"),
    multer = require('koa-multer'),
    log = require('../../helper/logHelper'),
    CheckSignature = require('../../middlewares/CheckSignature')

let fileList = [
    "CertificateFront",
    "CertificateOpposite",
    "BankCardFront",
    "FundFront",
    "OtherFundFront",
    "SocialSecurityFront",
    "GraduationCertificateFront",
    "DiplomaCertificateFront"
]


let storage = multer.memoryStorage()
let upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024,
        files: 1
    },
    fileFilter: function(req, file, cb) {
        if (fileList.indexOf(req.body.credentialsName) < 0) {
            cb(null, false)
        } else {
            cb(null, new Error("The file is not in an acceptable list"))
        }
    }
}).any()


router
    .get("/info", async(ctx, next) => {
        try {
            if (ctx.query.Id) {
                ctx.body = await userPhotoService.getUserPhoto(ctx.query.Id);
            } else {
                let d = await userPhotoService.createUserPhoto(ctx.ip)
                ctx.body = d
            }
        } catch (err) {
            ctx.throw(500, err)
        }
    })
    .put("/uploadPhoto", upload,
        async(ctx, next) => {
            try {
                const start = new Date().getTime();
                let user = await userPhotoService.getUserPhoto(ctx.req.body.Id)
                if (ctx.req.body.certificateType) {
                    user = await userPhotoService.updateUserPhoto(user.Id, "CertificateType", ctx.req.body.certificateType)
                    ctx.body = user
                } else {
                    let credentialsName = user[ctx.req.body.credentialsName]
                    let fileName = aesHelper.md5Signature(Date.now(), ctx.req.body.credentialsName + user.Id)
                    fileName += ".jpg"
                    await userPhotoService.updateUserPhoto(user.Id, ctx.req.body.credentialsName, fileName)
                    utils.writeAesFile(path.resolve(ctx.cwd, "resource/images", fileName), ctx.req.files[0].buffer).then(function() {
                    if (credentialsName) {
                            utils.removeFile(path.resolve(ctx.cwd, "resource/images", credentialsName)).catch((err) => {
                                ctx.log.error.error(err)
                            })
                        }
                    }).catch((err) => {
                        ctx.log.error.error(err)
                    });
                    const ms = new Date().getTime() - start;
                    log.logger('photo').info(`type: ${ctx.req.body.type},Id: ${user.Id},photoName: ${fileName},originFileSize:${ctx.req.body.originFileSize / 1024}KB,compressFileSize:${ctx.req.body.compressFileSize / 1024}KB,time:${ms}ms`);
                    user[ctx.req.body.credentialsName] = fileName
                    ctx.body = user
                }
            } catch (err) {
                ctx.throw(500, err)
            }
        })
        .post("/uploadPhoto", upload,
        async(ctx, next) => {
            try {
                const start = new Date().getTime();
                let user = await userPhotoService.getUserPhoto(ctx.req.body.Id)
                if (ctx.req.body.certificateType) {
                    user = await userPhotoService.updateUserPhoto(user.Id, "CertificateType", ctx.req.body.certificateType)
                    ctx.body = user
                } else {
                    let credentialsName = user[ctx.req.body.credentialsName]
                    let fileName = aesHelper.md5Signature(Date.now(), ctx.req.body.credentialsName + user.Id)
                    fileName += ".jpg"
                    await userPhotoService.updateUserPhoto(user.Id, ctx.req.body.credentialsName, fileName)
                    utils.writeAesFile(path.resolve(ctx.cwd, "resource/images", fileName), ctx.req.files[0].buffer).then(function() {
                    if (credentialsName) {
                            utils.removeFile(path.resolve(ctx.cwd, "resource/images", credentialsName)).catch((err) => {
                                ctx.log.error.error(err)
                            })
                        }
                    }).catch((err) => {
                        ctx.log.error.error(err)
                    });
                     const start = new Date().getTime();
                    const ms = new Date().getTime() - start;
                    log.logger('photo').info(`type: ${ctx.req.body.type},Id: ${user.Id},photoName: ${fileName},originFileSize:${ctx.req.body.originFileSize / 1024}KB,compressFileSize:${ctx.req.body.compressFileSize / 1024}KB,time:${ms}ms`);
                    user[ctx.req.body.credentialsName] = fileName
                    ctx.body = user
                }
            } catch (err) {
                ctx.throw(500, err)
            }
        })
    .post("/delUserPhoto",async(ctx, next) => {
        if (!ctx.request.body.Id || !ctx.request.body.credentialsName) return ctx.throw(" no resource that can be deleted")
        try {
            let user = await userPhotoService.getUserPhoto(ctx.request.body.Id)
            if (user[ctx.request.body.credentialsName]) {
                utils.removeFile(path.resolve(ctx.cwd, "resource/images", user[ctx.request.body.credentialsName])).catch((err) => {
                    ctx.log.error.error(err)
                })
                user = await userPhotoService.updateUserPhoto(ctx.request.body.Id, ctx.request.body.credentialsName, null);
                ctx.body = user.shift()
            } else {
                ctx.throw(404, 'not found')
            }
        } catch (err) {
            ctx.throw(500, err)
        }
    })
    .get("/media/:fileName", async(ctx, next) => {
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(ctx.params.fileName)) {
            ctx.throw(404, "not resource")
        }
        try {
            let filePath = path.resolve(ctx.cwd, "resource/images", ctx.params.fileName)
            if (await utils.isExist(filePath)) {
                let raw = fs.createReadStream(filePath)
                let decrypt = aesHelper.aesDecryptStream()
                ctx.set("content-type", path.extname(ctx.params.fileName).slice(1))
                ctx.body = raw.pipe(decrypt)
            } else {
                ctx.throw(404, "request resource not found")
            }
        } catch (err) {
            ctx.throw(500, err)
        }
    })

module.exports = router