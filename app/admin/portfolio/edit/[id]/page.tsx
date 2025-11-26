// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   useUpdatePortfolio,
//   useDeletePortfolio,
// } from "@/lib/queries/portfolio";
// import { Portfolio } from "@/lib/types/portfolios";

// // Utility to convert File → dataURL
// function fileToDataUrl(file: File) {
//   return new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }

// type EditPortfolioPageProps = {
//   searchParams?: {
//     id?: string;
//   };
// };

// export default function EditPortfolioPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = params.id;

//   const updateMutation = useUpdatePortfolio();
//   const deleteMutation = useDeletePortfolio();

//   const [loading, setLoading] = useState(true);
//   const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [content, setContent] = useState("");
//   const [imagesPreview, setImagesPreview] = useState<string[]>([]);
//   const [selectedLayout, setSelectedLayout] = useState<number | null>(null);

//   const [files, setFiles] = useState<File[]>([]);

//   // Predefined layouts for selection
//   const layouts = [
//     { id: 1, name: "Layout One", preview: "/previews/layout1.jpg" },
//     { id: 2, name: "Layout Two", preview: "/previews/layout2.jpg" },
//   ];

//   // Load portfolio by ID
//   useEffect(() => {
//     async function load() {
//       if (!id) return;

//       try {
//         const res = await fetch("/api/portfolio");
//         const all: Portfolio[] = await res.json();
//         const found = all.find((p) => p.id === id);

//         if (!found) {
//           console.error("Portfolio not found");
//           setLoading(false);
//           return;
//         }

//         setPortfolio(found);

//         setTitle(found.title);
//         setDescription(found.description);
//         setContent(found.content ?? "");

//         try {
//           setImagesPreview(
//             typeof found.images === "string"
//               ? JSON.parse(found.images)
//               : found.images || []
//           );
//         } catch {
//           setImagesPreview([]);
//         }

//         setSelectedLayout(Number(found.layoutId));
//       } catch (e) {
//         console.error(e);
//       }

//       setLoading(false);
//     }

//     load();
//   }, [id]);

//   // Handle new image uploads
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const list = Array.from(e.target.files ?? []) as File[];
//     setFiles(list);
//     const urls = await Promise.all(list.map((f) => fileToDataUrl(f)));
//     setImagesPreview(urls);
//   };

//   // Update portfolio
//   const handleUpdate = async () => {
//     if (!id) return alert("Invalid ID");

//     try {
//       await updateMutation.mutateAsync({
//         id,
//         title,
//         description,
//         content,
//         layoutId: selectedLayout || 1,
//         images: imagesPreview,
//       });

//       alert("Portfolio updated!");
//     } catch (e) {
//       console.error(e);
//       alert("Failed to update portfolio");
//     }
//   };

//   // Delete portfolio
//   const handleDelete = async () => {
//     if (!id) {
//       alert("Invalid ID");
//       return;
//     }
//     if (!confirm("Delete this portfolio?")) return;

//     try {
//       await deleteMutation.mutateAsync(id);
//       alert("Deleted!");
//       window.location.href = "/admin/portfolio";
//     } catch (e) {
//       alert("Failed to delete");
//     }
//   };

//   if (loading) return <div className="p-8 text-lg">Loading…</div>;

//   return (
//     <div className="p-8 space-y-8">
//       <h1 className="text-3xl font-bold">Edit Portfolio</h1>

//       {/* Title */}
//       <div>
//         <label className="block font-medium mb-2">Title</label>
//         <input
//           className="border p-2 rounded w-full"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block font-medium mb-2">Description</label>
//         <input
//           className="border p-2 rounded w-full"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>

//       {/* Content */}
//       <div>
//         <label className="block font-medium mb-2">Content (HTML)</label>
//         <textarea
//           className="border p-2 rounded w-full"
//           rows={6}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>

//       {/* Images */}
//       <div>
//         <label className="block font-medium mb-2">Upload Images</label>
//         <input type="file" multiple onChange={handleImageUpload} />

//         {imagesPreview.length > 0 && (
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             {imagesPreview.map((img, i) => (
//               <div key={i} className="h-28 rounded overflow-hidden border">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img src={img} className="w-full h-full object-cover" alt="" />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Layout Picker */}
//       <div>
//         <h2 className="text-xl font-semibold mb-3">Select Layout</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {layouts.map((layout) => (
//             <div
//               key={layout.id}
//               onClick={() => setSelectedLayout(layout.id)}
//               className={`border rounded-lg p-3 cursor-pointer hover:shadow-md transition ${
//                 selectedLayout === layout.id ? "border-blue-500 shadow-lg" : ""
//               }`}
//             >
//               {/* eslint-disable-next-line @next/next/no-img-element */}
//               <img
//                 src={layout.preview}
//                 className="w-full h-40 object-cover rounded"
//                 alt={layout.name}
//               />
//               <p className="text-center mt-2 font-medium">{layout.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-4 mt-6">
//         <button
//           onClick={handleUpdate}
//           className="bg-blue-600 text-white px-5 py-2 rounded"
//         >
//           Update
//         </button>

//         <button
//           onClick={handleDelete}
//           className="bg-red-600 text-white px-5 py-2 rounded"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useUpdatePortfolio,
  useDeletePortfolio,
} from "@/lib/queries/portfolio";
import { Portfolio } from "@/lib/types/portfolios";
import {
  ArrowLeft,
  Link as LinkIcon,
  Layout,
  Trash2,
  Save,
  Eye,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";

export default function EditPortfolioPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const router = useRouter();

  const updateMutation = useUpdatePortfolio();
  const deleteMutation = useDeletePortfolio();

  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);

  const layouts = [
    {
      id: 1,
      name: "Modern Grid",
      preview:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763022373/layout_sample_mfmpsg.png",
      imagesRequired: 6,
      description: "Clean grid layout with masonry effect",
      badge: "Popular",
    },
    {
      id: 2,
      name: "Creative Showcase",
      preview:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763026462/layout_sample_e2vxrz.png",
      imagesRequired: 5,
      description: "Minimal card-based design with hover effects",
      badge: "Modern",
    },
    {
      id: 3,
      name: "Minimal Portfolio",
      preview:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763021475/layout_sample_cetkfk.png",
      imagesRequired: 6,
      description: "Interactive showcase with parallax scrolling",
      badge: "Elegant",
    },
    {
      id: 4,
      name: "Professional Layout",
      preview:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763027868/layout_sample_wdsc7y.png",
      imagesRequired: 5,
      description: "Chronological timeline layout",
      badge: "Professional",
    },
    {
      id: 5,
      name: "Gallery Style",
      preview:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763021835/layout_sample_ubp4zv.png",
      imagesRequired: 5,
      description: "Image-focused gallery with lightbox",
      badge: "Visual",
    },
    {
      id: 6,
      name: "Right Content Image",
      preview:
        "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763022373/layout_sample_mfmpsg.png",
      imagesRequired: 6,
      description: "Dynamic asymmetric grid layout",
      badge: "Creative",
    },
  ];

  useEffect(() => {
    async function load() {
      if (!id) return;

      try {
        const res = await fetch("/api/portfolio");
        const all: Portfolio[] = await res.json();
        const found = all.find((p) => p.id === id);

        if (!found) {
          console.error("Portfolio not found");
          setLoading(false);
          return;
        }

        setPortfolio(found);
        setTitle(found.title);
        setDescription(found.description);
        setContent(found.content ?? "");

        try {
          const images =
            typeof found.images === "string"
              ? JSON.parse(found.images)
              : found.images || [];
          setImagesPreview(images);
        } catch {
          setImagesPreview([]);
        }

        setSelectedLayout(Number(found.layoutId));
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    }

    load();
  }, [id]);

  const updateImageUrl = (index: number, url: string) => {
    const updated = [...imagesPreview];
    updated[index] = url;
    setImagesPreview(updated);
  };

  const clearImageUrl = (index: number) => {
    const updated = [...imagesPreview];
    updated[index] = "";
    setImagesPreview(updated);
  };

  const handleUpdate = async () => {
    if (!id) return alert("Invalid ID");

    if (!title.trim() || !description.trim()) {
      return alert("Title and description are required");
    }

    const requiredImages = selectedLayout
      ? layouts.find((l) => l.id === selectedLayout)?.imagesRequired || 0
      : 0;
    const validImages = imagesPreview.filter((url) => url.trim().length > 0);

    if (validImages.length < requiredImages) {
      return alert(
        `This layout requires ${requiredImages} images. Please provide all image URLs.`
      );
    }

    try {
      await updateMutation.mutateAsync({
        id,
        title,
        description,
        content,
        layoutId: selectedLayout || 1,
        images: imagesPreview.filter((url) => url.trim().length > 0),
      });

      alert("Portfolio updated successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to update portfolio");
    }
  };

  const handleDelete = async () => {
    if (!id) {
      alert("Invalid ID");
      return;
    }
    if (
      !confirm(
        "Are you sure you want to delete this portfolio? This action cannot be undone."
      )
    )
      return;

    try {
      await deleteMutation.mutateAsync(id);
      alert("Portfolio deleted successfully!");
      window.location.href = "/admin/portfolio";
    } catch (e) {
      alert("Failed to delete portfolio");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );

  const requiredImages = selectedLayout
    ? layouts.find((l) => l.id === selectedLayout)?.imagesRequired || 0
    : 0;
  const currentValidImages = imagesPreview.filter(
    (url) => url.trim().length > 0
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/portfolio")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-all duration-200 hover:translate-x-1"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Portfolio
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Edit Portfolio
              </h1>
              <p className="text-gray-600 mt-2">
                Update and refine your portfolio presentation
              </p>
            </div>

            {portfolio && (
              <div className="flex items-center gap-4 text-sm text-gray-500 bg-white rounded-lg p-4 border border-gray-200">
                <Calendar className="h-4 w-4" />
                <span>
                  Last updated:{" "}
                  {new Date(
                    ((portfolio as { updatedAt?: string | Date }).updatedAt ??
                      portfolio.createdAt) ?? new Date()
                  ).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content (Full width now – sidebar removed) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Basic Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter portfolio title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter portfolio description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content (HTML)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add content in HTML format"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Portfolio Images
                </h2>
                {selectedLayout && (
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
                    <ImageIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {currentValidImages}/{requiredImages} images
                    </span>
                  </div>
                )}
              </div>

              {selectedLayout ? (
                <div className="space-y-4">
                  {Array.from({ length: requiredImages }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                          Image {index + 1} *
                        </label>
                        <input
                          value={imagesPreview[index] || ""}
                          onChange={(e) =>
                            updateImageUrl(index, e.target.value)
                          }
                          placeholder="https://res.cloudinary.com/.."
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <button
                        onClick={() => clearImageUrl(index)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    Select a layout first to add images
                  </p>
                </div>
              )}

              {currentValidImages > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Image Previews
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagesPreview
                      .filter((url) => url.trim() !== "")
                      .map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img}
                            className="w-full h-32 object-cover rounded border"
                          />
                          <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {index + 1}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Layout Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Select Layout
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {layouts.map((layout) => (
                  <div
                    key={layout.id}
                    onClick={() => setSelectedLayout(layout.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      selectedLayout === layout.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={layout.preview}
                      className="w-full h-20 object-cover rounded mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 text-sm">
                        {layout.name}
                      </p>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {layout.imagesRequired} images
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {layout.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <button
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                {updateMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Portfolio
                  </>
                )}
              </button>

              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="w-full bg-red-600 text-white px-4 py-3 rounded font-medium hover:bg-red-700 flex items-center justify-center gap-2"
              >
                {deleteMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Portfolio
                  </>
                )}
              </button>

              <button
                onClick={() => router.push("/admin/portfolio")}
                className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to List
              </button>
            </div>

            {/* Quick Preview */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-2">
                Quick Preview
              </h3>
              <p className="text-green-700 text-sm mb-3">
                View your live portfolio after saving.
              </p>
              <button
                onClick={() => window.open(`/casestudies/${id}`, "_blank")}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium flex items-center justify-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View Live Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
