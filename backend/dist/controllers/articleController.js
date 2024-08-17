"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticle = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const articleModel_1 = __importDefault(require("../models/articleModel"));
const courseModel_1 = __importDefault(require("../models/courseModel"));
const articleSchema_1 = require("../schemas/articleSchema");
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params; // Extract courseId from URL
    const detail = req.body;
    // console.log("Request Body:", detail);
    // Validate courseId as a MongoDB ObjectId
    if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({ message: "Invalid course ID" });
    }
    const result = articleSchema_1.articleSchema.safeParse(detail);
    if (!result.success) {
        console.error("Validation Error:", result.error);
        return res.status(400).json({ message: result.error.issues });
    }
    const newArticle = result.data;
    newArticle.courseId = courseId;
    // console.log('Article to create: ', newArticle);
    try {
        const courseExists = yield courseModel_1.default.findById(courseId);
        if (!courseExists) {
            return res.status(400).json({ message: "Course does not exist" });
        }
        const createdArticle = yield articleModel_1.default.create(newArticle);
        yield courseModel_1.default.updateOne({ _id: courseId }, {
            $push: {
                articles: {
                    title: newArticle.articleTitle,
                    content: newArticle.content,
                    image: newArticle.image,
                }
            }
        });
        return res.status(201).json({ message: "Article created and added to course", article: createdArticle });
    }
    catch (error) {
        console.error('Error creating article: ', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createArticle = createArticle;
