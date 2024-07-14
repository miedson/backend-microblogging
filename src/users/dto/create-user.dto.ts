import { z } from 'zod';

export const createUserSchema = z.
object({
    first_name: z.string({ message: 'must string'}),
    last_name: z.string({ message: 'must string'}),
    username: z.string({ message: 'must string'}),
    password: z.string({ message: 'must string'}).min(8, 'must min 8 caracters'),
    email: z.string().email({ message: "Invalid email address" }),
    is_active: z.coerce.boolean().optional().default(true),
}).required()
export type CreateUserDto = z.infer<typeof createUserSchema>
