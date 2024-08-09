import mongoose, { Schema, Document } from 'mongoose';

// Define the Article interface
export interface IArticle extends Document {
    courseName: string;
    articleTitle: string;
    content: string;
    author: string;
    image?: string;
}

// Create the Article schema
const ArticleSchema: Schema = new Schema({
    courseName: {
        type: String,
        required: true,
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
            message:`is not a valid URL!`
        },
        required: false,
    },
});

// Create the Article model
const ArticleModel = mongoose.model<IArticle>('Article', ArticleSchema);

export default ArticleModel;
