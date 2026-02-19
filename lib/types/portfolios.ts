import { z } from "zod";

export type PortfolioBlockType =
  | "hero"
  | "text"
  | "image_full"
  | "image_grid"
  | "gallery"
  | "spacer"
  | "stats_grid"
  | "image_text_split"
  | "image_with_text"
  | "video"
  | "testimonials"
  | "features"
  | "cta"
  | "gallery_text_split"
  | "bento_grid";

export interface PortfolioBlock {
  id: string;
  type: PortfolioBlockType;
  content: any;
}

export const PortfolioBlockSchema = z.object({
  id: z.string(),
  type: z.enum([
    "hero",
    "text",
    "image_full",
    "image_grid",
    "gallery",
    "spacer",
    "stats_grid",
    "image_text_split",
    "image_with_text",
    "video",
    "testimonials",
    "features",
    "cta",
    "gallery_text_split",
    "bento_grid",
  ]),
  content: z.any(),
});

export const PortfolioSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string().nullable().optional(),
  layoutId: z.number(),
  images: z.array(z.string()),
  websiteUrl: z.string().nullable().optional(),
  blocks: z.array(PortfolioBlockSchema).nullable().optional(),
  createdAt: z.union([z.string(), z.date()]),
  createdBy: z.string().nullable().optional(),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;

export const CreatePortfolioSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  layoutId: z.number(),
  images: z.array(z.string()).optional(),
  websiteUrl: z.string().optional(),
  blocks: z.array(PortfolioBlockSchema).optional(),
});

export type CreatePortfolioInput = z.infer<typeof CreatePortfolioSchema>;

export const UpdatePortfolioSchema = CreatePortfolioSchema.partial().extend({
  id: z.string(),
});

export type UpdatePortfolioInput = z.infer<typeof UpdatePortfolioSchema>;
