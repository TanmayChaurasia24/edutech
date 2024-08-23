"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationSchema = void 0;
const zod_1 = require("zod");
exports.conversationSchema = zod_1.z.object({
    participants: zod_1.z.array(zod_1.z.string()),
    messages: zod_1.z.array(zod_1.z.string())
});
