const courseSchema = require('../schemas/courseSchema.js');

const validateAndCreateCourse = (courseData) => {
    try {
        // Validate course data with Zod schema
        courseSchema.parse(courseData);
        return { isValid: true, errors: [] }; // Validation successful
    } catch (error) {
        // Return validation errors
        return { isValid: false, errors: error.errors || ['Validation error'] };
    }
};

module.exports = { validateAndCreateCourse };