import {z} from 'zod';
export const signupInput=z.object({
    username:z.string().min(5).max(10),
    password:z.string().min(5).max(10)
})
export type signupParams=z.infer<typeof signupInput>