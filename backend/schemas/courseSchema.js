const {z} = require('zod')

const courseSchema = z.object({
    tittle: z.string().min(1).require,
    description: z.string().min(10).require,
    courseid: s.string().uuid(),
    videoid: z.string()
});

module.exports = courseSchema;