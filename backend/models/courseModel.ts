import mongoose, { Document, Schema } from "mongoose";
import { Url } from "url";

interface Icourse extends Document {
    name: string;
    description: string;
    articles?: {
        title: string;
        content: string;
        image?: Url;
        video?: Url;
        thumbnail?: Url;
    }[];
}

const courseSchema = new Schema<Icourse>({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        unique:true,
    },
    description: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 300,
    },
    articles: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                    minlength: 3,
                    maxlength: 100,
                },
                content: {
                    type: String,
                    required: true,
                    minlength: 20,
                },
                image: {
                    type: String, 
                    validate: {
                        validator: function (v: string) {
                            return /\.(jpg|jpeg|png|gif)$/i.test(v);
                        },
                        message: props => `${props.value} is not a valid image URL!`
                    },
                    required: false,
                },
                video: {
                    type: String, 
                    required: false,
                },
                thumbnail: {
                    type: String, 
                    required: false,
                },
            },
        ],
        required: true,
    },
});

const Course = mongoose.model<Icourse>("Course", courseSchema);

export default Course;
