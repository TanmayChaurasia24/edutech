import {z} from 'zod'

export const articleSchema = z.object({
    courseName: z.string(),
    articleTitle: z.string().min(10).max(100),
    content: z.string().min(50),
    author: z.string(),
    image: z.string().url().optional(),
})



export type Article = z.infer<typeof articleSchema>;