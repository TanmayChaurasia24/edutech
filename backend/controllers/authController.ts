import { Request, Response } from 'express';
import { userSchema } from '../schemas/userSchema';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';

export const signUp = async (req: Request, res: Response) => {
  const detail = req.body;
  console.log(detail);

  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }
  console.log(result);

  const newUser = result.data;
  console.log("user: ", newUser);
  
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
