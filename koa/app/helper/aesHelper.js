/**
 * Created by v_lianwang on 2016/11/5.
 */

const crypto = require('crypto'),
    taskConfig = require('../../config/config.json'),
    fs = require('fs'),
    zlib = require("zlib")

/**
 * timestamp 
 * data 
 */
functiomd5Signature(timestamp, data) {
    if (!timestamp) throw 'timestamp is required';
    if (typeof data !== "string") throw "data is string";
    data = data || "";
    if (data.length > 16) {
        data = data.substr(0, 16);
    }
    let signatureKey = taskConfig.SignatureKey;
    let upperCase = `${timestamp}.${data}.${signatureKey}`.toUpperCase();
    return md5(upperCase);
}

function aesEncrypt(str) {
    let secretKey = taskConfig.SecretKey;
    let iv = md5(secretKey).substring(0, 16);
    let cipherChunks = [];
    let cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    cipherChunks.push(cipher.update(str, "utf8", "hex"));
    cipherChunks.push(cipher.final("hex"));
    return cipherChunks.join("");
}

function aesDecrypt(encryptStr) {
    let secretKey = taskConfig.SecretKey;
    let iv = md5(secretKey).substr(0, 16);
    let cipherChunks = [];
    let decipher = crypto.createDecipheriv("aes256", secretKey, iv);
    cipherChunks.push(decipher.update(encryptStr, "hex", "utf8"));
    cipherChunks.push(decipher.final("utf8"));
    return cipherChunks.join("");
}


function aesEncryptFile(file) {
    if (file.length < 0) throw "file is not cannot be empty";
    if (file instanceof Buffer) {
        let secretKey = taskConfig.SecretKey;
        let iv = md5(secretKey).substring(0, 16);
        let cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
        return Buffer.concat([cipher.update(file), cipher.final()])
    } else {
        throw "file is required Buffer";
    }
}

function aesDecryptFile(encryptFile) {
    if (encryptFile instanceof Buffer) {
        let secretKey = taskConfig.SecretKey;
        let iv = md5(secretKey).substring(0, 16);
        let decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
        return Buffer.concat([decipher.update(encryptFile), decipher.final()])
    } else {
        throw "file is required Buffer";
    }
}

function md5(str) {
    str = Buffer.from(str);
    let md5Hash = crypto.createHash('md5');
    md5Hash.update(str);
    return md5Hash.digest("hex");
}


function aesDecryptStream() {
    let secretKey = taskConfig.SecretKey;
    let iv = md5(secretKey).substr(0, 16);
    return crypto.createDecipheriv("aes256", secretKey, iv);
}

function aesEncryptStream() {
    let secretKey = taskConfig.SecretKey;
    let iv = md5(secretKey).substring(0, 16);
    return crypto.createCipheriv("aes-256-cbc", secretKey, iv);
}

function HmacSHA1(str,secretKey) {
    var upperCase = str.toUpperCase();
    var hmac = crypto.createHmac('sha1', secretKey);
    hmac.update(upperCase);
    return hmac.digest('hex');
}

function AesEncryptStr(str,secretKey) {
    let iv = md5(secretKey).substring(0, 16);
    let cipherChunks = [];
    let cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    cipherChunks.push(cipher.update(str, "utf8", "hex"));
    cipherChunks.push(cipher.final("hex"));
    return cipherChunks.join("");
}

function AesDecryptStr(encryptStr,secretKey) {
    let iv = md5(secretKey).substr(0, 16);
    let cipherChunks = [];
    let decipher = crypto.createDecipheriv("aes256", secretKey, iv);
    cipherChunks.push(decipher.update(encryptStr, "hex", "utf8"));
    cipherChunks.push(decipher.final("utf8"));
    return cipherChunks.join("");
}


exports.md5Signature = md5Signature;
exports.aesDecryptFile = aesDecryptFile;
exports.aesEncryptFile = aesEncryptFile;
exports.aesEncrypt = aesEncrypt;
exports.aesDecrypt = aesDecrypt;
exports.aesDecryptStream = aesDecryptStream;
exports.aesEncryptStream = aesEncryptStream;
exports.HmacSHA1 = HmacSHA1;
exports.AesEncryptStr = AesEncryptStr;
exports.AesDecryptStr = AesDecryptStr;