import { z } from 'zod';

export const courseSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(50).max(300),
    articles: z.array(
        z.object({
            title: z.string().min(3).max(100),
            content: z.string().min(20),
            image: z.string().url().optional()
        })
    ).optional(),
    video: z.string().url().optional(),
    thumbnail: z.string().url().optional()
});

export type Course = z.infer<typeof courseSchema>;