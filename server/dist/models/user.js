"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../helpers/database");
var mongodb_1 = require("mongodb");
var User = /** @class */ (function () {
    function User(email, password, signedAt, name, age, gender) {
        this.age = undefined;
        this.gender = undefined;
        this.email = email;
        this.password = password;
        this.signedAt = signedAt;
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    User.prototype.save = function () {
        return database_1.getDb().collection('users').insertOne(this);
    };
    User.findByEmail = function (email) {
        return database_1.getDb().collection('users').findOne({ email: email });
    };
    User.findById = function (id) {
        return database_1.getDb().collection('users').findOne({ _id: new mongodb_1.ObjectId(id) });
    };
    User.updateById = function (id, values) {
        return database_1.getDb().collection('users').findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: values }, { returnOriginal: false });
    };
    return User;
}());
exports.default = User;
