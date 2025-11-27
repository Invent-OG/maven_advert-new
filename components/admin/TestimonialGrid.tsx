// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Edit2, Youtube } from "lucide-react";
// import {
//   useTestimonials,
//   useDeleteTestimonial,
//   type Testimonial,
// } from "@/lib/queries/testimonials";
// import { Pagination } from "@/components/ui/pagination";
// import TestimonialForm from "./TestimonialForm";
// import { DeleteConfirmation } from "./DeleteConfirmation";
// import { toast } from "sonner";
// import { supabase } from "@/lib/supabase/client";
// import { getStoragePath } from "@/lib/utils";

// interface TestimonialGridProps {
//   searchTerm: string;
// }

// const ITEMS_PER_PAGE = 10;

// export default function TestimonialGrid({ searchTerm }: TestimonialGridProps) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editingTestimonial, setEditingTestimonial] =
//     useState<Testimonial | null>(null);

//   const { data, isLoading } = useTestimonials();
//   const deleteTestimonialMutation = useDeleteTestimonial();

//   console.log(
//     "Testimonials data:",
//     data?.testimonials.map((t) => t.imageUrl)
//   );

//   const handleDelete = async (id: string, imageUrl: string) => {
//     try {
//       if (imageUrl) {
//         const path = getStoragePath(imageUrl);
//         if (path) {
//           console.log("Removing from Supabase:", path);
//           const { error } = await supabase.storage
//             .from("testimonials")
//             .remove([path]);
//           if (error) console.error("Supabase delete error:", error);
//         }
//       }

//       await deleteTestimonialMutation.mutateAsync(id);
//       toast.success("Testimonial deleted successfully");
//     } catch {
//       toast.error("Failed to delete testimonial");
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-8">Loading testimonials...</div>;
//   }

//   const testimonials = data?.testimonials || [];

//   const filteredTestimonials = testimonials.filter(
//     (testimonial) =>
//       testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredTestimonials.length / ITEMS_PER_PAGE);
//   const paginatedTestimonials = filteredTestimonials.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   if (editingTestimonial) {
//     // Ensure imageUrl exists before passing to form
//     if (!editingTestimonial.imageUrl) {
//       toast.error("Cannot edit testimonial without image");
//       setEditingTestimonial(null);
//       return null;
//     }

//     return (
//       <TestimonialForm
//         onClose={() => setEditingTestimonial(null)}
//         initialData={{
//           ...editingTestimonial,
//           imageUrl: editingTestimonial.imageUrl,
//         }}
//       />
//     );
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {paginatedTestimonials.map((testimonial) => (
//           <Card
//             key={testimonial.id}
//             className="p-6 flex flex-col h-full justify-between"
//           >
//             <div className="flex items-center gap-4 mb-4">
//               <div className="relative h-16 w-16 rounded-full overflow-hidden">
//                 <Image
//                   src={testimonial.imageUrl!}
//                   alt={testimonial.name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div>
//                 <h3 className="font-semibold">{testimonial.name}</h3>
//                 <p className="text-sm text-muted-foreground">
//                   {testimonial.role}
//                 </p>
//               </div>
//             </div>
//             <p className="text-muted-foreground line-clamp-3 mb-4">
//               {testimonial.content}
//             </p>
//             <div className="flex justify-between items-center">
//               <div>
//                 {testimonial.youtubeUrl && (
//                   <a
//                     href={testimonial.youtubeUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-red-500 hover:text-red-600"
//                   >
//                     <Youtube className="h-5 w-5" />
//                   </a>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   className="h-10 w-10 hover:bg-accent hover:text-accent-foreground"
//                   onClick={() => setEditingTestimonial(testimonial)}
//                   type="button"
//                 >
//                   <Edit2 className="h-4 w-4" />
//                 </Button>
//                 <DeleteConfirmation
//                   onDelete={() =>
//                     handleDelete(testimonial.id, testimonial.imageUrl!)
//                   }
//                   title="Delete Testimonial"
//                   description="Are you sure you want to delete this testimonial? This action cannot be undone."
//                 />
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <div className="mt-8">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Youtube, Star, Quote } from "lucide-react";
import {
  useTestimonials,
  useDeleteTestimonial,
  type Testimonial,
} from "@/lib/queries/testimonials";
import { Pagination } from "@/components/ui/pagination";
import TestimonialForm from "./TestimonialForm";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { getStoragePath } from "@/lib/utils";

interface TestimonialGridProps {
  searchTerm: string;
}

const ITEMS_PER_PAGE = 9;

export default function TestimonialGrid({ searchTerm }: TestimonialGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  const { data, isLoading } = useTestimonials();
  const deleteTestimonialMutation = useDeleteTestimonial();

  console.log(
    "Testimonials data:",
    data?.testimonials.map((t) => t.imageUrl)
  );

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      if (imageUrl) {
        const path = getStoragePath(imageUrl);
        if (path) {
          console.log("Removing from Supabase:", path);
          const { error } = await supabase.storage
            .from("testimonials")
            .remove([path]);
          if (error) console.error("Supabase delete error:", error);
        }
      }

      await deleteTestimonialMutation.mutateAsync(id);
      toast.success("Testimonial deleted successfully");
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  const testimonials = data?.testimonials || [];

  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTestimonials.length / ITEMS_PER_PAGE);
  const paginatedTestimonials = filteredTestimonials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (editingTestimonial) {
    if (!editingTestimonial.imageUrl) {
      toast.error("Cannot edit testimonial without image");
      setEditingTestimonial(null);
      return null;
    }

    return (
      <TestimonialForm
        onClose={() => setEditingTestimonial(null)}
        initialData={{
          ...editingTestimonial,
          imageUrl: editingTestimonial.imageUrl,
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-sm">
          Showing {paginatedTestimonials.length} of{" "}
          {filteredTestimonials.length} testimonials
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedTestimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50/80 border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300"
          >
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 opacity-10">
              <Quote className="h-16 w-16 text-blue-500" />
            </div>

            <div className="p-6">
              {/* Header with Avatar and Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <div className="relative h-14 w-14 rounded-xl overflow-hidden border-2 border-white shadow-sm">
                    <Image
                      src={testimonial.imageUrl!}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Online Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg truncate">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium truncate">
                    {testimonial.role}
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed line-clamp-4 text-sm">
                  {testimonial.content}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {/* YouTube Link */}
                <div>
                  {testimonial.youtubeUrl && (
                    <a
                      href={testimonial.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
                    >
                      <Youtube className="h-4 w-4" />
                      Watch
                    </a>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingTestimonial(testimonial)}
                    className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-100"
                    type="button"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>

                  <DeleteConfirmation
                    onDelete={() =>
                      handleDelete(testimonial.id, testimonial.imageUrl!)
                    }
                    title="Delete Testimonial"
                    description="Are you sure you want to delete this testimonial? This action cannot be undone."
                  />
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {paginatedTestimonials.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Quote className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No testimonials found
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            {searchTerm
              ? "No testimonials match your search criteria."
              : "Get started by adding your first testimonial."}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}