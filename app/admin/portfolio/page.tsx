// "use client";

// import React from "react";
// import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { ProjectSchema, ProjectForm } from "@/lib/types/portfolios";

// export default function ProjectFormModel() {
//   // ✅ useForm setup with zodResolver and default values
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm<ProjectForm>({
//     resolver: zodResolver(ProjectSchema),
//     defaultValues: {
//       colors: ["#000000", "#ffffff", "#333333"],
//       gallery: [],
//       sections: [{ heading: "", text: "", image: "" }],
//       layer: 1, // ✅ required to sync with Zod .default(1)
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "sections",
//   });

//   // ✅ Type-safe onSubmit handler
//   const onSubmit: SubmitHandler<ProjectForm> = (data) => {
//     console.log("✅ Project data submitted:", data);
//     // 🔥 Replace this with Supabase or API insert
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 space-y-8 shadow-sm"
//     >
//       <h2 className="text-2xl font-bold text-gray-900">Create Project</h2>

//       {/* ================================
//           BASIC INFO
//       ================================= */}
//       <div className="grid sm:grid-cols-2 gap-6">
//         <div>
//           <Label htmlFor="logo" className="text-sm text-gray-700">
//             Logo URL
//           </Label>
//           <Input
//             id="logo"
//             type="url"
//             placeholder="https://example.com/logo.png"
//             {...register("logo")}
//             className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//           />
//           {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
//         </div>

//         <div>
//           <Label htmlFor="cover" className="text-sm text-gray-700">
//             Cover Image URL
//           </Label>
//           <Input
//             id="cover"
//             type="url"
//             placeholder="https://example.com/cover.jpg"
//             {...register("cover")}
//             className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//           />
//           {errors.cover && (
//             <p className="text-red-500">{errors.cover.message}</p>
//           )}
//         </div>
//       </div>

//       {/* ================================
//           TITLE & SUBTITLE
//       ================================= */}
//       <div className="grid sm:grid-cols-2 gap-6">
//         <div>
//           <Label htmlFor="title" className="text-sm text-gray-700">
//             Project Title
//           </Label>
//           <Input
//             id="title"
//             placeholder="Renova Bottle"
//             {...register("title")}
//             className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//           />
//           {errors.title && (
//             <p className="text-red-500">{errors.title.message}</p>
//           )}
//         </div>

//         <div>
//           <Label htmlFor="subtitle" className="text-sm text-gray-700">
//             Subtitle / Tagline
//           </Label>
//           <Input
//             id="subtitle"
//             placeholder="The smart bottle features technology keeps connected"
//             {...register("subtitle")}
//             className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//           />
//         </div>
//       </div>

//       {/* ================================
//           DESCRIPTION
//       ================================= */}
//       <div>
//         <Label htmlFor="description" className="text-sm text-gray-700">
//           Description
//         </Label>
//         <Textarea
//           id="description"
//           rows={3}
//           placeholder="Brief description of the project"
//           {...register("description")}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//       </div>

//       {/* ================================
//           PROJECT DETAILS
//       ================================= */}
//       <div className="w-full h-px bg-gray-200 my-6" />
//       <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
//       <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
//         <Input
//           placeholder="Awards"
//           {...register("awards")}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//         <Input
//           placeholder="Industry"
//           {...register("industry")}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//         <Input
//           placeholder="Services"
//           {...register("services")}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//         <Input
//           placeholder="Country"
//           {...register("country")}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//       </div>

//       {/* ================================
//           LAYER SELECT (1–6)
//       ================================= */}
//       <div className="w-full h-px bg-gray-200 my-6" />
//       <div>
//         <Label htmlFor="layer" className="text-sm text-gray-700">
//           Layer (1–6)
//         </Label>
//         <select
//           id="layer"
//           {...register("layer", { valueAsNumber: true })}
//           className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
//         >
//           {[1, 2, 3, 4, 5, 6].map((num) => (
//             <option key={num} value={num}>
//               Layer {num}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* ================================
//           GALLERY
//       ================================= */}
//       <div className="w-full h-px bg-gray-200 my-6" />
//       <div>
//         <Label className="text-sm text-gray-700">Gallery Image URLs</Label>
//         <Textarea
//           rows={2}
//           placeholder="https://image1.jpg, https://image2.jpg"
//           {...register("gallery", {
//             setValueAs: (v: unknown) => {
//               if (typeof v === "string") {
//                 return v
//                   .split(",")
//                   .map((s) => s.trim())
//                   .filter(Boolean);
//               }
//               if (Array.isArray(v)) return v;
//               return [];
//             },
//           })}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//       </div>

//       {/* ================================
//           SECTIONS
//       ================================= */}
//       <div className="w-full h-px bg-gray-200 my-6" />
//       <h3 className="text-lg font-semibold text-gray-900">Content Sections</h3>
//       <p className="text-sm text-gray-500 mb-3">
//         Add multiple content sections (heading, text, and image)
//       </p>

//       {fields.map((field, index) => (
//         <div
//           key={field.id}
//           className="p-4 mb-4 border border-gray-200 rounded-xl space-y-4 bg-gray-50"
//         >
//           <div className="flex justify-between items-center">
//             <h4 className="font-semibold text-gray-700">Section {index + 1}</h4>
//             <Button
//               type="button"
//               variant="destructive"
//               onClick={() => remove(index)}
//             >
//               Remove
//             </Button>
//           </div>

//           <Input
//             placeholder="Heading"
//             {...register(`sections.${index}.heading` as const)}
//             className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//           />
//           <Textarea
//             rows={3}
//             placeholder="Write section description..."
//             {...register(`sections.${index}.text` as const)}
//             className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//           />
//           <Input
//             type="url"
//             placeholder="https://example.com/image.jpg"
//             {...register(`sections.${index}.image` as const)}
//             className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//           />
//         </div>
//       ))}

//       <Button
//         type="button"
//         variant="secondary"
//         onClick={() => append({ heading: "", text: "", image: "" })}
//       >
//         + Add Section
//       </Button>

//       {/* ================================
//           EXTRA IMAGES
//       ================================= */}
//       <div className="w-full h-px bg-gray-200 my-6" />
//       <h3 className="text-lg font-semibold text-gray-900">Additional Images</h3>
//       <div className="grid sm:grid-cols-2 gap-6">
//         <Input
//           type="url"
//           placeholder="Extra Image One URL"
//           {...register("extraImageOne")}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//         <Input
//           type="url"
//           placeholder="Extra Image Two URL"
//           {...register("extraImageTwo")}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//       </div>

//       {/* ================================
//           SOCIAL LINKS
//       ================================= */}
//       <div className="w-full h-px bg-gray-200 my-6" />
//       <h3 className="text-lg font-semibold text-gray-900">
//         Social Share Links
//       </h3>
//       <div className="grid sm:grid-cols-3 gap-4">
//         <Input
//           placeholder="Facebook URL"
//           {...register("shareFacebook")}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//         <Input
//           placeholder="LinkedIn URL"
//           {...register("shareLinkedin")}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//         <Input
//           placeholder="Pinterest URL"
//           {...register("sharePinterest")}
//           className="border border-gray-300 focus:ring-2 focus:ring-gray-400"
//         />
//       </div>

//       {/* ================================
//           SUBMIT
//       ================================= */}
//       <Button
//         type="submit"
//         className="w-full mt-6 bg-gray-800 hover:bg-gray-700 text-white"
//       >
//         Save Project
//       </Button>
//     </form>
//   );
// }
import React from "react";

function page() {
  return <div>page</div>;
}

export default page;
