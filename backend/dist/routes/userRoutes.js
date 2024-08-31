"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/signup', authController_1.signUp);
router.post('/login', authController_1.Login);
router.get('/allstudents', authController_1.fetchAllStudents);
router.get('/allteachers', authController_1.fetchAllTeachers);
router.delete('/deleteStudent', authController_1.deleteStudent);
router.delete('/deleteTeacher', authController_1.deleteTeacher);
exports.default = router;
