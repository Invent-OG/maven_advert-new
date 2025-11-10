"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit2, Trash2, Calendar, Search } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import BlogForm from "./BlogForm";
import { useBlogs, useDeleteBlog } from "@/lib/queries/blogs";
import { toast } from "sonner";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase/client";
import { getStoragePath } from "@/lib/utils";

interface Blog {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  slug?: string;
  createdAt?: string | Date;
  heading?: string;
}

interface BlogTableProps {
  searchTerm: string;
}

export default function BlogTable({ searchTerm }: BlogTableProps) {
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data, isLoading } = useBlogs(
    currentPage,
    itemsPerPage,
    searchTerm,
    selectedCategory !== "all" ? selectedCategory : undefined
  );

  const deleteBlogMutation = useDeleteBlog();
  const blogs = (data?.blogs as Blog[]) || [];
  const totalPages = data?.totalPages || 1;

  // --- Selection handlers ---
  const handleSelectAll = () => {
    if (selectedBlogs.length === blogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(
        blogs.map((blog) => blog.id).filter((id): id is string => Boolean(id))
      );
    }
  };

  const handleSelect = (blogId: string) => {
    setSelectedBlogs((prev) =>
      prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId]
    );
  };

  // --- Delete single ---
  const handleDelete = async (blogId: string) => {
    try {
      const blog = blogs.find((b) => b.id === blogId);
      if (blog?.imageUrl) {
        const path = getStoragePath(blog.imageUrl);
        if (path) {
          const { error } = await supabase.storage
            .from("blog-images")
            .remove([path]);
          if (error) console.error("Supabase delete error:", error);
        }
      }
      await deleteBlogMutation.mutateAsync(blogId);
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Delete blog error:", error);
      toast.error("Failed to delete blog");
    }
  };

  // --- Delete multiple ---
  const handleDeleteSelected = async () => {
    if (
      confirm(
        `Are you sure you want to delete ${selectedBlogs.length} blog post(s)?`
      )
    ) {
      try {
        for (const id of selectedBlogs) {
          const blog = blogs.find((b) => b.id === id);
          if (blog?.imageUrl) {
            const path = getStoragePath(blog.imageUrl);
            if (path) {
              await supabase.storage.from("blog-images").remove([path]);
            }
          }
          await deleteBlogMutation.mutateAsync(id);
        }
        toast.success("Selected blogs deleted successfully");
        setSelectedBlogs([]);
      } catch (error) {
        console.error("Batch delete error:", error);
        toast.error("Failed to delete some blogs");
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedBlogs([]);
  };

  const handleDateReset = () => setSelectedDate(null);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  // --- Loading state ---
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: itemsPerPage }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse flex items-center space-x-4 p-4 border rounded"
          >
            <div className="h-16 w-24 bg-gray-300 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-100 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // --- Editing state ---
  if (editingBlog) {
    return (
      <BlogForm
        onClose={() => setEditingBlog(null)}
        initialData={{
          ...editingBlog,
          slug:
            editingBlog.slug ||
            editingBlog.title
              ?.toLowerCase()
              ?.replace(/\s+/g, "-")
              ?.replace(/[^a-z0-9-]/g, ""),
          heading: editingBlog.heading || "",
        }}
      />
    );
  }

  // --- Unique categories for filter ---
  const categories = [...new Set(blogs.map((blog) => blog.category))];

  return (
    <div>
      {selectedBlogs.length > 0 && (
        <div className="mb-4">
          <Button variant="destructive" onClick={handleDeleteSelected}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected ({selectedBlogs.length})
          </Button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={() => setCurrentPage(1)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4 items-center">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Date Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="p-2 flex justify-between items-center border-b">
                <span className="text-sm font-medium">Select date</span>
                {selectedDate && (
                  <Button variant="ghost" size="sm" onClick={handleDateReset}>
                    Reset
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={
                    selectedBlogs.length === blogs.length && blogs.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No blogs found.
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedBlogs.includes(blog.id)}
                      onCheckedChange={() => blog.id && handleSelect(blog.id)} // ✅ safe and type-correct
                    />
                  </TableCell>
                  <TableCell>
                    <div className="relative h-16 w-24">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.category}</TableCell>
                  <TableCell>
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingBlog(blog)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <DeleteConfirmation
                      onDelete={() => handleDelete(blog.id)}
                      title="Delete Blog Post"
                      description="Are you sure you want to delete this blog post? This action cannot be undone."
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value: string) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[120px]">
              {itemsPerPage} / page
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
