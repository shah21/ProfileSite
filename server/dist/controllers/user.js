"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getUser = void 0;
var express_validator_1 = require("express-validator");
var HttpException_1 = __importDefault(require("../utils/HttpException"));
var user_1 = __importDefault(require("../models/user"));
var getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error, userObj, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    error = new HttpException_1.default("User not found");
                    error.statusCode = 404;
                    throw error;
                }
                userObj = {
                    _id: user._id,
                    email: user.email,
                    signedAt: user.signedAt,
                    age: user.age,
                    gender: user.gender,
                    name: user.name
                };
                res.status(200).json({ messge: 'success', user: userObj });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                if (!err_1.statusCode) {
                    err_1.statusCode = 500;
                }
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var updateProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, name, age, gender, errors, error, user, error, values, updatedValue, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.userId;
                name = req.body.name;
                age = req.body.age;
                gender = req.body.gender;
                errors = express_validator_1.validationResult(req).array();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (errors.length > 0) {
                    error = new HttpException_1.default("Invalid data");
                    error.message = errors[0].msg;
                    error.statusCode = 422;
                    error.data = errors;
                    throw error;
                }
                return [4 /*yield*/, user_1.default.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    error = new HttpException_1.default("User not found");
                    error.statusCode = 401;
                    throw error;
                }
                values = {};
                if (typeof (name) !== 'undefined') {
                    values.name = name;
                }
                if (typeof (age) !== 'undefined') {
                    values['age'] = Number.parseInt(age);
                }
                if (typeof (gender) !== 'undefined' && gender.length > 0) {
                    values.gender = gender;
                }
                console.log(values);
                return [4 /*yield*/, user_1.default.updateById(userId, values)];
            case 3: return [4 /*yield*/, (_a.sent()).value];
            case 4:
                updatedValue = _a.sent();
                res.status(200).json({ messge: 'updated successfully!', user: updatedValue });
                return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                console.log(err_2);
                if (!err_2.statusCode) {
                    err_2.statusCode = 500;
                }
                next(err_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateProfile = updateProfile;