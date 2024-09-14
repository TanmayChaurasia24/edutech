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
exports.deleteCourse = exports.enrollStudentInCourse = exports.enrolledcourses = exports.fetchCourseArticles = exports.fetchAllCourse = exports.createCourse = void 0;
const courseModel_1 = __importDefault(require("../models/courseModel"));
const courseSchema_1 = require("../schemas/courseSchema");
const userModel_1 = __importDefault(require("../models/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = courseSchema_1.courseSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: result.error.issues[0].message });
    }
    const newCourse = result.data;
    try {
        const existingCourse = yield courseModel_1.default.findOne({ name: newCourse.name });
        if (existingCourse) {
            return res.status(400).json({ message: "Course with this title already exists" });
        }
        const new_course = yield courseModel_1.default.create(newCourse);
        return res.status(201).json({ message: "New course created", new_course });
    }
    catch (error) {
        console.error('Error creating course:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createCourse = createCourse;
const fetchAllCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {courseId}=req.params;
    try {
        const fetchall = yield courseModel_1.default.find();
        const numberOfCourses = yield courseModel_1.default.countDocuments();
        return res.status(200).json({ fetchall, numberOfCourses });
    }
    catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.fetchAllCourse = fetchAllCourse;
const fetchCourseArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    try {
        const findcourse = yield courseModel_1.default.findById(courseId).populate('articles');
        if (!findcourse) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json(findcourse.articles);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.fetchCourseArticles = fetchCourseArticles;
const enrolledcourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }
    try {
        const findstudent = yield userModel_1.default.findById(userId).populate('enrolledCourses');
        if (!findstudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({
            message: "Enrolled courses fetched successfully",
            courses: findstudent.enrolledCourses
        });
    }
    catch (error) {
        console.log("error in fetching courses in which student is enrolled", error);
        return res.status(500).json({ message: "internal server error" });
    }
});
exports.enrolledcourses = enrolledcourses;
const enrollStudentInCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, courseId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(studentId) || !mongoose_1.default.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: 'Invalid student ID or course ID' });
    }
    try {
        const studentfind = yield userModel_1.default.findById(studentId);
        if (!studentfind) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const coursefind = yield courseModel_1.default.findById(courseId);
        if (!coursefind) {
            return res.status(404).json({ message: 'Course not found' });
        }
        if (studentfind.role !== 'student') {
            return res.status(400).json({ message: 'User is not a student' });
        }
        if (studentfind.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: 'Student already enrolled in this course' });
        }
        studentfind.enrolledCourses.push(courseId);
        yield studentfind.save(); // Save the updated student document
        return res.status(200).json({ message: 'Successfully enrolled in the course', student: studentfind });
    }
    catch (error) {
        console.error("Error enrolling student in course:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.enrollStudentInCourse = enrollStudentInCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const coursefind = yield courseModel_1.default.findOne({ name });
        if (!coursefind) {
            return res.status(404).json({ message: "Course not found" });
        }
        yield courseModel_1.default.deleteOne({ name });
        return res.status(200).json({ message: "Course deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteCourse = deleteCourse;
