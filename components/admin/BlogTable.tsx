// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Edit2, Trash2, Calendar, Search } from "lucide-react";
// import { Pagination } from "@/components/ui/pagination";
// import BlogForm from "./BlogForm";
// import { useBlogs, useDeleteBlog } from "@/lib/queries/blogs";
// import { toast } from "sonner";
// import { DeleteConfirmation } from "./DeleteConfirmation";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { format } from "date-fns";
// import { supabase } from "@/lib/supabase/client";
// import { getStoragePath } from "@/lib/utils";

// interface Blog {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   content: string;
//   category: string;
//   author: string;
//   readTime: string;
//   slug?: string;
//   createdAt?: string | Date;
//   heading?: string;
// }

// interface BlogTableProps {
//   searchTerm: string;
// }

// export default function BlogTable({ searchTerm }: BlogTableProps) {
//   const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
//   const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");

//   const { data, isLoading } = useBlogs(
//     currentPage,
//     itemsPerPage,
//     searchTerm,
//     selectedCategory !== "all" ? selectedCategory : undefined
//   );

//   const deleteBlogMutation = useDeleteBlog();
//   const blogs = (data?.blogs as Blog[]) || [];
//   const totalPages = data?.totalPages || 1;

//   // --- Selection handlers ---
//   const handleSelectAll = () => {
//     if (selectedBlogs.length === blogs.length) {
//       setSelectedBlogs([]);
//     } else {
//       setSelectedBlogs(
//         blogs.map((blog) => blog.id).filter((id): id is string => Boolean(id))
//       );
//     }
//   };

//   const handleSelect = (blogId: string) => {
//     setSelectedBlogs((prev) =>
//       prev.includes(blogId)
//         ? prev.filter((id) => id !== blogId)
//         : [...prev, blogId]
//     );
//   };

//   // --- Delete single ---
//   const handleDelete = async (blogId: string) => {
//     try {
//       const blog = blogs.find((b) => b.id === blogId);
//       if (blog?.imageUrl) {
//         const path = getStoragePath(blog.imageUrl);
//         if (path) {
//           const { error } = await supabase.storage
//             .from("blog-images")
//             .remove([path]);
//           if (error) console.error("Supabase delete error:", error);
//         }
//       }
//       await deleteBlogMutation.mutateAsync(blogId);
//       toast.success("Blog deleted successfully");
//     } catch (error) {
//       console.error("Delete blog error:", error);
//       toast.error("Failed to delete blog");
//     }
//   };

//   // --- Delete multiple ---
//   const handleDeleteSelected = async () => {
//     if (
//       confirm(
//         `Are you sure you want to delete ${selectedBlogs.length} blog post(s)?`
//       )
//     ) {
//       try {
//         for (const id of selectedBlogs) {
//           const blog = blogs.find((b) => b.id === id);
//           if (blog?.imageUrl) {
//             const path = getStoragePath(blog.imageUrl);
//             if (path) {
//               await supabase.storage.from("blog-images").remove([path]);
//             }
//           }
//           await deleteBlogMutation.mutateAsync(id);
//         }
//         toast.success("Selected blogs deleted successfully");
//         setSelectedBlogs([]);
//       } catch (error) {
//         console.error("Batch delete error:", error);
//         toast.error("Failed to delete some blogs");
//       }
//     }
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     setSelectedBlogs([]);
//   };

//   const handleDateReset = () => setSelectedDate(null);

//   const handleCategoryChange = (value: string) => {
//     setSelectedCategory(value);
//     setCurrentPage(1);
//   };

//   // --- Loading state ---
//   if (isLoading) {
//     return (
//       <div className="space-y-4">
//         {Array.from({ length: itemsPerPage }).map((_, idx) => (
//           <div
//             key={idx}
//             className="animate-pulse flex items-center space-x-4 p-4 border rounded"
//           >
//             <div className="h-16 w-24 bg-gray-300 rounded" />
//             <div className="flex-1 space-y-2">
//               <div className="h-4 bg-gray-300 rounded w-1/2" />
//               <div className="h-4 bg-gray-200 rounded w-1/3" />
//               <div className="h-4 bg-gray-100 rounded w-1/4" />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // --- Editing state ---
//   if (editingBlog) {
//     return (
//       <BlogForm
//         onClose={() => setEditingBlog(null)}
//         initialData={{
//           ...editingBlog,
//           slug:
//             editingBlog.slug ||
//             editingBlog.title
//               ?.toLowerCase()
//               ?.replace(/\s+/g, "-")
//               ?.replace(/[^a-z0-9-]/g, ""),
//           heading: editingBlog.heading || "",
//         }}
//       />
//     );
//   }

//   // --- Unique categories for filter ---
//   const categories = [...new Set(blogs.map((blog) => blog.category))];

//   return (
//     <div>
//       {selectedBlogs.length > 0 && (
//         <div className="mb-4">
//           <Button variant="destructive" onClick={handleDeleteSelected}>
//             <Trash2 className="h-4 w-4 mr-2" />
//             Delete Selected ({selectedBlogs.length})
//           </Button>
//         </div>
//       )}

//       {/* Filters */}
//       <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
//         <div className="relative w-64">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//           <Input
//             placeholder="Search blogs..."
//             value={searchTerm}
//             onChange={() => setCurrentPage(1)}
//             className="pl-10"
//           />
//         </div>

//         <div className="flex gap-4 items-center">
//           {/* Category Filter */}
//           <Select value={selectedCategory} onValueChange={handleCategoryChange}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Filter by category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               {categories.map((category) => (
//                 <SelectItem key={category} value={category}>
//                   {category}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {/* Date Filter */}
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button className="flex items-center gap-2">
//                 <Calendar className="h-4 w-4" />
//                 {selectedDate ? format(selectedDate, "PPP") : "Filter by date"}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0">
//               <div className="p-2 flex justify-between items-center border-b">
//                 <span className="text-sm font-medium">Select date</span>
//                 {selectedDate && (
//                   <Button variant="ghost" size="sm" onClick={handleDateReset}>
//                     Reset
//                   </Button>
//                 )}
//               </div>
//             </PopoverContent>
//           </Popover>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-md border overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>
//                 <Checkbox
//                   checked={
//                     selectedBlogs.length === blogs.length && blogs.length > 0
//                   }
//                   onCheckedChange={handleSelectAll}
//                 />
//               </TableHead>
//               <TableHead>Image</TableHead>
//               <TableHead>Title</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead>Created At</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {blogs.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-6">
//                   No blogs found.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               blogs.map((blog) => (
//                 <TableRow key={blog.id}>
//                   <TableCell>
//                     <Checkbox
//                       checked={selectedBlogs.includes(blog.id)}
//                       onCheckedChange={() => blog.id && handleSelect(blog.id)} // ✅ safe and type-correct
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <div className="relative h-16 w-24">
//                       <Image
//                         src={blog.imageUrl}
//                         alt={blog.title}
//                         fill
//                         className="object-cover rounded"
//                       />
//                     </div>
//                   </TableCell>
//                   <TableCell className="font-medium">{blog.title}</TableCell>
//                   <TableCell>{blog.category}</TableCell>
//                   <TableCell>
//                     {blog.createdAt
//                       ? new Date(blog.createdAt).toLocaleDateString()
//                       : "—"}
//                   </TableCell>
//                   <TableCell className="text-right flex justify-end gap-2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => setEditingBlog(blog)}
//                     >
//                       <Edit2 className="h-4 w-4" />
//                     </Button>
//                     <DeleteConfirmation
//                       onDelete={() => handleDelete(blog.id)}
//                       title="Delete Blog Post"
//                       description="Are you sure you want to delete this blog post? This action cannot be undone."
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-4 flex items-center justify-between">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//           <Select
//             value={itemsPerPage.toString()}
//             onValueChange={(value: string) => {
//               setItemsPerPage(Number(value));
//               setCurrentPage(1);
//             }}
//           >
//             <SelectTrigger className="w-[120px]">
//               {itemsPerPage} / page
//             </SelectTrigger>
//             <SelectContent>
//               {[5, 10, 20, 50].map((num) => (
//                 <SelectItem key={num} value={num.toString()}>
//                   {num}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       )}
//     </div>
//   );
// }
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
import {
  Edit2,
  Trash2,
  Calendar,
  Search,
  Filter,
  Eye,
  Clock,
  User,
} from "lucide-react";
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
            className="animate-pulse flex items-center space-x-4 p-6 border border-gray-200 rounded-2xl bg-white"
          >
            <div className="h-20 w-24 bg-gray-300 rounded-xl" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
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
    <div className="space-y-6">
      {/* Bulk Actions */}
      {selectedBlogs.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {selectedBlogs.length} blog
                  {selectedBlogs.length > 1 ? "s" : ""} selected
                </p>
                <p className="text-sm text-gray-600">Ready for bulk action</p>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={handleDeleteSelected}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Filters Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search blogs by title, content, or author..."
              value={searchTerm}
              onChange={() => setCurrentPage(1)}
              className="pl-12 h-12 rounded-xl border-gray-300 bg-gray-50/50 focus:bg-white transition-colors duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[180px] h-11 rounded-xl border-gray-300 bg-gray-50/50">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all" className="rounded-lg">
                  All Categories
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="rounded-lg"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="h-11 px-4 rounded-xl border-gray-300 bg-gray-50/50 hover:bg-gray-100 text-gray-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  {selectedDate ? format(selectedDate, "MMM dd") : "Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl border-gray-200 shadow-lg">
                <div className="p-3 flex justify-between items-center border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-900">
                    Select date
                  </span>
                  {selectedDate && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDateReset}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200/60 hover:bg-transparent">
              <TableHead className="w-12 py-4">
                <Checkbox
                  checked={
                    selectedBlogs.length === blogs.length && blogs.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                  className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
              </TableHead>
              <TableHead className="py-4 font-semibold text-gray-900">
                Blog Post
              </TableHead>
              <TableHead className="py-4 font-semibold text-gray-900">
                Category
              </TableHead>
              <TableHead className="py-4 font-semibold text-gray-900">
                Author
              </TableHead>
              <TableHead className="py-4 font-semibold text-gray-900">
                Date
              </TableHead>
              <TableHead className="py-4 font-semibold text-gray-900 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {blogs.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No blogs found
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    {searchTerm
                      ? "No blogs match your search criteria."
                      : "Get started by creating your first blog post."}
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow
                  key={blog.id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-150"
                >
                  <TableCell className="py-4">
                    <Checkbox
                      checked={selectedBlogs.includes(blog.id)}
                      onCheckedChange={() => blog.id && handleSelect(blog.id)}
                      className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <Image
                          src={blog.imageUrl}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {blog.readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {blog.category}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {blog.author}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-sm text-gray-600">
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingBlog(blog)}
                        className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-100"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <DeleteConfirmation
                        onDelete={() => handleDelete(blog.id)}
                        title="Delete Blog Post"
                        description="Are you sure you want to delete this blog post? This action cannot be undone."
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, blogs.length)} of{" "}
            {blogs.length} blogs
          </div>

          <div className="flex items-center gap-4">
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value: string) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[120px] h-10 rounded-xl border-gray-300">
                {itemsPerPage} / page
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {[5, 10, 20, 50].map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="rounded-lg"
                  >
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}