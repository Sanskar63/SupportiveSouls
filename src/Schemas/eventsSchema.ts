import { z } from "zod";

const ImageUrlSchema = z.object({
    url: z.string().url(),
    public_id: z.string()
});


export const EventSchema = z.object({
    description: z.string(),
    heading: z.string(),
    date: z.string(),
    banner: z.array(ImageUrlSchema),
});