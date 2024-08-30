"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.fetchAllTeachers = exports.fetchAllStudents = exports.Login = exports.signUp = void 0;
const userSchema_1 = require("../schemas/userSchema");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detail = req.body;
    console.log(detail);
    const result = userSchema_1.userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json(result.error.errors);
    }
    // console.log(result);
    const newUser = result.data;
    // console.log("user: ", newUser);
    newUser.password = yield bcrypt_1.default.hash(newUser.password, 10);
    try {
        const existingUserByUsername = yield userModel_1.default.findOne({ username: newUser.username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const existingUserByPhoneNumber = yield userModel_1.default.findOne({ phoneNumber: newUser.phoneNumber });
        if (existingUserByPhoneNumber) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }
        const existingUserByEmail = yield userModel_1.default.findOne({ email: newUser.email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.log(newUser);
        const savedUser = yield userModel_1.default.create(newUser);
        const token = jsonwebtoken_1.default.sign({ id: savedUser._id }, 'your_jwt_secret');
        return res.status(201).json({
            message: 'User created successfully',
            user: savedUser,
            token: token
        });
    }
    catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.signUp = signUp;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });
    try {
        // Find the user by username
        const check_user = yield userModel_1.default.findOne({ username: username });
        console.log('User found in database:', check_user);
        // If user is not found, return an error
        if (!check_user) {
            return res.status(400).json({ message: 'No user with this username exists' });
        }
        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, check_user.password);
        // If the password is incorrect, return an error
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        const token = jsonwebtoken_1.default.sign({ _id: check_user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json({ token }); // Changed to status 200 for successful login
    }
    catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.Login = Login;
const fetchAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all students from the database
    const students = yield userModel_1.default.find({ role: 'student' });
    const num_students = yield userModel_1.default.countDocuments({ role: 'student' });
    return res.status(200).json({ students, num_students });
});
exports.fetchAllStudents = fetchAllStudents;
const fetchAllTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch all teachers from the database
    const teacher = yield userModel_1.default.find({ role: 'teacher' });
    const num_teacher = yield userModel_1.default.countDocuments({ role: 'teacher' });
    return res.status(200).json({ teacher, num_teacher });
});
exports.fetchAllTeachers = fetchAllTeachers;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    try {
        const user = yield userModel_1.default.findOne({ username, role: 'student' });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield user.deleteOne();
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
});
exports.deleteStudent = deleteStudent;
