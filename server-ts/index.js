"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3001;
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//app.use("/auth", authRoutes);
//app.use("/route", router);
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
mongoose_1.default.connect("mongodb+srv://bhavya601474:bhavyaMongoDb@cluster0.selravw.mongodb.net/", { dbName: "recipes" });
