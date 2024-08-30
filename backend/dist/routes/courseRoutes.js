"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../controllers/courseController");
const userAuthenticate_1 = require("../utils/userAuthenticate");
const router = (0, express_1.Router)();
router.post('/create', userAuthenticate_1.authenticate, courseController_1.createCourse);
router.get('/all', courseController_1.fetchAllCourse);
router.get('/:courseId/articles', userAuthenticate_1.authenticate, courseController_1.fetchCourseArticles);
router.post('/:courseId/:studentId/add', userAuthenticate_1.authenticate, courseController_1.enrollStudentInCourse);
exports.default = router;
