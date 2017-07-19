/**
 * Created by v_lianwang on 2016/9/23.
 */
const log4js = require('koa-log4')
    , logConfig = require('../../config/logConfig.json')
    , path = require("path")
    , fs = require("fs");

exports.logger = (name) => {
    return log4js.getLogger(name)
};

exports.koaLogger = log4js.koaLogger(log4js.getLogger('http'), { level: 'info' });

exports.log = (name) => {
    return async (ctx, next) => {
        ctx.log = ctx.log || {};
        ctx.log[name] = log4js.getLogger(name);
        await next();
    }
};

exports.initLog = initLog;


//加载配置文件
function initLog() {
    let prefix = "./";
    let appenders = logConfig.appenders;
    for (let i = 0, len = appenders.length; i < len; i++) {
        if (appenders[i].filename) {
            let logPath = appenders[i].filename.slice(0, appenders[i].filename.lastIndexOf('/'));
            appenders[i].filename = path.join(prefix, appenders[i].filename);
            mkdir(prefix, logPath);
        }
    }

    // 目录创建完毕，才加载配置，不然会出异常  
    log4js.configure(logConfig);
}


//创建日志目录
function mkdir(prefix, str) {
    let dirNames = path.join(str).split(path.sep);
    let base = prefix;
    for (var i = 0, len = dirNames.length; i < len; i++) {
        base = path.join(base, dirNames[i]);
        if (!fs.existsSync(base)) {
            fs.mkdirSync(base)
        }
    }
}