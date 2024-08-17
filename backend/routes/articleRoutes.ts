import { Router } from "express"; 
import {createArticle} from "../controllers/articleController"

const router = Router();

router.post('/create/:courseId',createArticle);


export default router;
