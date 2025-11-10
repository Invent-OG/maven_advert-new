"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Youtube } from "lucide-react";
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

const ITEMS_PER_PAGE = 10;

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
    return <div className="text-center py-8">Loading testimonials...</div>;
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
    // Ensure imageUrl exists before passing to form
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTestimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="p-6 flex flex-col h-full justify-between"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image
                  src={testimonial.imageUrl!}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground line-clamp-3 mb-4">
              {testimonial.content}
            </p>
            <div className="flex justify-between items-center">
              <div>
                {testimonial.youtubeUrl && (
                  <a
                    href={testimonial.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-600"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  className="h-10 w-10 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setEditingTestimonial(testimonial)}
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
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
