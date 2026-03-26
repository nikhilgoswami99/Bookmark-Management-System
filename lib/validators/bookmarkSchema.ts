import z from "zod";

export const bookmarkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title is too long"),
  url: z.string().trim().url("Please enter a valid URL"),
  description: z
    .string()
    .trim()
    .max(500, "Description is too long")
    .optional()
    .default(""),
  tags: z.array(z.string().trim().min(1)).optional().default([]),
  favicon: z.string().trim().optional().default(""),
});

export type BookmarkInput = z.infer<typeof bookmarkSchema>;
