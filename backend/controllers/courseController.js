const Course = require("../models/courseModel.js"); // Rename to match the model export
const { validateAndCreateCourse } = require('../utils/coursevalidator.js');

const createCourse = async (req, res) => {
    const details = req.body;
    console.log(details);

    // Validate course data
    const validation = validateAndCreateCourse(details);

    if (!validation.isValid) {
        return res.status(400).json({ errors: validation.errors });
    }

    try {
        // Check if a course with the same title or other unique field exists
        const existedCourse = await Course.findOne({ title: details.title });
        if (existedCourse) {
            return res.status(400).json({ message: "Course already exists" });
        }

        // Create a new course
        const newCourse = await Course.create({
            title: details.title,
            description: details.description,
            videoId: details.videoId // Assuming the correct field is `videoId`
        });

        return res.status(201).json({ message: "Course created successfully", newCourse });
    } catch (error) {
        console.error("Error in saving the course:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = createCourse;