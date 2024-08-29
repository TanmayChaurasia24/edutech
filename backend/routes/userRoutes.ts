import express from 'express';
import { signUp,Login,fetchAllStudents,fetchAllTeachers} from '../controllers/authController';
import { authenticate } from '../utils/userAuthenticate';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', Login);
router.get('/allstudents',fetchAllStudents);
router.get('/allteachers',fetchAllTeachers);

export default router;
