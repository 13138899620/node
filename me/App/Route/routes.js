// <reference path="./typings/index.d.ts" />
const route = require('../../Kernel/route')
const middleware = require('../Middleware/auth')
const taskController = require('../Controller/taskController')

route.get('/user/:id', middleware.Auth, function(req, res) {
    const _id = req.params.id
    let start = Date.now()
    res.writeHead(200, {
        'Content-type': 'text/plain;charset=utf-8'
    });
    // taskService.GetStaffInfos().then(function(result) {
    //     let end = Date.now();
    //     console.log(end - start)
    //     res.write(JSON.stringify(result))
    //     res.end()
    // })
})

route.get('/test',taskController.GetSyncStaffInfos)