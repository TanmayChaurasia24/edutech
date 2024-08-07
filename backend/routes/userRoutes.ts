import express from 'express';
import { signUp,Login,fetchAllStudents,fetchAllTeachers} from '../controllers/authController';

const router = express.Router();

router.post('/signup', signUp);
router.get('/login', Login);
router.get('/allstudents', fetchAllStudents);
router.get('/allteachers', fetchAllTeachers);

export default router;
