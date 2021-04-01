"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var user_1 = require("../controllers/user");
var is_auth_1 = __importDefault(require("../middlewares/is-auth"));
var router = express_1.Router();
router.get('/', is_auth_1.default, user_1.getUser);
router.patch('/update', [
    express_validator_1.body('name').custom(function (value, _a) {
        var req = _a.req;
        if (value && value.length < 3) {
            return Promise.reject('Name must have atleast 3 characters long');
        }
        return true;
    }),
    express_validator_1.body('age').custom(function (value, _a) {
        var req = _a.req;
        if (value && Number.isNaN(value)) {
            return Promise.reject('Age must be a number');
        }
        return true;
    }),
    express_validator_1.body('gender').custom(function (value, _a) {
        var req = _a.req;
        var genderArray = ['male', 'female', 'other'];
        if (value && !genderArray.includes(value.toLowerCase())) {
            return Promise.reject('Not a valid gender');
        }
        return true;
    }),
], is_auth_1.default, user_1.updateProfile);
exports.default = router;
