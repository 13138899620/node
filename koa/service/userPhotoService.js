const models = require('../model'),
    redis = require('../app/helper/redisHelper')

exports.createUserPhoto = async function(ip) {
    if (!ip) throw new Error('ip is be must')
    var model=await models.UserPhoto.findOrCreate({
        where: {
            IP: ip
        },
        defaults: {
            IP: ip,
            UpdateTimeStamp: Date.now()
        },
        raw: true
    })
    model=model.shift();

    let data = await redis.store.client.hget("UserPhotoHashSet", model.Id);
    if (!data) {
        await redis.store.client.hset('UserPhotoHashSet', model.Id, JSON.stringify(model));
    }
    return model;
}

exports.getUserPhoto = async function(id) {
    try {
        let data = await redis.store.client.hget("UserPhotoHashSet", id);
        if (!data) {
            data = await models.UserPhoto.findOne({
                where: {
                    Id: id
                },
                raw: true
            })
            await redis.store.client.hset('UserPhotoHashSet', id, JSON.stringify(data));
        } else {
            data = JSON.parse(data);
        }
        return data;
    } catch (err) {
        throw err
    }
}

exports.updateUserPhoto = async function(id, field, val) {
    try {
        let data = await redis.store.client.hget("UserPhotoHashSet", id);
        data = JSON.parse(data);
        data[field] = val;
        data['UpdateTimeStamp'] = Date.now();
        let t = await models.sequelize.transaction();
        let status = await models.UserPhoto.update(data, {
            where: {
                Id: id
            },
            transaction: t
        });
        await redis.store.client.hset('UserPhotoHashSet', id, JSON.stringify(data));
        t.commit();
        return status;
    } 
    catch (err) {
        t.rollback();
        throw err;
    }
}