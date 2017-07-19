const http = require('http')
const url = require('url')
const path = require('path')

var route = {}

const lazy = function * (arr) {
  yield * arr
}

// 中间件实现
function pipeline (middleware, dispatch) {
  middleware = middleware.reverse()
  return middleware.reduce(function (pre, curr) {
    return function (req, res) {
      curr(req, res, pre)
    }
  }, dispatch)
}

// 路由匹配
route.passRouter = (routes, method, path) => (req, res) => {
  const replaceParams = (path) => new RegExp(`^${path.replace(/:\w[^\/]+/g, '\\w[^\/]*')}$`)
  const lazyRoutes = lazy(routes)
  ;(function next () {
    const it = lazyRoutes.next().value
    if (!it) {
      res.end(`Cannot ${method} ${path}`)
      return
    } else if ((it.method === method || it.method === 'all') && (it.path === path || it.path === '*')) {
      it.fn(req, res)
    } else if (it.path.includes(':') && (it.method === method || it.method === 'all') && (replaceParams(it.path).test(path))) {
      let index = 0
      const param2Array = it.path.split('/')
      const path2Array = path.split('/')
      const params = {}
      param2Array.forEach((path) => {
        if (/\:/.test(path)) {
          params[path.slice(1)] = path2Array[index]
        }
        index++
      })
      req.params = params
      it.fn(req, res)
    } else {
      next()
    }
  }())
}

// 初始化路由
var routes = []

// app.method(path,hanlder) 添加路由
// 当调用get,post,put... 方法时，添加一个路由对象到routers数组
const methods = ['get', 'post', 'put', 'options', 'delete', 'all', 'use']
methods.forEach((method) => {
  route[method] = (path, ...hanlders) => {
    let middleware = []
    let fn
    if (hanlders.length == 1) {
      middleware = []
      fn = hanlders[0]
    } else if (hanlders.length > 1) {
      for (var i = 0; i < hanlders.length - 1; i++) {
        middleware.push(hanlders[i])
      }
      fn = hanlders[hanlders.length - 1]
    }
    routes.push({
      method: method,
      path: path,
      fn: pipeline(middleware, fn)
    })
  }
})

// 获取路由信息
route.getRouters = function getRouters () {
  return routes
}

module.exports = route
