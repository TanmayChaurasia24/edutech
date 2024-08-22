import { Request, Response } from "express";
import course from '../models/courseModel';
import { courseSchema } from "../schemas/courseSchema";
import student from "../models/userModel";
import mongoose from "mongoose";

export const createCourse = async (req: Request, res: Response) => {
    const detail = req.body;

    const result = courseSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: result.error.issues[0].message });
    }

    const newCourse = result.data;
    console.log('course to create: ', newCourse);

    try {
        const existingCourse = await course.findOne({ name: newCourse.name });

        if (existingCourse) {
            return res.status(400).json({ message: "course with this title already exists" });
        }

        const new_course = await course.create(newCourse);

        return res.status(201).json({ message: "new course created", new_course });
    } catch (error) {
        return res.status(400).json({ message: "internal server error" });
    }
};

export const fetchAllCourse = async (req: Request, res: Response) => {
    try {
        const fetchall = await course.find();
        const numberOfCourses = await course.countDocuments();
        return res.status(200).json({ fetchall, numberOfCourses });

    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
};

export const fetchCourseArticles = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    try {
        const findcourse = await course.findById(courseId).populate('articles');

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
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: "Invalid student ID" });
    }
    try {
        const findstudent = await student.findById(studentId).populate('enrolledCourses');

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
    const courseid = new mongoose.Types.ObjectId(courseId);

    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: 'Invalid student ID or course ID' });
    }

    try {
        const studentfind = await student.findById(studentId);
        if (!studentfind) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const coursefind = await course.findById(courseId);
        if (!coursefind) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (studentfind.role !== 'student') {
            return res.status(400).json({ message: 'User is not a student' });
        }

        if (studentfind.enrolledCourses.includes(courseid)) {
            return res.status(400).json({ message: 'Student already enrolled in this course' });
        }

        studentfind.enrolledCourses.push(courseid);
        await studentfind.save(); // Save the updated student document

        return res.status(200).json({ message: 'Successfully enrolled in the course', student: studentfind });
    } catch (error) {
        console.error("Error enrolling student in course:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
