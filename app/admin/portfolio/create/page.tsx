// "use client";
// import React, { useState } from "react";

// import { useCreatePortfolio } from "@/lib/queries/portfolio";
// import { PortfolioLayouts } from "@/components/Portfolio";

// const layouts = [
//   {
//     id: 1,
//     name: "Layout One",
//     preview:
//       "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763022373/layout_sample_mfmpsg.png",
//   },
//   {
//     id: 2,
//     name: "Layout Two",
//     preview:
//       "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763026462/layout_sample_e2vxrz.png",
//   },
//   {
//     id: 3,
//     name: "Layout Three",
//     preview:
//       "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763021475/layout_sample_cetkfk.png",
//   },
//   {
//     id: 4,
//     name: "Layout Four",
//     preview:
//       "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763027868/layout_sample_wdsc7y.png",
//   },
//   {
//     id: 5,
//     name: "Layout Five",
//     preview:
//       "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763021835/layout_sample_ubp4zv.png",
//   },
// ];

// const layoutImageCounts: Record<number, number> = {
//   1: 6,
//   2: 5,
//   3: 6,
//   4: 5,
//   5: 5,
// };

// function Page() {
//   const [selectedLayout, setSelectedLayout] = useState<number | null>(null);
//   const [imagesPreview, setImagesPreview] = useState<string[]>([]);
//   const requiredImages = selectedLayout ? layoutImageCounts[selectedLayout] : 0;
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [content, setContent] = useState("");

//   const createMutation = useCreatePortfolio();

//   const handleSave = async () => {
//     if (!selectedLayout) return alert("Select a layout first");
//     if (!title || !description)
//       return alert("Title and description are required");

//     const finalImages = Array.from({ length: requiredImages }).map((_, index) =>
//       (imagesPreview[index] || "").trim()
//     );

//     if (requiredImages > 0 && finalImages.some((img) => !img)) {
//       return alert(
//         `Please provide all ${requiredImages} image URLs required for this layout.`
//       );
//     }

//     try {
//       await createMutation.mutateAsync({
//         title,
//         description,
//         content,
//         layoutId: selectedLayout,
//         images: finalImages.filter((img) => img.length > 0),
//       });

//       alert("Portfolio saved to database!");

//       setTitle("");
//       setDescription("");
//       setContent("");
//       setImagesPreview([]);
//       setSelectedLayout(null);
//     } catch (err) {
//       alert("Failed to save portfolio");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <h1 className="text-3xl font-bold">Portfolio Layout Manager</h1>

//           <div className="bg-white p-5 rounded-lg shadow">
//             <label className="block font-medium mb-2">Title</label>
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="border p-2 rounded w-full"
//             />

//             <label className="block font-medium mt-4 mb-2">Description</label>
//             <input
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="border p-2 rounded w-full"
//             />

//             <label className="block font-medium mt-4 mb-2">
//               Content (HTML)
//             </label>
//             <textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="border p-2 rounded w-full"
//               rows={5}
//             />

//             <label className="block font-medium mt-4 mb-2">
//               Portfolio Image URLs
//             </label>

//             <div className="space-y-3">
//               {Array.from({ length: requiredImages }).map((_, index) => (
//                 <div key={index} className="flex items-center gap-3">
//                   <input
//                     value={imagesPreview[index] || ""}
//                     onChange={(e) => {
//                       const updated = [...imagesPreview];
//                       updated[index] = e.target.value;
//                       setImagesPreview(updated);
//                     }}
//                     placeholder={`Image ${index + 1} URL`}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-3">
//               Select Portfolio Layout
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {layouts.map((layout) => (
//                 <div
//                   key={layout.id}
//                   onClick={() => setSelectedLayout(layout.id)}
//                   className={`border rounded-lg p-3 cursor-pointer transition hover:shadow-lg ${
//                     selectedLayout === layout.id
//                       ? "border-blue-500 shadow-xl"
//                       : ""
//                   }`}
//                 >
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={layout.preview}
//                     alt={layout.name}
//                     className="w-full h-48 object-cover rounded-md"
//                   />
//                   <p className="text-center mt-2 font-medium">{layout.name}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleSave}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Save Portfolio
//             </button>
//             <button
//               onClick={() => {
//                 setTitle("");
//                 setDescription("");
//                 setContent("");
//                 setImagesPreview([]);
//                 setSelectedLayout(null);
//               }}
//               className="border px-4 py-2 rounded"
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         <div>
//           {selectedLayout && (
//             <>
//               {(() => {
//                 const LayoutComponent = PortfolioLayouts[selectedLayout];
//                 return LayoutComponent ? (
//                   <div className="border rounded bg-white p-4">
//                     <LayoutComponent
//                       title={title}
//                       description={description}
//                       content={content}
//                       images={imagesPreview}
//                     />
//                   </div>
//                 ) : (
//                   <p>No preview available</p>
//                 );
//               })()}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;
"use client";
import React, { useState } from "react";

import { useCreatePortfolio } from "@/lib/queries/portfolio";
import { PortfolioLayouts } from "@/components/Portfolio";
import PortfolioBuilder from "@/components/admin/portfolio/PortfolioBuilder";
import BlockRenderer from "@/components/Portfolio/BlockRenderer";
import { PortfolioBlock } from "@/lib/types/portfolios";

const layouts = [
  {
    id: 1,
    name: "Layout One",
    preview:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763022373/layout_sample_mfmpsg.png",
  },
  {
    id: 2,
    name: "Layout Two",
    preview:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763026462/layout_sample_e2vxrz.png",
  },
  {
    id: 3,
    name: "Layout Three",
    preview:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763021475/layout_sample_cetkfk.png",
  },
  {
    id: 4,
    name: "Layout Four",
    preview:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763027868/layout_sample_wdsc7y.png",
  },
  {
    id: 5,
    name: "Layout Five",
    preview:
      "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763021835/layout_sample_ubp4zv.png",
  },
];

const layoutImageCounts: Record<number, number> = {
  1: 6,
  2: 5,
  3: 6,
  4: 5,
  5: 5,
};

function Page() {
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const requiredImages = selectedLayout ? layoutImageCounts[selectedLayout] : 0;
  
  // Basic Info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  // Builder Mode State
  const [isBuilderMode, setIsBuilderMode] = useState(true);
  const [blocks, setBlocks] = useState<PortfolioBlock[]>([]);

  const createMutation = useCreatePortfolio();

  const handleSave = async () => {
    // Validation
    if (!title || !description)
      return alert("Title and description are required");

    // Legacy Mode Validation
    if (!isBuilderMode) {
      if (!selectedLayout) return alert("Select a layout first");
      const finalImages = Array.from({ length: requiredImages }).map((_, index) =>
        (imagesPreview[index] || "").trim()
      );
      if (requiredImages > 0 && finalImages.some((img) => !img)) {
        return alert(
          `Please provide all ${requiredImages} image URLs required for this layout.`
        );
      }
    } else {
        // Builder Mode Validation
        if (blocks.length === 0) return alert("Please add at least one content block.");
    }

    try {
      const payload: any = {
        title,
        description,
        content: isBuilderMode ? "" : content,
        layoutId: isBuilderMode ? 0 : selectedLayout, // 0 for builder mode
        images: isBuilderMode ? [] : imagesPreview.filter((img) => img.length > 0),
        websiteUrl: websiteUrl.trim() || null,
        blocks: isBuilderMode ? blocks : [],
      };

      await createMutation.mutateAsync(payload);

      alert("Portfolio saved to database!");

      setTitle("");
      setDescription("");
      setContent("");
      setWebsiteUrl("");
      setImagesPreview([]);
      setBlocks([]);
      setSelectedLayout(null);
    } catch (err) {
      alert("Failed to save portfolio");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column - Form and Controls */}
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center xl:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio Layout Manager
              </h1>
              <p className="text-gray-600 text-lg">
                Create and customize your portfolio layouts
              </p>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                Portfolio Content
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter your portfolio title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="Enter portfolio description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Website URL
                    <span className="text-gray-400 font-normal ml-2">(Optional)</span>
                  </label>
                  <input
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Content (HTML)
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none resize-vertical min-h-[120px]"
                    placeholder="Add your HTML content here..."
                    rows={5}
                  />
                </div>

                {selectedLayout && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Portfolio Image URLs
                      <span className="ml-2 text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {requiredImages} images required
                      </span>
                    </label>
                    <div className="space-y-3">
                      {Array.from({ length: requiredImages }).map(
                        (_, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 group"
                          >
                            <div className="flex-1 relative">
                              <input
                                value={imagesPreview[index] || ""}
                                onChange={(e) => {
                                  const updated = [...imagesPreview];
                                  updated[index] = e.target.value;
                                  setImagesPreview(updated);
                                }}
                                placeholder={`https://example.com/image-${
                                  index + 1
                                }.jpg`}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none font-mono text-sm"
                              />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                  {index + 1}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>



            {/* Mode Toggle */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                 <div className="flex items-center gap-4 mb-6">
                    <button 
                         onClick={() => setIsBuilderMode(true)}
                         className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${isBuilderMode ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                         Page Builder (New)
                    </button>
                    <button 
                         onClick={() => setIsBuilderMode(false)}
                         className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${!isBuilderMode ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                         Legacy Layouts
                    </button>
                 </div>

                 {isBuilderMode ? (
                     <PortfolioBuilder blocks={blocks} onChange={setBlocks} />
                 ) : (
                    <>
                        {/* Legacy Layout Selection Content */}
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                            Select Portfolio Layout
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {layouts.map((layout) => (
                            <div
                                key={layout.id}
                                onClick={() => setSelectedLayout(layout.id)}
                                className={`group cursor-pointer rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                                selectedLayout === layout.id
                                    ? "border-blue-500 shadow-lg scale-105 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                                }`}
                            >
                                <div className="aspect-video overflow-hidden rounded-t-xl">
                                <img
                                    src={layout.preview}
                                    alt={layout.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                </div>
                                <div className="p-4 text-center">
                                <p
                                    className={`font-semibold transition-colors duration-200 ${
                                    selectedLayout === layout.id
                                        ? "text-blue-600"
                                        : "text-gray-800 group-hover:text-blue-600"
                                    }`}
                                >
                                    {layout.name}
                                </p>
                                <div className="flex items-center justify-center mt-2">
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    {layoutImageCounts[layout.id]} images
                                    </span>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </>
                 )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <button
                onClick={handleSave}
                disabled={createMutation.isPending}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {createMutation.isPending ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving Portfolio...
                  </span>
                ) : (
                  "Save Portfolio"
                )}
              </button>

              <button
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setContent("");
                  setWebsiteUrl("");
                  setImagesPreview([]);
                  setBlocks([]);
                  setSelectedLayout(null);
                }}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 transform hover:scale-105"
              >
                Reset All
              </button>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="xl:sticky xl:top-4 h-fit">
            <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 ${!isBuilderMode ? 'p-6' : 'p-2'}`}>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200 px-4 pt-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Live Preview
                </h2>
                {isBuilderMode ? (
                     <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        Page Builder
                     </span>
                ) : (
                    selectedLayout && (
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Active Layout
                    </span>
                    )
                )}
              </div>

              {isBuilderMode ? (
                  <div className="min-h-[600px] border-2 border-dashed border-gray-200 rounded-xl bg-white overflow-hidden">
                      {blocks.length > 0 ? (
                           <BlockRenderer blocks={blocks} />
                      ) : (
                          <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                               <p>Start adding blocks to see preview</p>
                          </div>
                      )}
                  </div>
              ) : (
                  // Legacy Preview Logic
                  selectedLayout ? (
                    <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <p className="text-sm text-blue-700 font-medium">
                        Previewing:{" "}
                        <span className="font-bold">
                            {layouts.find((l) => l.id === selectedLayout)?.name}
                        </span>
                        </p>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden bg-gray-50 min-h-[600px] flex items-center justify-center">
                        {(() => {
                        const LayoutComponent = PortfolioLayouts[selectedLayout];
                        return LayoutComponent ? (
                            <div className="w-full transform scale-90 origin-top">
                            <LayoutComponent
                                title={title || "Your Portfolio Title"}
                                description={
                                description ||
                                "Your portfolio description will appear here"
                                }
                                content={
                                content ||
                                "<p>Add your detailed content here...</p>"
                                }
                                images={
                                imagesPreview.length > 0
                                    ? imagesPreview
                                    : Array.from({ length: requiredImages }).map(
                                        (_, i) =>
                                        `https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Image+${
                                            i + 1
                                        }`
                                    )
                                }
                            />
                            </div>
                        ) : (
                            <div className="text-center p-8">
                                <p className="text-gray-500">
                                    Layout component not found
                                </p>
                            </div>
                        );
                        })()}
                    </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">
                    No Layout Selected
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Choose a layout or switch to Page Builder mode.
                  </p>
                </div>
              )
            )}
            </div>
          </div>
          </div>
        </div>
    </div>
  );
}

export default Page;
