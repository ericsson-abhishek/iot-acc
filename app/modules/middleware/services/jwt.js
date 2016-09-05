var bcrypt = require('bcrypt-nodejs');
var _ = require("underscore");
var crypto = require("crypto-js");
var jwt = require("jsonwebtoken");


var generateJWTtoken = function(userId, type) {
    return new Promise(function(resolve, reject) {
        if (!_.isString(type)) {
            reject(undefined);
        }
        try {
            // creating the JSON String data that I want to encrypt in the json web token
            var userJson = JSON.stringify({ id: userId, type: type });
            // returns the encrypted sting using Crypto
            var encryptedData = crypto.AES.encrypt(userJson, 'cryptotokentodo#123*&').toString();
            var token = jwt.sign({ token: encryptedData }, 'jwttokentodo#123*&');
            console.log("generated [" + token + "]");
            resolve(token);
        } catch (e) {
            console.log(e, e.stack.split("\n"));
            reject(undefined);
        }
    });

}

var getUserInfoFromJWT = function(token) {
    return new Promise(function(resolve, reject) {
        try {
            var jwtDecoded = jwt.verify(token, 'jwttokentodo#123*&');
            var bytes = crypto.AES.decrypt(jwtDecoded.token, 'cryptotokentodo#123*&');
            var tokenData = JSON.parse(bytes.toString(crypto.enc.Utf8));
            resolve(tokenData.id);
        } catch (ex) {
            console.log(ex, ex.stack.split("\n"));
            reject(undefined);
        }

    })
}

module.exports.generateJWTtoken = generateJWTtoken;
module.exports.getUserInfoFromJWT = getUserInfoFromJWT;

// console.log(generateJWTtoken("adioi", "auth"));
// (generateJWTtoken("adioi", "auth")).then(function(res, err) { console.log(getUserInfoFromJWT(res)) });