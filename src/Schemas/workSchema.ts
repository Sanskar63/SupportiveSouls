import { z } from "zod";

const ImageUrlSchema = z.object({
    url: z.string().url(),
    public_id: z.string()
});

export const WorkSchema = z.object({
    description: z.string(),
    images: z.array(ImageUrlSchema),
    heading: z.string(),
});