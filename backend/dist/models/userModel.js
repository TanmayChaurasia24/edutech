"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50, // Adjusted max length for longer names
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 150,
    },
    role: {
        type: String,
        required: true,
        enum: ["student", "teacher"],
    },
    collegeName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50, // Adjusted max length for longer names
    },
    city: {
        type: String,
        required: true,
        minlength: 2, // Adjusted min length for flexibility
        maxlength: 30, // Adjusted max length for flexibility
    },
    state: {
        type: String,
        required: true,
        minlength: 2, // Adjusted min length for flexibility
        maxlength: 30, // Adjusted max length for flexibility
    },
    country: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30, // Adjusted max length for broader range
    },
    enrolledCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Course" }],
    subject: {
        type: String,
        maxlength: 50,
    },
    teachingExperience: {
        type: Number,
        min: 0, // Added min value to ensure non-negative experience
        max: 50,
    },
});
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
