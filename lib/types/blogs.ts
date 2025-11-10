import { z } from "zod";

export const blogSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(), // 👈 optional, will auto-generate
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  createdAt: z.date().optional(),
  heading: z.string().optional(), // 👈 optional now
  author: z.string().min(1, "Author is required"),
  readTime: z.string().min(1, "Read time is required"),
});

export const createBlogSchema = blogSchema.omit({
  id: true,
  createdAt: true,
});
