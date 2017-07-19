/**
 * Created by v_lianwang on 2016/11/14.
 */

const models = require('../model')

exports.addTask = async function (arr) {
    if (!Array.isArray(arr)) {
        throw new Error("arr is be must Array");
    }
    let t = await models.sequelize.transaction();
    return models.Task.bulkCreate(arr, { transaction: t }).then((taskList) => {
        t.commit();
        return taskList;
    }).catch((err) => {
        t.rollback();
        throw err;
    });
};

exports.getTaskList = function () {
    return models.Task.findAll({ raw: true });
}

exports.findTask = function (query) {
    return models.Task.findOne({ where: query, raw: true });
}

exports.update = async function (query, data) {
    let t = await models.sequelize.transaction();
    return models.Task.update(data, { where: query, transaction: t }).then((task) => {
        t.commit();
        return task;
    }).catch((err) => {
        t.rollback();
        throw err;
    });
}

exports.delTask = async function (Ids) {
    let t = await models.sequelize.transaction();
    return models.Task.destroy({ where: { TaskId: Ids }, transaction: t }).then((data) => {
        t.commit();
        return data;
    }).catch((err) => {
        t.rollback();
        throw err;
    });
}
