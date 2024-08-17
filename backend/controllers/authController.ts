import { Request, Response } from 'express';
import { userSchema } from '../schemas/userSchema';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response) => {
  const detail = req.body;
  console.log(detail);

  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }
  // console.log(result);

  const newUser = result.data;
  // console.log("user: ", newUser);
  
  newUser.password = await bcrypt.hash(newUser.password, 10);

  try {
    const existingUserByUsername = await UserModel.findOne({ username: newUser.username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const existingUserByPhoneNumber = await UserModel.findOne({ phoneNumber: newUser.phoneNumber });
    if (existingUserByPhoneNumber) {
      return res.status(400).json({ message: 'Phone number already exists' });
    }

    const existingUserByEmail = await UserModel.findOne({ email: newUser.email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    console.log(newUser);
    
    const savedUser = await UserModel.create(newUser);

    return res.status(201).json({
      message: 'User created successfully',
      user: savedUser
    });
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log('Received login request:', { username, password });

  try {
    // Find the user by username
    const check_user = await UserModel.findOne({ username: username });
    console.log('User found in database:', check_user);

    // If user is not found, return an error
    if (!check_user) {
      return res.status(400).json({ message: 'No user with this username exists' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, check_user.password);
    
    // If the password is incorrect, return an error
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: check_user._id, role: check_user.role }, 'your_jwt_secret', { expiresIn: '24h' });

    return res.status(200).json({ token }); // Changed to status 200 for successful login
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const fetchAllStudents = async(req: Request, res: Response) => {
  // Fetch all students from the database
  const students = await UserModel.find({role: 'student'})
  const num_students = await UserModel.countDocuments({role: 'student'});
  return res.status(200).json({ students, num_students });
}


export const fetchAllTeachers = async(req: Request, res: Response) => {
  // Fetch all teachers from the database
  const teacher = await UserModel.find({role: 'teacher'})
  const num_teacher = await UserModel.countDocuments({role: 'teacher'});
  return res.status(200).json({ teacher, num_teacher });
}

