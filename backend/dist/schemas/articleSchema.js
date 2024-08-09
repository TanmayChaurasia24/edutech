"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleSchema = void 0;
const zod_1 = require("zod");
exports.articleSchema = zod_1.z.object({
    courseName: zod_1.z.string(),
    articleTitle: zod_1.z.string().min(10).max(100),
    content: zod_1.z.string().min(50),
    author: zod_1.z.string(),
    image: zod_1.z.string().url().optional(),
});
