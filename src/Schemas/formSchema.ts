import { z } from "zod";

export const FormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    contact: z.number(),
    role: z.string(),
    hours: z.number(),
    about: z.string(),
    image: z.string(),
    aadhar: z.number(),
})