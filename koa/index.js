#!/usr/bin/env node

const app = require('./app/app')
    , models = require('./model')
    , cluster = require('cluster')
    , cpuLens = require('os').cpus().length
    , initRoute = require('./app/http/routes').initRouter
    , log = require('./app/helper/logHelper')
    , port = process.env.PORT || 3000
    , redis=require('./app/helper/redisHelper')

//是否为主进程
if (cluster.isMaster) {
    log.initLog();
    //redis.initData();
    models.sequelize.sync().then(function () {
        if (process.env.NODE_ENV === "production") {
            initMaster()
        } else {
            startWorker();
        }
    }).catch(function (err) {
        log.logger('error').error(`database init error:${err}`);
    })
} else {
    startWorker();
}
  

//根据CPU数量开启多线程
function initMaster() {
    for (var i = 0; i < cpuLens; i++) {
        cluster.fork()
    }

    cluster.on('fork', function (worker) {
        log.logger('cluster').info(`worker ${worker.process.pid} start`)
    });

    cluster.on('exit', function (worker, code, signal) {
        log.logger('cluster').error(`worker ${worker.process.pid} error exit ,error code :${code} ,signal :${signal}`);
        cluster.fork()
    });
}


//启动工作线程
function startWorker() {
    initRoute();
    app.listen(port);
    log.logger('cluster').info(`${process.pid} service start in port ${port}`)
}