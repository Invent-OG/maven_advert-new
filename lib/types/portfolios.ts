// import { z } from "zod";

// /* ---------------------------------
//    SECTION SCHEMA
// ---------------------------------- */
// export const SectionSchema = z.object({
//   heading: z.string().optional(),
//   text: z.string().optional(),
//   image: z.string().url("Invalid image URL").optional().or(z.literal("")), // ✅ allow empty string too
// });

// /* ---------------------------------
//    PROJECT SCHEMA
// ---------------------------------- */
// export const ProjectSchema = z.object({
//   title: z.string().min(3, "Title required"),
//   subtitle: z.string().optional(),
//   logo: z.string().url("Logo must be a valid URL"),
//   cover: z.string().url("Cover image must be a valid URL"),
//   description: z.string().min(10, "Description required"),
//   awards: z.string().optional(),
//   industry: z.string().optional(),
//   services: z.string().optional(),
//   country: z.string().optional(),
//   shareFacebook: z.string().optional(),
//   shareLinkedin: z.string().optional(),
//   sharePinterest: z.string().optional(),
//   colors: z.array(z.string()).optional(),
//   gallery: z.array(z.string().url("Invalid URL")).optional(),
//   sections: z.array(SectionSchema).optional(),
//   extraImageOne: z.string().url("Invalid image URL").optional(),
//   extraImageTwo: z.string().url("Invalid image URL").optional(),

//   // ✅ using z.coerce.number makes RHF <select> values (strings) safe
//   layer: z.coerce.number().int().min(1).max(6).default(1),
// });

// /* ---------------------------------
//    TYPES
// ---------------------------------- */
// export type Section = z.infer<typeof SectionSchema>;
// export type ProjectForm = z.infer<typeof ProjectSchema>;
