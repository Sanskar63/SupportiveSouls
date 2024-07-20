import { z } from "zod";

export const WorkSchema = z.object({
    description: z.string(),
    images: z.instanceof(File),
    date: z.date()
});