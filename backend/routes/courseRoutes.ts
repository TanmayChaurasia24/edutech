import { Express, Router } from "express";
import {createCourse,fetchAllCourse} from "../controllers/courseController"
import {authenticate} from "../utils/userAuthenticate"

const router = Router();

router.post('/create',createCourse);
router.get('/all',fetchAllCourse);


export default router;

