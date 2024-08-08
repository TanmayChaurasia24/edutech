"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseSchema = void 0;
const zod_1 = require("zod");
exports.courseSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(100),
    description: zod_1.z.string().min(50).max(300),
    articles: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string().min(3).max(100),
        content: zod_1.z.string().min(20),
        image: zod_1.z.string().url().optional()
    })).optional(),
    video: zod_1.z.string().url().optional(),
    thumbnail: zod_1.z.string().url().optional()
});
