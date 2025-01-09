import { z } from "zod";

export const ShadSchema = z.object({
    name: z.string().nonempty("Name is required"),
    "e-mail": z.string().email("Invalid e-mail").nonempty("Required e-mail"),
    "phone number": z.string().optional(),
    message: z.string().nonempty("message is required"),
    gender: z.enum(["Male", "Female", "Other"], "Gender is required"),
    "how did you hear about us?": z.enum(["Online", "Friends", "Marketing", "Others"], "Question required"),
    interests: z.array(z.string()).optional(),
});