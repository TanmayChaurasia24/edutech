import {z} from 'zod';

export const conversationSchema = z.object({
    participants:z.array(z.string()),
    messages:z.array(z.string())
})
    
export type Conversation = z.infer<typeof conversationSchema>;