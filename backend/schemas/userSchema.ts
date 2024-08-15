import { z } from 'zod';

export const studentSchema = z.object({
  role: z.literal( 'student'),
  collegeName: z.string().min(3).max(50),  // Adjusted max to accommodate longer names
  city: z.string().min(2).max(30),         // Adjusted min and max for more flexibility
  state: z.string().min(2).max(30),        // Adjusted min and max for more flexibility
  country: z.string().min(2).max(30),      // Adjusted max for broader range of country names
});

export const teacherSchema = z.object({
  role: z.literal('teacher'),
  collegeName: z.string().min(3).max(50),  // Adjusted max to accommodate longer names
  city: z.string().min(2).max(30),         // Adjusted min and max for more flexibility
  state: z.string().min(2).max(30),        // Adjusted min and max for more flexibility
  country: z.string().min(2).max(30),      // Adjusted max for broader range of country names
  subject: z.string().min(3).max(50),      // Adjusted max to accommodate longer subject names
  teachingExperience: z.number().min(0).max(50), // Added min value for teaching experience
});

export const userSchema = z
  .object({
    username: z.string().min(3).max(20),
    name: z.string().min(3).max(50),       // Adjusted max to accommodate longer names
    phoneNumber: z.string().regex(/^\d{10}$/), 
    email: z.string().email(),
    password: z.string().min(8).max(150),  // Adjusted max to accommodate more complex passwords
  })
  .and(z.union([studentSchema, teacherSchema]));

export type User = z.infer<typeof userSchema>;
