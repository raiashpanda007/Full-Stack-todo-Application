import { z } from 'zod'

export const signInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type SignUpParams = z.infer<typeof signInput>;