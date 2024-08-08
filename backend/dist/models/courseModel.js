"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const courseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        unique: true,
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
                        validator: function (v) {
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
const Course = mongoose_1.default.model("Course", courseSchema);
exports.default = Course;
