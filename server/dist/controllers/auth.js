"use strict";
/* Controllers/Middleware functions of auth apis */
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
exports.postSignup = exports.postLogin = void 0;
var express_validator_1 = require("express-validator");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var HttpException_1 = __importDefault(require("../utils/HttpException"));
var jwt_helper_1 = require("../helpers/jwt_helper");
var user_1 = __importDefault(require("../models/user"));
/* Login user */
var postLogin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, errors, user, error, isPasswordsEqual, error, payload, accessToken, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                errors = express_validator_1.validationResult(req).array();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, user_1.default.findByEmail(email)];
            case 2:
                user = _a.sent();
                if (!user) {
                    error = new HttpException_1.default("Incorrect Email");
                    error.statusCode = 404;
                    error.data = errors;
                    throw error;
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 3:
                isPasswordsEqual = _a.sent();
                if (!isPasswordsEqual) {
                    error = new HttpException_1.default('Incorrect Password');
                    error.statusCode = 401;
                    error.data = errors;
                    throw error;
                }
                payload = { userId: user._id };
                return [4 /*yield*/, jwt_helper_1.generateAccessToken(payload)];
            case 4:
                accessToken = _a.sent();
                res.status(200).json({ message: 'login successfull.', data: { accessToken: accessToken, userId: user._id } });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                /* If no error code avaiable then assign 500 */
                if (!err_1.statusCode) {
                    err_1.statusCode = 500;
                }
                //Pass to custom error handler
                next(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postLogin = postLogin;
/* Register user */
var postSignup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, name, errors, error, hashedPass, newUser, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                name = req.body.name;
                errors = express_validator_1.validationResult(req).array();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                /* Erros from express-validator */
                if (errors.length > 0) {
                    error = new HttpException_1.default("Invalid data");
                    error.message = errors[0].msg;
                    error.statusCode = 422;
                    error.data = errors;
                    throw error;
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 12)];
            case 2:
                hashedPass = _a.sent();
                newUser = new user_1.default(email, hashedPass, Date.now(), name);
                /* Save user to db */
                return [4 /*yield*/, newUser.save()];
            case 3:
                /* Save user to db */
                _a.sent();
                res.status(201).json({ messge: 'user created successfully' });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                if (!err_2.statusCode) {
                    err_2.statusCode = 500;
                }
                next(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postSignup = postSignup;
