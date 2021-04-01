"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require("dotenv/config");
var auth_1 = __importDefault(require("./routes/auth"));
var user_1 = __importDefault(require("./routes/user"));
var database_1 = require("./helpers/database");
var app = express_1.default();
/* Midddlewares */
app.use(cors_1.default());
app.use(express_1.default.json());
/* Cors free requests */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});
/* Routes */
app.use('/auth', auth_1.default);
app.use('/user', user_1.default);
/* Error handler middleware */
app.use(function (error, req, res, next) {
    var status = error.statusCode || 500;
    var message = error.message;
    var data = error.data;
    res.status(status).json({ message: message, errors: data });
});
database_1.connectDb(function () {
    console.log('Database connection successfull!');
    app.listen(3030, function () {
        console.log('listening...');
    });
});
