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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const courseModel_1 = __importDefault(require("../models/courseModel"));
const courseSchema_1 = require("../schemas/courseSchema");
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detail = req.body;
    console.log(detail);
    const result = courseSchema_1.courseSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: result.error.issues[0].message });
    }
    console.log(result);
    const newCourse = result.data;
    console.log('course to create: ', newCourse);
    try {
        const existingCourse = yield courseModel_1.default.findOne({ name: newCourse.name });
        if (existingCourse) {
            return res.status(400).json({ message: "course with this title already exists" });
        }
        const new_course = yield courseModel_1.default.create(newCourse);
        return res.status(201).json({ message: "new course created", new_course });
    }
    catch (error) {
        return res.status(400).json({ message: "internal server error" });
    }
});
exports.createCourse = createCourse;
