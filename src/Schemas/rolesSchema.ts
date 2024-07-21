import { z } from "zod";

export const RoleSchema = z.object({
    designation: z.string(),
    description: z.string(),
})