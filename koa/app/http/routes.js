/**
 * Created by v_lianwang on 2016/10/3.
 */

const fs = require('fs')
    , path = require('path')
    , Router = require('koa-router')

let router = new Router();

exports.router = router;

//初始化路由
exports.initRouter = function () {
    loadRoute('./', router);
    function loadRoute(routeDir, router) {
        try {
            fs.readdirSync(getPath(routeDir)).forEach((file)=> {
                if (file === 'routes.js') return;
                if (fs.statSync(getPath(routeDir, file)).isDirectory()) {
                    let dirRouter = new Router();
                    loadRoute(routeDir + file + '/', dirRouter);
                    router.use(`/${file}`, dirRouter.routes(), dirRouter.allowedMethods());
                } else {
                    if (path.extname(file) !== '.js') return;
                    let routePath = `/${path.basename(file, '.js')}`;
                    let model = require(getPath(routeDir, file));
                    router.use(routePath, model.routes(), model.allowedMethods());
                }
            })
        } catch (err) {
            console.warn('router init error', routeDir, err.stack)
        }
    }

    function getPath() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(__dirname);
        return path.join.apply({}, args)
    }
};