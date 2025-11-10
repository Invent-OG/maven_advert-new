import { z } from "zod";

export const leadSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  whatsappNumber: z
    .string()
    .min(8, "WhatsApp number is too short")
    .max(15, "WhatsApp number is too long"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  createdAt: z.date().optional(),
});

export type Lead = z.infer<typeof leadSchema>;
