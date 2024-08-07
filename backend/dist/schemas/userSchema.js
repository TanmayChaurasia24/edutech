"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.teacherSchema = exports.studentSchema = void 0;
const zod_1 = require("zod");
exports.studentSchema = zod_1.z.object({
    role: zod_1.z.literal('student'),
    collegeName: zod_1.z.string().min(3).max(50), // Adjusted max to accommodate longer names
    city: zod_1.z.string().min(2).max(30), // Adjusted min and max for more flexibility
    state: zod_1.z.string().min(2).max(30), // Adjusted min and max for more flexibility
    country: zod_1.z.string().min(2).max(30), // Adjusted max for broader range of country names
});
exports.teacherSchema = zod_1.z.object({
    role: zod_1.z.literal('teacher'),
    collegeName: zod_1.z.string().min(3).max(50), // Adjusted max to accommodate longer names
    city: zod_1.z.string().min(2).max(30), // Adjusted min and max for more flexibility
    state: zod_1.z.string().min(2).max(30), // Adjusted min and max for more flexibility
    country: zod_1.z.string().min(2).max(30), // Adjusted max for broader range of country names
    subject: zod_1.z.string().min(3).max(50), // Adjusted max to accommodate longer subject names
    teachingExperience: zod_1.z.number().min(0).max(50), // Added min value for teaching experience
});
exports.userSchema = zod_1.z
    .object({
    username: zod_1.z.string().min(3).max(20),
    name: zod_1.z.string().min(3).max(50), // Adjusted max to accommodate longer names
    phoneNumber: zod_1.z.string().regex(/^\d{10}$/),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(150), // Adjusted max to accommodate more complex passwords
})
    .and(zod_1.z.union([exports.studentSchema, exports.teacherSchema]));
