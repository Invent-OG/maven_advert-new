"use client";
import React, { useState } from "react";

import { useCreatePortfolio } from "@/lib/queries/portfolio";
import { PortfolioLayouts } from "@/components/Portfolio";

const layouts = [
  { id: 1, name: "Layout One", preview: "/previews/layout1.jpg" },
  { id: 2, name: "Layout Two", preview: "/previews/layout2.jpg" },
  { id: 3, name: "Layout Three", preview: "/previews/layout3.jpg" },
  { id: 4, name: "Layout Four", preview: "/previews/layout4.jpg" },
  { id: 5, name: "Layout Five", preview: "/previews/layout5.jpg" },
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const createMutation = useCreatePortfolio();

  const handleSave = async () => {
    if (!selectedLayout) return alert("Select a layout first");
    if (!title || !description)
      return alert("Title and description are required");

    const finalImages = Array.from({ length: requiredImages }).map((_, index) =>
      (imagesPreview[index] || "").trim()
    );

    if (requiredImages > 0 && finalImages.some((img) => !img)) {
      return alert(
        `Please provide all ${requiredImages} image URLs required for this layout.`
      );
    }

    try {
      await createMutation.mutateAsync({
        title,
        description,
        content,
        layoutId: selectedLayout,
        images: finalImages.filter((img) => img.length > 0),
      });

      alert("Portfolio saved to database!");

      setTitle("");
      setDescription("");
      setContent("");
      setImagesPreview([]);
      setSelectedLayout(null);
    } catch (err) {
      alert("Failed to save portfolio");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Layout Manager</h1>

          <div className="bg-white p-5 rounded-lg shadow">
            <label className="block font-medium mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <label className="block font-medium mt-4 mb-2">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <label className="block font-medium mt-4 mb-2">
              Content (HTML)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded w-full"
              rows={5}
            />

            <label className="block font-medium mt-4 mb-2">
              Portfolio Image URLs
            </label>

            <div className="space-y-3">
              {Array.from({ length: requiredImages }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    value={imagesPreview[index] || ""}
                    onChange={(e) => {
                      const updated = [...imagesPreview];
                      updated[index] = e.target.value;
                      setImagesPreview(updated);
                    }}
                    placeholder={`Image ${index + 1} URL`}
                    className="border p-2 rounded w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">
              Select Portfolio Layout
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {layouts.map((layout) => (
                <div
                  key={layout.id}
                  onClick={() => setSelectedLayout(layout.id)}
                  className={`border rounded-lg p-3 cursor-pointer transition hover:shadow-lg ${
                    selectedLayout === layout.id
                      ? "border-blue-500 shadow-xl"
                      : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={layout.preview}
                    alt={layout.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <p className="text-center mt-2 font-medium">{layout.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Portfolio
            </button>
            <button
              onClick={() => {
                setTitle("");
                setDescription("");
                setContent("");
                setImagesPreview([]);
                setSelectedLayout(null);
              }}
              className="border px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </div>

        <div>
          {selectedLayout && (
            <>
              {(() => {
                const LayoutComponent = PortfolioLayouts[selectedLayout];
                return LayoutComponent ? (
                  <div className="border rounded bg-white p-4">
                    <LayoutComponent
                      title={title}
                      description={description}
                      content={content}
                      images={imagesPreview}
                    />
                  </div>
                ) : (
                  <p>No preview available</p>
                );
              })()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
