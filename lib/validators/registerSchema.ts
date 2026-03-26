import z from "zod";

export const registerSchema = z.object({
    name: z.string().trim().min(3),
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(6)
});

export type RegisterInput = z.infer<typeof registerSchema>;

