import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: "student" | "teacher";
  collegeName: string;
  city: string;
  state: string;
  country: string;
  enrolledCourses:Array<mongoose.Schema.Types.ObjectId>
  subject?: string;
  teachingExperience?: number;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50, // Adjusted max length for longer names
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 150,
  },
  role: {
    type: String,
    required: true,
    enum: ["student", "teacher"],
  },
  collegeName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50, // Adjusted max length for longer names
  },
  city: {
    type: String,
    required: true,
    minlength: 2, // Adjusted min length for flexibility
    maxlength: 30, // Adjusted max length for flexibility
  },
  state: {
    type: String,
    required: true,
    minlength: 2, // Adjusted min length for flexibility
    maxlength: 30, // Adjusted max length for flexibility
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30, // Adjusted max length for broader range
  },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  subject: {
    type: String,
    maxlength: 50,
  },
  teachingExperience: {
    type: Number,
    min: 0, // Added min value to ensure non-negative experience
    max: 50,
  },
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
