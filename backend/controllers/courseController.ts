import { Request,Response } from "express";
import course from '../models/courseModel';
import { courseSchema } from "../schemas/courseSchema";

export const createCourse = async(req: Request, res: Response) => {
    const detail = req.body;
    console.log(detail);
    
    const result = courseSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({message: result.error.issues[0].message});
    }

    console.log(result);

    const newCourse = result.data;
    console.log('course to create: ',newCourse);
    
    try {
        const existingCourse = await course.findOne({name: newCourse.name});

        if(existingCourse) {
            return res.status(400).json({message: "course with this title already exists"})
        }

        const new_course = await course.create(newCourse);

        return res.status(201).json({message: "new course created",new_course});
    } catch (error) {
        return res.status(400).json({message: "internal server error"});
    }
}


export const fetchAllCourse = async(req: Request, res: Response) => {
    try {
        const fetchall = await course.find();
        const numberOfCourses = await course.countDocuments()
        return res.status(200).json({fetchall,numberOfCourses});

    } catch (error) {
        return res.status(500).json({message: "internal server error"});
    }
}




