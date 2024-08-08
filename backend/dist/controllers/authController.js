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
exports.fetchAllTeachers = exports.fetchAllStudents = exports.Login = exports.signUp = void 0;
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
    console.log(result);
    const newUser = result.data;
    console.log("user: ", newUser);
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
        const savedUser = yield userModel_1.default.create(newUser);
        return res.status(201).json({
            message: 'User created successfully',
            user: savedUser
        });
    }
    catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.signUp = signUp;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    console.log(username, password);
    try {
        // Find the user by username
        const check_user = yield userModel_1.default.findOne({ username: username });
        console.log(check_user);
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
        const token = jsonwebtoken_1.default.sign({ id: check_user._id, role: check_user.role }, 'your_jwt_secret', { expiresIn: '24h' });
        return res.status(201).json({ token });
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
