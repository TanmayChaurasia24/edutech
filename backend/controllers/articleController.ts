import { Request, Response } from "express";
import mongoose from "mongoose";
import Article from "../models/articleModel";
import Course from '../models/courseModel';
import { articleSchema } from "../schemas/articleSchema";

export const createArticle = async (req: Request, res: Response) => {
    const { courseId } = req.params;  // Extract courseId from URL
  

    // console.log("Request Body:", detail);

    // Validate courseId as a MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
    }
    const result = articleSchema.safeParse(req.body);
    if (!result.success) {
        console.error("Validation Error:", result.error);
        return res.status(400).json({ message: result.error.issues});
    }

    let newArticle = result.data;
    newArticle.courseId = courseId;  
    // console.log('Article to create: ', newArticle);

    try {
        const courseExists = await Course.findById(courseId);
        if (!courseExists) {
            return res.status(400).json({ message: "Course does not exist" });
        }

        const createdArticle = await Article.create(newArticle);

        await Course.updateOne(
            { _id: courseId },
            {
                $push: {
                    articles: {
                        title: newArticle.articleTitle,
                        content: newArticle.content,
                        author: newArticle.author,
                        image: newArticle.image,
                    }
                }
            }
        );

        return res.status(201).json({ message: "Article created and added to course", article: createdArticle });
    } catch (error) {
        console.error('Error creating article: ', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
