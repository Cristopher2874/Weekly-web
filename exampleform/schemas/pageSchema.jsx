import { z } from "zod";

export const pageSchema = z.object({
    work: z.string().nonempty("Work place is required"),
    reasons: z.string().nonempty("message is required"),
    positions: z.enum(["Male", "Female", "Other"], "Gender is required"),
    options: z.enum(["Online", "Friends", "Marketing", "Others"], "Question required"),
    example: z.array(z.string()).optional(),
});