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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.secret = void 0;
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3001;
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//app.use("/auth", authRoutes);
//app.use("/route", router);
var userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
var recipeSchema = new mongoose_1.default.Schema({
    title: String,
    ingredients: String,
    imgLink: String,
    description: String,
    published: Boolean,
});
var User = mongoose_1.default.model("User", userSchema);
var Recipe = mongoose_1.default.model("Recipe", recipeSchema);
var jsonwebtoken_1 = require("jsonwebtoken");
exports.secret = "euhgh";
var authenticateJwt = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, exports.secret, function (err, payload) {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }
            req.headers['userId'] = payload.id;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
mongoose_1.default.connect("mongodb+srv://bhavya601474:bhavyaMongoDb@cluster0.selravw.mongodb.net/", { dbName: "recipes" });
app.post("/user/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, newUser, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("Accessed /user/signup route"); // Add this line
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, User.findOne({ username: username })];
            case 1:
                user = _b.sent();
                if (user) {
                    res.status(403).json({ message: "Username alredy exists" });
                }
                newUser = new User({ username: username, password: password });
                return [4 /*yield*/, newUser.save()];
            case 2:
                _b.sent();
                token = jsonwebtoken_1.default.sign({ username: username, role: "user" }, exports.secret, {
                    expiresIn: "1hr",
                });
                res.json({ message: "Username created Successfully", token: token });
                return [2 /*return*/];
        }
    });
}); });
app.post("/user/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, User.findOne({ username: username, password: password })];
            case 1:
                user = _b.sent();
                if (user) {
                    res.json({ message: "Logged in Succesfully" });
                }
                else {
                    res.sendStatus(403);
                }
                return [2 /*return*/];
        }
    });
}); });
//me,put,getP,getAll recipe pub
app.get("/user/me", exports.authenticateJwt, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.headers['userId'];
                return [4 /*yield*/, User.findOne({ userId: userId })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(403).json({ msg: "User doesnt exist" });
                    return [2 /*return*/];
                }
                res.json({ username: user.username });
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
