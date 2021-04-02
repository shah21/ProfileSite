"use strict";
/* Helper fundtion for create abnd verify jwt token */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* Generate new token */
var generateAccessToken = function (payload) {
    return new Promise(function (resolve, reject) {
        /* Sign new token */
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24hr' }, function (err, token) {
            if (err) {
                reject(err.message);
            }
            resolve(token);
        });
    });
};
exports.generateAccessToken = generateAccessToken;
/* Verify accessToken with secret key */
var verifyAccessToken = function (token) {
    return new Promise(function (resolve, reject) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, function (err, payload) {
            if (err) {
                /* If token is malfunctioned or expired */
                err.message = "Not authorized";
                reject(err);
            }
            resolve(payload);
        });
    });
};
exports.verifyAccessToken = verifyAccessToken;
