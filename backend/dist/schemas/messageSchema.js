"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const zod_1 = require("zod");
exports.messageSchema = zod_1.z.object({
    senderId: zod_1.z.string(),
    recieverId: zod_1.z.string(),
    message: zod_1.z.string()
});
