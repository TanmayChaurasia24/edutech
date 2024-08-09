import { Request, Response } from "express";
import article from "../models/articleModel";
import course from '../models/courseModel';
import { articleSchema } from "../schemas/articleSchema";

export const createArticle = async (req: Request, res: Response) => {
    const detail = req.body;
    console.log(detail);

    const result = articleSchema.safeParse(detail);

    if (!result.success) {
        return res.status(400).json({ message: result.error.issues[0].message });
    }

    console.log(result);

    const newArticle = result.data;
    console.log('Article to create: ', newArticle);

    try {
        const courseExists = await course.findOne({ title: newArticle.courseName });

        if (!courseExists) {
            return res.status(400).json({ message: "Course does not exist" });
        }

        const createdArticle = await article.create(newArticle);
        console.log('Article created: ', createdArticle);

        await course.updateOne(
            { title: newArticle.courseName },
            {
                $push: {
                    articles: {
                        title: newArticle.articleTitle,
                        content: newArticle.content,
                        image: newArticle.image,
                    }
                }
            }
        );

        res.status(201).json({ message: "Article created and added to course", article: createdArticle });
    } catch (error) {
        console.error('Error creating article: ', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
