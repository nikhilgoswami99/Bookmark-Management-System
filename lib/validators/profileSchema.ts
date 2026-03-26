import z from "zod";

export const profileUpdateSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .optional(),
  profilePic: z.string()
    .trim()
    .url("Please provide a valid image URL")
    .optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "Please provide at least one field to update",
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
