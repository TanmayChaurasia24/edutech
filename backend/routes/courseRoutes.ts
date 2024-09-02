import { Router } from "express";
import {createCourse,enrollStudentInCourse,fetchAllCourse,fetchCourseArticles,deleteCourse} from "../controllers/courseController"
import { authenticate } from "../utils/userAuthenticate";

const router = Router();

router.post('/create',authenticate,createCourse);
router.get('/all',fetchAllCourse);
router.get('/:courseId/articles',authenticate, fetchCourseArticles);
router.post('/:courseId/:studentId/add',authenticate,enrollStudentInCourse);
router.delete('/courseDelete',deleteCourse);

export default router;
