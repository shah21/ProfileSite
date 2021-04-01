"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.connectDb = exports.DB_URI = void 0;
var mongodb_1 = require("mongodb");
exports.DB_URI = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@cluster0.7qkan.mongodb.net/" + process.env.MONGO_DEFAULT_DB + "?retryWrites=true&w=majority";
var _db;
var connectDb = function (callback) {
    mongodb_1.MongoClient.connect(exports.DB_URI, { useUnifiedTopology: true }, function (err, client) {
        if (err) {
            console.log(err);
            throw new Error(err.message);
        }
        _db = client.db();
        callback();
    });
};
exports.connectDb = connectDb;
var getDb = function () {
    if (!_db) {
        throw new Error('No database found.');
    }
    return _db;
};
exports.getDb = getDb;
