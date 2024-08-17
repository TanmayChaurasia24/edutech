import { Router } from "express";
import {createCourse,enrollStudentInCourse,fetchAllCourse,fetchCourseArticles} from "../controllers/courseController"

const router = Router();

router.post('/create',createCourse);
router.get('/all',fetchAllCourse);
router.get('/:courseId/articles', fetchCourseArticles);
router.post('/:courseId/:studentId/add',enrollStudentInCourse);

export default router;
