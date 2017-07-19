const route = require('./route')
const app = require('./server')
const url = require('url')
var config = {}


function init (config) {
  this.config = config
}

function start () {
  app.listen(onRequest, this.config.port, this.config.host,this.config.isDev)
}

function onRequest (req, res) {
  const method = req.method.toLowerCase()
  const urlObj = url.parse(req.url, true)
  const pathname = urlObj.pathname
  route.passRouter(route.getRouters(), method, pathname)(req, res)
}

exports.run = function (config) {
  init(config)
  start()
}
