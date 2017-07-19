const taskService = require('../Service/taskService')
const excel = require('excel-export')

exports.GetSyncStaffInfos = async function(req, res) {
    let start = Date.now()
    let result = await taskService.GetSyncStaffInfos()
    let end = Date.now();
    console.log("db time:" + (end - start))
    var conf = {}
    conf.cols = [{
        caption: '序号',
        type: 'number',
        width: 20
    }, {
        caption: 'StaffId',
        type: 'number',
        width: 40
    }, {
        caption: 'Name',
        type: 'string',
        width: 20
    }, {
        caption: 'UnitId',
        type: 'number',
        width: 40
    }, {
        caption: 'LocationCode',
        type: 'string',
        width: 30
    }, {
        caption: 'FullName',
        type: 'string',
        width: 30
    }, {
        caption: 'PostId',
        type: 'number',
        width: 30
    }, {
        caption: 'PostName',
        type: 'string',
        width: 30
    }];

    var array = [];
    for (var i = 0; i < result.length; i++) {
        array.push(
            [
                result[i]["rownumber"],
                result[i]["Id"],
                result[i]["Name"],
                result[i]["UnitId"],
                result[i]["LocationCode"],
                result[i]["FullName"],
                result[i]["PostId"],
                result[i]["PostName"]
            ]
        )
    }
    conf.rows = array
    var file = excel.execute(conf);
    end = Date.now();
    console.log("excel time:" + (end - start))
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "staff.xlsx");
    res.end(file, 'binary');
}