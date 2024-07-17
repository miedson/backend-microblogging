import { z } from 'zod'

export const RequestAuthUserSchema = z
.object({
    username: z.string({ message: 'must username'}),
    password: z.string({ message: 'must password'})
});

export type RequestAuthUserDto = z.infer<typeof RequestAuthUserSchema>;