import { z } from "zod";

export const WorkSchema = z.object({
    description: z.string(),
    images: z.string().array(),
    heading: z.string(),
});