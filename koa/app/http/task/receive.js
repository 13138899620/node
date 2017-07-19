/**
 * Created by v_lianwang on 2016/11/5.
 */
const router = require('koa-router')()
    , GateMiddleware = require('../../middlewares/GateMiddleware')
    , AesMiddleware = require('../../middlewares/AesMiddleware')
    , taskService = require("../../../service/taskService")
    , fs = require("fs")
    , path = require("path");

router.use(GateMiddleware(), AesMiddleware())
    .all('/', async (ctx, next) => {
        try {
            let data = ctx.request.body.data;
            let taskList = [];
            let taskData = {
                TaskId: data.Id,
                Name: data.Name,
                PicId: data.PicId,
                PicName: data.PicName,
                Status: data.Status,
                CreatorId: data.CreatorId,
                CreatorName: data.CreatorName,
                CreateTime: data.CreateTime,
                IsDeleted: data.IsDeleted,
                LastUpdaterId: data.LastUpdaterId
            };
            taskList.push(taskData) 
            let task = await taskService.findTask({ TaskId: data.Id })
            if (!task) {
                await taskService.addTask(taskList);
            } else {
                await taskService.update({ TaskId: data.Id }, taskData)
            }

            ctx.body = {
                IsEncrypted: true,
                Data: {
                    success: true
                }
            };
        } catch (err) {
            ctx.log.error.error(err);
            ctx.body = {
                IsEncrypted: true,
                IsException: true,
                Exception: err
            }
        }
    });


module.exports = router;