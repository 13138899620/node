//<reference path="./typings/index.d.ts" />

const http = require('http')
const url = require('url')
const cluster = require('cluster')
const os = require('os')

cluster.schedulingPolicy = cluster.SCHED_NONE

function listen (res, port, host,isDev) {
  if (cluster.isMaster && !isDev) {
    var cpus = os.cpus().length
    console.log('Master cluster setting up ' + cpus + ' workers...')

    for (var i = 0;i < cpus;i++) {
      cluster.fork()
    }

    cluster.on('online', function (worker) {
      console.log('Worker ' + worker.process.pid + ' is online')
    })

    cluster.on('exit', function (worker, code, signal) {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
      console.log('Starting a new worker')
      cluster.fork()
    })
  } else {
    http.createServer(res).listen(port, host, () => {
      console.log(`Server running at ${host}:${port}.`)
      process.setMaxListeners(0)
      process.on('uncaughtException', function (err) {
        console.log(err.stack)
      })
      process.stdin.resume()
      process.on('SIGINT', function () {
        console.log('\n')
        console.log('Good Day!')
        process.exit(2)
      })
    })
  }
}

exports.listen = listen
