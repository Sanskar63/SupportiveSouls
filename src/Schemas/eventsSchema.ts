import { z } from "zod";

export const EventSchema = z.object({
    description: z.string(),
    banner: z.string(),
    heading: z.string(),
    date: z.string()
});