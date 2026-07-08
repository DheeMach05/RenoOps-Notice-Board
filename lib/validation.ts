import { z } from "zod";

export const noticeSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must not exceed 100 characters"),

  body: z
    .string()
    .trim()
    .min(1, "Body is required")
    .max(1000, "Body must not exceed 1000 characters"),

  category: z.enum([
    "General",
    "Event",
    "Exam",
  ]),

  priority: z.enum([
    "Normal",
    "Urgent",
  ]),

  publishDate: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      {
        message: "Invalid publish date",
      }
    ),

  image: z
    .string()
    .url("Invalid image URL")
    .optional()
    .or(z.literal(""))
});