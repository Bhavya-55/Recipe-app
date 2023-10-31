"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupInput = void 0;
var zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().min(5).max(10),
    password: zod_1.z.string().min(5).max(10)
});
