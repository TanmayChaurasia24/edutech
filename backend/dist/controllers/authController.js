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
exports.signUp = void 0;
const userSchema_1 = require("../schemas/userSchema");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
