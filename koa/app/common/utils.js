const fs = require("fs")
    , path = require("path")
    , aesHelper = require("../helper/aesHelper")

function cwdPath() {
    let cwd = process.cwd();
    let paths = cwd.split(path.sep);
    let rootFile = "package.json";
    let len = paths.length;
    return fileExistRe(cwd, rootFile)
}


function fileExistRe(way, file) {
    return isExist(path.resolve(way, file)).then((d) => {
        if (d) {
            return (rmLastPath(d, 1))
        } else {
            return fileExistRe(rmLastPath(way, 1), file)
        }
    })
}

function isExist(path) {
    if (typeof path !== "string") {
        throw new Error("path is required string")
    }
    return new Promise((resolve, reject) => {
        fs.stat(path, function (err, stat) {
            if (err) resolve(false)

            if (stat && stat.isFile()) {
                resolve(path);
            } else {
                resolve(false);
            }
        });
    })
}


function rmLastPath(p, i) {
    return p.split(path.sep).slice(0, p.split(path.sep).length - i).join(path.sep)
}

function isEmptyObj(obj) {
    return Object.keys(obj).length === 0
}

function writeAesFile(path, buf) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, aesHelper.aesEncryptFile(buf), (err) => {
            if (err) reject(err)
            resolve(true)
        });
    })

}

function removeFile(path) {
    return new Promise((resolve, reject) => {
        if (!path) reject("path must be")
        fs.unlink(path, (err) => {
            if (err) reject(err)
            resolve(true)
        })
    })
}

module.exports = {
    rmLastPath,
    isExist,
    cwdPath,
    isEmptyObj,
    writeAesFile,
    removeFile
}