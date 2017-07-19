// <reference path="./typings/index.d.ts" />

const db = require('../../Lib/sequelize')

exports.GetSyncStaffInfos = async function() {
    var sql = "select top 50000 row_number()over(order by A.Id)rownumber, A.Id, A.Name, A.UnitId, B.LocationCode, B.FullName, C.Id AS PostId, C.Name AS PostName FROM Staff AS A INNER JOIN dbo.Unit AS B ON A.UnitId = B.Id INNER JOIN dbo.Post AS C ON A.PostId = C.Id"
    var result = await db.query(sql)
    return result[0]
}


exports.GetStaffInfos = function() {
    var sql = "select top 50000 row_number()over(order by A.Id)rownumber, A.Id, A.Name, A.UnitId, B.LocationCode, B.FullName, C.Id AS PostId, C.Name AS PostName FROM Staff AS A INNER JOIN dbo.Unit AS B ON A.UnitId = B.Id INNER JOIN dbo.Post AS C ON A.PostId = C.Id"
   return db.query(sql).spread(function(results, metadata) {
         return results
    });
}         