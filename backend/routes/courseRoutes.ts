import { Express, Router } from "express";
import {createCourse} from "../controllers/courseController"

const router = Router();

router.post('/create',createCourse);


export default router;

