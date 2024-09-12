"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_js_1 = require("../controllers/courseController.js");
const userAuthenticate_1 = require("../utils/userAuthenticate");
const router = (0, express_1.Router)();
router.post('/create', courseController_js_1.createCourse);
router.get('/all', courseController_js_1.fetchAllCourse);
router.get("/enrolledCourses/:userId", userAuthenticate_1.authenticate, courseController_js_1.enrolledcourses);
router.get('/:courseId/articles', userAuthenticate_1.authenticate, courseController_js_1.fetchCourseArticles);
router.post('/:courseId/:studentId/add', userAuthenticate_1.authenticate, courseController_js_1.enrollStudentInCourse);
router.post('/courseDelete', courseController_js_1.deleteCourse);
exports.default = router;
