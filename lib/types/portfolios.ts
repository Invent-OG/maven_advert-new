import { z } from "zod";

// Schema for saved layout templates
export const PortfolioLayoutSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Layout name is required"),
  previewUrl: z.string().url("previewUrl must be a valid URL"),
  componentKey: z.number().min(1, "Component key is required"),
  createdAt: z
    .preprocess((arg) => (arg ? new Date(arg as string) : undefined), z.date())
    .optional(),
});
export type PortfolioLayout = z.infer<typeof PortfolioLayoutSchema>;

export type PortfolioBlockType =
  | "hero"
  | "text"
  | "image_full"
  | "image_grid"
  | "gallery"
  | "spacer"
  | "stats_grid"
  | "image_text_split"
  | "gallery_text_split"
  | "image_with_text"
  | "tabbed_content";

export interface PortfolioBlock {
  id: string;
  type: PortfolioBlockType;
  content: any; // Type depends on block type
}

// Zod schema for a block (simplified for now as "any" content, or specific objects)
export const PortfolioBlockContentSchema = z.object({
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
    "gallery_text_split",
    "image_with_text",
    "tabbed_content",
  ]),
  content: z.any(),
});

// Main portfolio schema
export const PortfolioSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  // layoutId references a PortfolioLayout id
  layoutId: z.number().min(0, "layoutId must be a valid layout number"),
  // images — array of URLs (you can change to accept file names if needed)
  images: z.array(z.string().min(1)).optional().default([]),
  websiteUrl: z.string().optional().nullable(),
  blocks: z.array(PortfolioBlockContentSchema).optional(),
  createdAt: z
    .preprocess((arg) => (arg ? new Date(arg as string) : undefined), z.date())
    .optional(),
  createdBy: z.string().uuid().optional().nullable(),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;

// Schema for create (client -> server) — id and createdAt will be set by the server
export const CreatePortfolioSchema = PortfolioSchema.omit({
  id: true,
  createdAt: true,
});
export type CreatePortfolioInput = z.infer<typeof CreatePortfolioSchema>;

// Schema for update — require id, make other fields partial
export const UpdatePortfolioSchema = z
  .object({
    id: z.string().uuid(),
  })
  .merge(PortfolioSchema.partial().omit({ id: true }));
export type UpdatePortfolioInput = z.infer<typeof UpdatePortfolioSchema>;

// Helper validators
export const ValidatePortfolio = (data: unknown) =>
  PortfolioSchema.safeParse(data);
export const ValidateCreatePortfolio = (data: unknown) =>
  CreatePortfolioSchema.safeParse(data);
export const ValidateUpdatePortfolio = (data: unknown) =>
  UpdatePortfolioSchema.safeParse(data);
