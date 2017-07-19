const redisStore = require('koa-redis'),
    redis = require('redis'),
    models = require('../../model'),
    config = require('../../config/config.json'),
    log = require('./logHelper')

var client = redis.createClient(config.redis.port, config.redis.host, {
    retry_strategy: function(options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection')
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted')
        }
        if (options.times_connected > 10) {
            return new Error('Connection times more than 10 times')
        }
        return Math.max(options.attempt * 100, 3000)
    },
    db: config.redis.db
})

var options = {
    'client': client,
    'db': config.redis.db
}

client.auth(config.redis.password)

var store = redisStore(options)

client.on('error', function(err) {
    log.logger('error').info(err)
});

function initData() {
    models.Task.findAll({
            logging: false,
            raw: true
        })
        .then((list) => {
            return batchMset(list)
        })
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })
}

function batchMset(list) {
    return new Promise((resolve, reject) => {
        let multi = store.client.multi()
        let obj = {}
        list.forEach((task) => {
            obj[task.Id] = JSON.stringify(task)
        })
        multi.hmset(`taskList`, obj)
        multi.exec((err, replies) => {
            if (err) reject(err)
            resolve(replies)
        })
    })
}

//添加时间戳,并设置过期时间，默认为1200S，20分钟后自动过期
async function AddTimestamp(uid, timestamp) {
    try {
        let key = uid + "-" + timestamp;
        await store.client.set(key, "1");
        await store.client.expire(key, 1200);
    }
    catch(err){
        log.logger('error').error("设置时间戳REDIS数据失败：" + JSON.stringify(err))
      	return false
    }
    return true;
}

//获取HASHITEM
async function ExistsKey(key) {
    let reply=await store.client.exists(key);  
    return reply;
}

//获取HASHITEM
function ExistsTimestamp(uid, timestamp) {
    return ExistsKey(uid + "-" + timestamp)
}

exports.initData = initData
exports.store = store
exports.client = client
exports.client = client
exports.AddTimestamp = AddTimestamp
exports.ExistsTimestamp=ExistsTimestamp
exports.ExistsKey=ExistsKey