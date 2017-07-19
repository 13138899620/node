const models = require('../model')

exports.addUser = async function (data) {
    let t = await models.sequelize.transaction();
    return models.UserInfo.create(data, { transaction: t, logging: false }).then((user) => {
        t.commit();
        return user;
    }).catch((err) => {
        t.rollback();
        throw err;
    });
};


exports.getUserList =function () {
    return models.UserInfo.findAll({ logging: false, raw: true });
}

