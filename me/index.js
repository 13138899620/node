// / <reference path="./typings/index.d.ts" />

const app = require('./Kernel/application')
require('./App/Route/routes.js')

const config = {
  host: '0.0.0.0',
  port: '8888',
  isDev:false,
}

app.run(config)
