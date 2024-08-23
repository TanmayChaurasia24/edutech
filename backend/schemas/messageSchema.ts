import {z} from 'zod';

export const messageSchema = z.object({
    senderId:z.string(),
    recieverId:z.string(),
    message:z.string()
})

export type Message = z.infer<typeof messageSchema>;