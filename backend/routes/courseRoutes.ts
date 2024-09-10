import { Router } from "express";
import {createCourse,enrollStudentInCourse,fetchAllCourse,fetchCourseArticles,deleteCourse} from "../controllers/courseController.js";
import { authenticate } from "../utils/userAuthenticate";

const router = Router();

router.post('/create',createCourse);
router.get('/all',fetchAllCourse);
router.get('/:courseId/articles',authenticate, fetchCourseArticles);
router.post('/:courseId/:studentId/add',authenticate,enrollStudentInCourse);
router.post('/courseDelete',deleteCourse);

export default router;
