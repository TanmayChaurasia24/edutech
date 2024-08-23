import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

declare module 'express-serve-static-core' {
  interface Request {
    user?: import('mongoose').Document<unknown, {}, IUser> & IUser & { _id: unknown };
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  if(!process.env.JWT_SECRET){
      return res.status(500).json({ message: 'Internal Server Error' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { _id: string };
    console.log('decoded', decoded._id);
    console.log('decoded', decoded._id);
    console.log("JWT_SECRET",process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
