"use client";

import React, { useEffect, useState } from "react";
import {
  useUpdatePortfolio,
  useDeletePortfolio,
} from "@/lib/queries/portfolio";

// Utility to convert File → dataURL
function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function EditPortfolioPage({ searchParams }: any) {
  const id = searchParams?.id;

  const updateMutation = useUpdatePortfolio();
  const deleteMutation = useDeletePortfolio();

  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<number | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  // Predefined layouts for selection
  const layouts = [
    { id: 1, name: "Layout One", preview: "/previews/layout1.jpg" },
    { id: 2, name: "Layout Two", preview: "/previews/layout2.jpg" },
  ];

  // Load portfolio by ID
  useEffect(() => {
    async function load() {
      if (!id) return;

      try {
        const res = await fetch("/api/portfolio");
        const all = await res.json();
        const found = all.find((p: any) => p.id === id);

        if (!found) {
          console.error("Portfolio not found");
          setLoading(false);
          return;
        }

        setPortfolio(found);

        setTitle(found.title);
        setDescription(found.description);
        setContent(found.content);

        try {
          setImagesPreview(
            typeof found.images === "string"
              ? JSON.parse(found.images)
              : found.images || []
          );
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

  // Handle new image uploads
  const handleImageUpload = async (e: any) => {
    const list = Array.from(e.target.files) as File[];
    setFiles(list);
    const urls = await Promise.all(list.map((f) => fileToDataUrl(f)));
    setImagesPreview(urls);
  };

  // Update portfolio
  const handleUpdate = async () => {
    if (!id) return alert("Invalid ID");

    try {
      await updateMutation.mutateAsync({
        id,
        title,
        description,
        content,
        layoutId: selectedLayout || 1,
        images: imagesPreview,
      });

      alert("Portfolio updated!");
    } catch (e: any) {
      console.error(e);
      alert("Failed to update portfolio");
    }
  };

  // Delete portfolio
  const handleDelete = async () => {
    if (!confirm("Delete this portfolio?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      alert("Deleted!");
      window.location.href = "/admin/portfolio";
    } catch (e) {
      alert("Failed to delete");
    }
  };

  if (loading) return <div className="p-8 text-lg">Loading…</div>;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Edit Portfolio</h1>

      {/* Title */}
      <div>
        <label className="block font-medium mb-2">Title</label>
        <input
          className="border p-2 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-2">Description</label>
        <input
          className="border p-2 rounded w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Content */}
      <div>
        <label className="block font-medium mb-2">Content (HTML)</label>
        <textarea
          className="border p-2 rounded w-full"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Images */}
      <div>
        <label className="block font-medium mb-2">Upload Images</label>
        <input type="file" multiple onChange={handleImageUpload} />

        {imagesPreview.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {imagesPreview.map((img, i) => (
              <div key={i} className="h-28 rounded overflow-hidden border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} className="w-full h-full object-cover" alt="" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Layout Picker */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Select Layout</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {layouts.map((layout) => (
            <div
              key={layout.id}
              onClick={() => setSelectedLayout(layout.id)}
              className={`border rounded-lg p-3 cursor-pointer hover:shadow-md transition ${
                selectedLayout === layout.id ? "border-blue-500 shadow-lg" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={layout.preview}
                className="w-full h-40 object-cover rounded"
              />
              <p className="text-center mt-2 font-medium">{layout.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Update
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-5 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
