import express from 'express';
import { signUp,Login,fetchAllStudents,fetchAllTeachers,deleteStudent, deleteTeacher, fetchUser} from '../controllers/authController';
import { authenticate } from '../utils/userAuthenticate';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', Login);
router.get("/currentuser/:userId",authenticate,fetchUser);
router.get('/allstudents',fetchAllStudents);
router.get('/allteachers',fetchAllTeachers);
router.delete('/deleteStudent',deleteStudent);
router.delete('/deleteTeacher',deleteTeacher);

export default router;
