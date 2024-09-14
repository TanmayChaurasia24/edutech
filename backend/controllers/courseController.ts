import { Request, Response } from "express";
import Course from '../models/courseModel';
import { courseSchema } from "../schemas/courseSchema";
import student from "../models/userModel";
import mongoose from "mongoose";

export const createCourse = async (req: Request, res: Response) => {
    const result = courseSchema.safeParse(req.body);
    
    if (!result.success) {
        return res.status(400).json({ message: result.error.issues[0].message });
    }

    const newCourse = result.data;

    try {
        const existingCourse = await Course.findOne({ name: newCourse.name });

        if (existingCourse) {
            return res.status(400).json({ message: "Course with this title already exists" });
        }

        const new_course = await Course.create(newCourse);
        return res.status(201).json({ message: "New course created", new_course });
    } catch (error) {
        console.error('Error creating course:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const fetchAllCourse = async (req: Request, res: Response) => {
    // const {courseId}=req.params;
    try {
        const fetchall = await Course.find();
        const numberOfCourses = await Course.countDocuments();
        return res.status(200).json({ fetchall, numberOfCourses });

    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
};

export const fetchCourseArticles = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    try {
        const findcourse = await Course.findById(courseId).populate('articles');

        if (!findcourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json(findcourse.articles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const enrolledcourses = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }
    try {
        const findstudent = await student.findById(userId).populate('enrolledCourses');

        if (!findstudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({
            message: "Enrolled courses fetched successfully",
            courses: findstudent.enrolledCourses
        });
    } catch (error) {
        console.log("error in fetching courses in which student is enrolled", error);
        return res.status(500).json({ message: "internal server error" });
    }
};

export const enrollStudentInCourse = async (req: Request, res: Response) => {
    const { studentId, courseId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: 'Invalid student ID or course ID' });
    }

    try {
        const studentfind = await student.findById(studentId);
        if (!studentfind) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const coursefind = await Course.findById(courseId);
        if (!coursefind) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (studentfind.role !== 'student') {
            return res.status(400).json({ message: 'User is not a student' });
        }

        if (studentfind.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: 'Student already enrolled in this course' });
        }

        studentfind.enrolledCourses.push(courseId);
        await studentfind.save(); // Save the updated student document

        return res.status(200).json({ message: 'Successfully enrolled in the course', student: studentfind });
    } catch (error) {
        console.error("Error enrolling student in course:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const coursefind = await Course.findOne({ name });
        if (!coursefind) {
            return res.status(404).json({ message: "Course not found" });
        }
        await coursefind.deleteOne();
        return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


