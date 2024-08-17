import mongoose, { Schema, Document } from 'mongoose';

// Interface for Article
export interface IArticle extends Document {
    courseId: mongoose.Types.ObjectId; // Reference to Course
    articleTitle: string;
    content: string;
    author: string;
    image?: string;
}

// Schema for Article
const ArticleSchema: Schema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course', // Reference to the Course model
        required: false,
    },
    articleTitle: { 
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100,
    },
    content: {
        type: String,
        required: true,
        minlength: 50,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        validate: {
            validator: (url: string) => {
                // Basic URL validation
                return /^https?:\/\/.+\..+/.test(url);
            },
            message: 'is not a valid URL!',
        },
        required: false,
    },
});

const ArticleModel = mongoose.model<IArticle>('Article', ArticleSchema);

export default ArticleModel;
