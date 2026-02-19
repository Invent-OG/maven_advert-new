"use client";

import React, { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import {
  GripVertical,
  Trash2,
  Image as ImageIcon,
  Type,
  LayoutGrid,
  Maximize,
  MoveVertical,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Columns,
  SplitSquareVertical,
  LayoutTemplate,
  List,
  BookOpen,
  Video,
  MessageSquare,
  Megaphone,
  ListChecks,
} from "lucide-react";
import { PortfolioBlock, PortfolioBlockType } from "@/lib/types/portfolios";
import { v4 as uuidv4 } from "uuid";
import { GradientPicker } from "./GradientPicker";

// Re-defining the types locally or importing from types file if strict
// We will use the generic structure
// id: string; type: ...; content: any

type Props = {
  blocks: PortfolioBlock[];
  onChange: (blocks: PortfolioBlock[]) => void;
};

export default function PortfolioBuilder({ blocks, onChange }: Props) {
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const addBlock = (type: PortfolioBlockType) => {
    const newBlock: PortfolioBlock = {
      id: uuidv4(),
      type,
      content: getInitialContent(type),
    };
    onChange([...blocks, newBlock]);
    setActiveBlockId(newBlock.id);
  };

  const updateBlock = (id: string, content: any) => {
    const newBlocks = blocks.map((b) =>
      b.id === id ? { ...b, content: { ...b.content, ...content } } : b,
    );
    onChange(newBlocks);
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter((b) => b.id !== id));
    if (activeBlockId === id) setActiveBlockId(null);
  };

  const getIcon = (type: PortfolioBlockType) => {
    switch (type) {
      case "hero":
        return <Maximize className="w-5 h-5" />;
      case "text":
        return <Type className="w-5 h-5" />;
      case "image_full":
        return <ImageIcon className="w-5 h-5" />;
      case "image_grid":
        return <LayoutGrid className="w-5 h-5" />;
      case "gallery":
        return <LayoutGrid className="w-5 h-5" />;
      case "spacer":
        return <MoveVertical className="w-5 h-5" />;
      case "stats_grid":
        return <Columns className="w-5 h-5" />;
      case "image_text_split":
        return <SplitSquareVertical className="w-5 h-5" />;
      case "gallery_text_split":
        return <LayoutTemplate className="w-5 h-5" />;
      case "image_with_text":
        return <BookOpen className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "testimonials":
        return <MessageSquare className="w-5 h-5" />;
      case "cta":
        return <Megaphone className="w-5 h-5" />;
      case "features":
        return <ListChecks className="w-5 h-5" />;
      case "bento_grid":
        return <LayoutTemplate className="w-5 h-5" />;
      default:
        return <Type className="w-5 h-5" />;
    }
  };

  const getLabel = (type: PortfolioBlockType) => {
    switch (type) {
      case "hero":
        return "Hero Section";
      case "text":
        return "Text Block";
      case "image_full":
        return "Full Image";
      case "image_grid":
        return "Image Grid";
      case "gallery":
        return "Smart Gallery";
      case "spacer":
        return "Spacer";
      case "stats_grid":
        return "Stats Grid";
      case "image_text_split":
        return "Featured Split";
      case "gallery_text_split":
        return "Gallery Split";
      case "image_with_text":
        return "Image & Text";
      case "video":
        return "Video";
      case "testimonials":
        return "Testimonials";
      case "cta":
        return "Call to Action";
      case "features":
        return "Features";
      case "bento_grid":
        return "Bento Grid";
      default:
        return "Block";
    }
  };

  const getInitialContent = (type: PortfolioBlockType) => {
    switch (type) {
      case "hero":
        return {
          title: "New Hero Title",
          subtitle: "Subtitle here",
          image: "",
        };
      case "text":
        return { html: "<p>Start typing your content here...</p>" };
      case "image_full":
        return { image: "", caption: "" };
      case "image_grid":
        return { images: ["", "", ""] };
      case "gallery":
        return { images: ["", "", "", "", ""] };
      case "spacer":
        return { height: 50 };
      case "stats_grid":
        return {
          items: [
            { label: "Clients", value: "200+" },
            { label: "Projects", value: "540" },
            { label: "Awards", value: "12" },
            { label: "Experience", value: "10 Yrs" },
          ],
        };
      case "image_text_split":
        return {
          title: "LOREM IPSUM",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
          image: "",
          points: [
            {
              title: "Point One",
              description: "Detailed description for point one.",
            },
            {
              title: "Point Two",
              description: "Detailed description for point two.",
            },
            {
              title: "Point Three",
              description: "Detailed description for point three.",
            },
          ],
        };
      case "gallery_text_split":
        return {
          title: "Gallery Feature",
          description:
            " showcases your work in a grid layout alongside descriptive text.",
          images: ["", "", "", ""],
          points: [
            "Feature point one",
            "Feature point two",
            "Feature point three",
          ],
          reverse: false,
        };
      case "image_with_text":
        return {
          image: "",
          label: "FEATURE",
          title: "Your Title Here",
          description: "Write your description here.",
          reverse: false,
        };
      case "video":
        return { url: "" };
      case "testimonials":
        return {
          title: "Client Testimonials",
          items: [
            {
              text: "This service changed my business completely. Highly recommended!",
              author: "Jane Doe",
              role: "CEO, TechCorp",
            },
            {
              text: "Amazing attention to detail and great design skills.",
              author: "John Smith",
              role: "Director, Studio X",
            },
          ],
        };
      case "cta":
        return {
          title: "Ready to Start?",
          subtitle: "Get in touch today and let's build something amazing.",
          buttonText: "Contact Us",
          buttonLink: "#contact",
        };
      case "features":
        return {
          title: "Our Features",
          subtitle: "Everything you need to succeed.",
          items: [
            {
              title: "Fast",
              description: "Optimized for speed and performance.",
              icon: "⚡",
            },
            {
              title: "Secure",
              description: "Bank-grade security standards.",
              icon: "🔒",
            },
            {
              title: "Scalable",
              description: "Grows with your business needs.",
              icon: "📈",
            },
          ],
        };
      default:
        return {};
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* TOOLBAR */}
      <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
        {(
          [
            "hero",
            "text",
            "image_full",
            "image_grid",
            "gallery",
            "spacer",
            "stats_grid",
            "image_text_split",
            "gallery_text_split",
            "image_with_text",
            "testimonials",
            "features",
            "cta",
            "video",
            "bento_grid",
          ] as PortfolioBlockType[]
        ).map((type) => (
          <button
            key={type}
            onClick={() => addBlock(type)}
            className="flex flex-col items-center justify-center p-2 gap-1.5 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition border border-transparent hover:border-blue-100"
          >
            {getIcon(type)}
            <span className="text-[10px] font-medium uppercase tracking-wide">
              {getLabel(type)}
            </span>
          </button>
        ))}
      </div>

      {/* BLOCKS LIST (Drag & Drop) */}
      <div className="space-y-4">
        <Reorder.Group
          axis="y"
          values={blocks}
          onReorder={onChange}
          className="flex flex-col gap-4"
        >
          {blocks.map((block) => (
            <Reorder.Item key={block.id} value={block}>
              <div
                className={`bg-white rounded-xl border transition-all ${
                  activeBlockId === block.id
                    ? "border-blue-500 shadow-md ring-2 ring-blue-50"
                    : "border-gray-200 shadow-sm hover:border-blue-300"
                }`}
              >
                {/* Header / Drag Handle */}
                <div className="flex items-center justify-between p-3 border-b bg-gray-50/50 rounded-t-xl group">
                  <div className="flex items-center gap-3">
                    <div className="cursor-grab active:cursor-grabbing p-1 text-gray-400 group-hover:text-gray-600 transition-colors">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                      {getIcon(block.type)}
                      <span>{getLabel(block.type)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setActiveBlockId(
                          activeBlockId === block.id ? null : block.id,
                        )
                      }
                      className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500 transition-colors"
                      title={activeBlockId === block.id ? "Collapse" : "Edit"}
                    >
                      {activeBlockId === block.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-md transition-colors"
                      title="Remove Block"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Editor Body */}
                {activeBlockId === block.id && (
                  <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <BlockEditor
                      block={block}
                      onChange={(content) => updateBlock(block.id, content)}
                    />
                  </div>
                )}
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {blocks.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <p className="text-gray-500 font-medium">No blocks added yet.</p>
            <p className="text-gray-400 text-sm mt-1">
              Select a block type from above to start building.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function BlockEditor({
  block,
  onChange,
}: {
  block: PortfolioBlock;
  onChange: (content: any) => void;
}) {
  switch (block.type) {
    case "hero":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              value={block.content.title || ""}
              onChange={(e) => onChange({ title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Subtitle
            </label>
            <input
              value={block.content.subtitle || ""}
              onChange={(e) => onChange({ subtitle: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Background Image URL
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  value={block.content.image || ""}
                  onChange={(e) => onChange({ image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 pl-9 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
                <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "text":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              HTML Content
            </label>
            <textarea
              value={block.content.html || ""}
              onChange={(e) => onChange({ html: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all min-h-[150px] font-mono leading-relaxed"
            />
            <p className="text-[10px] text-gray-400 mt-1.5 flex items-center gap-1">
              <Type className="w-3 h-3" />
              Supports Basic HTML tags
            </p>
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "image_full":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Image URL
            </label>
            <div className="relative">
              <input
                value={block.content.image || ""}
                onChange={(e) => onChange({ image: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 pl-9 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
              <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Caption (Optional)
            </label>
            <input
              value={block.content.caption || ""}
              onChange={(e) => onChange({ caption: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "image_grid":
    case "gallery":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Image URLs
            </label>
            <div className="space-y-2">
              {(block.content.images || []).map((img: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      value={img}
                      onChange={(e) => {
                        const newImages = [...(block.content.images || [])];
                        newImages[idx] = e.target.value;
                        onChange({ images: newImages });
                      }}
                      placeholder={`Image URL ${idx + 1}`}
                      className="w-full px-3 py-2 pl-9 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                    <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                  <button
                    onClick={() => {
                      const newImages = (block.content.images || []).filter(
                        (_: any, i: number) => i !== idx,
                      );
                      onChange({ images: newImages });
                    }}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                onChange({ images: [...(block.content.images || []), ""] })
              }
              className="mt-3 w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 font-medium hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Image
            </button>
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "bento_grid":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Bento Grid Images
            </label>
            <p className="text-xs text-gray-400 mb-3">
              Order: 1. Large Top, 2. Small Left, 3. Small Right
            </p>
            <div className="space-y-2">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-6 top-2 text-xs font-mono text-gray-400">
                    {idx + 1}.
                  </span>
                  <input
                    value={block.content.images?.[idx] || ""}
                    onChange={(e) => {
                      const newImages = [
                        ...(block.content.images || ["", "", ""]),
                      ];
                      newImages[idx] = e.target.value;
                      onChange({ images: newImages });
                    }}
                    placeholder={`Image URL ${idx === 0 ? "(Large)" : "(Small)"}`}
                    className="w-full px-3 py-2 pl-9 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                  <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
              ))}
            </div>
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "spacer":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Height (px)
            </label>
            <input
              type="number"
              value={block.content.height || 50}
              onChange={(e) => onChange({ height: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "stats_grid":
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Stats Items
            </p>
            <span className="text-xs text-gray-400">4 Columns</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {block.content.items?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="p-3 border border-gray-200 rounded-lg bg-gray-50 hover:border-blue-300 transition-colors"
              >
                <label className="block text-[10px] uppercase text-gray-400 mb-1">
                  Label
                </label>
                <input
                  value={item.label}
                  onChange={(e) => {
                    const newItems = [...block.content.items];
                    newItems[idx] = { ...item, label: e.target.value };
                    onChange({ items: newItems });
                  }}
                  className="w-full text-xs font-semibold bg-transparent border-b border-gray-200 mb-2 focus:border-blue-500 outline-none pb-1"
                />
                <label className="block text-[10px] uppercase text-gray-400 mb-1">
                  Value
                </label>
                <input
                  value={item.value}
                  onChange={(e) => {
                    const newItems = [...block.content.items];
                    newItems[idx] = { ...item, value: e.target.value };
                    onChange({ items: newItems });
                  }}
                  className="w-full text-sm font-bold bg-transparent border-b border-gray-200 focus:border-blue-500 outline-none pb-1"
                />
              </div>
            ))}
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "image_text_split":
      return (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Theme
              </label>
              <select
                value={block.content.theme || "dark"}
                onChange={(e) => onChange({ theme: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="relative relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={block.content.reverse || false}
                    onChange={(e) => onChange({ reverse: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Flip Layout
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Main Image URL
            </label>
            <div className="relative">
              <input
                value={block.content.image || ""}
                onChange={(e) => onChange({ image: e.target.value })}
                className="w-full px-3 py-2 pl-9 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                placeholder="https://..."
              />
              <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Main Title
              </label>
              <input
                value={block.content.title || ""}
                onChange={(e) => onChange({ title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                value={block.content.description || ""}
                onChange={(e) => onChange({ description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all h-[80px] resize-none"
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Bullet Points
            </p>
            <div className="space-y-3">
              {block.content.points?.map((point: any, idx: number) => (
                <div
                  key={idx}
                  className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <input
                      value={point.title}
                      onChange={(e) => {
                        const newPoints = [...block.content.points];
                        newPoints[idx] = { ...point, title: e.target.value };
                        onChange({ points: newPoints });
                      }}
                      placeholder="Point Title"
                      className="w-full text-xs font-bold bg-white border border-gray-200 rounded px-2 py-1.5 focus:border-blue-500 outline-none"
                    />
                    <textarea
                      value={point.description}
                      onChange={(e) => {
                        const newPoints = [...block.content.points];
                        newPoints[idx] = {
                          ...point,
                          description: e.target.value,
                        };
                        onChange({ points: newPoints });
                      }}
                      placeholder="Point Description"
                      className="w-full text-xs text-gray-600 bg-white border border-gray-200 rounded px-2 py-1.5 resize-none h-[50px] focus:border-blue-500 outline-none"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const newPoints = block.content.points.filter(
                        (_: any, i: number) => i !== idx,
                      );
                      onChange({ points: newPoints });
                    }}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  onChange({
                    points: [
                      ...(block.content.points || []),
                      { title: "New Point", description: "Description" },
                    ],
                  })
                }
                className="mt-2 w-full py-2 border border-blue-100 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-all flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Point
              </button>
            </div>
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "gallery_text_split":
      return (
        <div className="space-y-5">
          {/* Layout Controls */}
          <div className="flex justify-end p-2 bg-gray-50 rounded border border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Flip Layout
              </span>
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={block.content.reverse || false}
                  onChange={(e) => onChange({ reverse: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Title
              </label>
              <input
                value={block.content.title || ""}
                onChange={(e) => onChange({ title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                value={block.content.description || ""}
                onChange={(e) => onChange({ description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all h-[80px] resize-none"
              />
            </div>
          </div>

          {/* Bullet Points (Strings) */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Feature Points
            </label>
            <div className="space-y-2">
              {(block.content.points || []).map(
                (point: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      value={point}
                      onChange={(e) => {
                        const newPoints = [...(block.content.points || [])];
                        newPoints[idx] = e.target.value;
                        onChange({ points: newPoints });
                      }}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                    <button
                      onClick={() => {
                        const newPoints = (block.content.points || []).filter(
                          (_: any, i: number) => i !== idx,
                        );
                        onChange({ points: newPoints });
                      }}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ),
              )}
              <button
                onClick={() =>
                  onChange({
                    points: [...(block.content.points || []), "New Point"],
                  })
                }
                className="mt-2 w-full py-2 border border-blue-100 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-all flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Point
              </button>
            </div>
          </div>

          {/* Image Grid */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Gallery Images
            </label>
            <div className="space-y-2">
              {(block.content.images || []).map((img: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      value={img}
                      onChange={(e) => {
                        const newImages = [...(block.content.images || [])];
                        newImages[idx] = e.target.value;
                        onChange({ images: newImages });
                      }}
                      placeholder={`Image URL ${idx + 1}`}
                      className="w-full px-3 py-2 pl-9 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    />
                    <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                  <button
                    onClick={() => {
                      const newImages = (block.content.images || []).filter(
                        (_: any, i: number) => i !== idx,
                      );
                      onChange({ images: newImages });
                    }}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                onChange({ images: [...(block.content.images || []), ""] })
              }
              className="mt-3 w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 font-medium hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Image
            </button>
          </div>

          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "image_with_text":
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200 mb-4">
            <span className="text-sm font-medium text-gray-700">
              Flip Layout (Image Right)
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={block.content.reverse || false}
                onChange={(e) => onChange({ reverse: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Image URL
            </label>
            <div className="relative">
              <input
                value={block.content.image || ""}
                onChange={(e) => onChange({ image: e.target.value })}
                className="w-full px-3 py-2 pl-9 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                placeholder="https://..."
              />
              <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Label (Small)
              </label>
              <input
                value={block.content.label || ""}
                onChange={(e) => onChange({ label: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Title (Large)
              </label>
              <input
                value={block.content.title || ""}
                onChange={(e) => onChange({ title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              value={block.content.description || ""}
              onChange={(e) => onChange({ description: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all h-24 resize-none"
            />
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "video":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Video URL (YouTube/Vimeo)
            </label>
            <input
              value={block.content.url || ""}
              onChange={(e) => onChange({ url: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "cta":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              value={block.content.title || ""}
              onChange={(e) => onChange({ title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Subtitle
            </label>
            <textarea
              value={block.content.subtitle || ""}
              onChange={(e) => onChange({ subtitle: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all h-20 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Button Text
              </label>
              <input
                value={block.content.buttonText || ""}
                onChange={(e) => onChange({ buttonText: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Button Link
              </label>
              <input
                value={block.content.buttonLink || ""}
                onChange={(e) => onChange({ buttonLink: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "testimonials":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Section Title
            </label>
            <input
              value={block.content.title || ""}
              onChange={(e) => onChange({ title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider pointer-events-none">
              Testimonials List
            </p>
            {block.content.items?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2 relative group"
              >
                <button
                  onClick={() => {
                    const newItems = block.content.items.filter(
                      (_: any, i: number) => i !== idx,
                    );
                    onChange({ items: newItems });
                  }}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>

                <textarea
                  value={item.text}
                  onChange={(e) => {
                    const newItems = [...block.content.items];
                    newItems[idx] = { ...item, text: e.target.value };
                    onChange({ items: newItems });
                  }}
                  placeholder="Testimonial text..."
                  className="w-full text-xs text-gray-600 bg-white border border-gray-200 rounded px-2 py-1.5 resize-none h-[60px] focus:border-blue-500 outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={item.author}
                    onChange={(e) => {
                      const newItems = [...block.content.items];
                      newItems[idx] = { ...item, author: e.target.value };
                      onChange({ items: newItems });
                    }}
                    placeholder="Author Name"
                    className="w-full text-xs font-bold bg-white border border-gray-200 rounded px-2 py-1.5 focus:border-blue-500 outline-none"
                  />
                  <input
                    value={item.role}
                    onChange={(e) => {
                      const newItems = [...block.content.items];
                      newItems[idx] = { ...item, role: e.target.value };
                      onChange({ items: newItems });
                    }}
                    placeholder="Role (e.g. CEO)"
                    className="w-full text-xs text-gray-500 bg-white border border-gray-200 rounded px-2 py-1.5 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                onChange({
                  items: [
                    ...(block.content.items || []),
                    {
                      text: "New testimonial...",
                      author: "Name",
                      role: "Role",
                    },
                  ],
                })
              }
              className="w-full py-2 border border-blue-100 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-all flex items-center justify-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Testimonial
            </button>
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    case "features":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Section Title
            </label>
            <input
              value={block.content.title || ""}
              onChange={(e) => onChange({ title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Subtitle
            </label>
            <input
              value={block.content.subtitle || ""}
              onChange={(e) => onChange({ subtitle: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider pointer-events-none">
              Features List
            </p>
            {block.content.items?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2 relative group"
              >
                <button
                  onClick={() => {
                    const newItems = block.content.items.filter(
                      (_: any, i: number) => i !== idx,
                    );
                    onChange({ items: newItems });
                  }}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  <input
                    value={item.icon}
                    onChange={(e) => {
                      const newItems = [...block.content.items];
                      newItems[idx] = { ...item, icon: e.target.value };
                      onChange({ items: newItems });
                    }}
                    placeholder="Icon (Emoji)"
                    className="w-12 text-center text-lg bg-white border border-gray-200 rounded px-2 py-1.5 focus:border-blue-500 outline-none"
                  />
                  <div className="flex-1 space-y-2">
                    <input
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...block.content.items];
                        newItems[idx] = { ...item, title: e.target.value };
                        onChange({ items: newItems });
                      }}
                      placeholder="Feature Title"
                      className="w-full text-xs font-bold bg-white border border-gray-200 rounded px-2 py-1.5 focus:border-blue-500 outline-none"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...block.content.items];
                        newItems[idx] = {
                          ...item,
                          description: e.target.value,
                        };
                        onChange({ items: newItems });
                      }}
                      placeholder="Description..."
                      className="w-full text-xs text-gray-600 bg-white border border-gray-200 rounded px-2 py-1.5 resize-none h-[50px] focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                onChange({
                  items: [
                    ...(block.content.items || []),
                    {
                      title: "New Feature",
                      description: "Description",
                      icon: "✨",
                    },
                  ],
                })
              }
              className="w-full py-2 border border-blue-100 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-all flex items-center justify-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Feature
            </button>
          </div>
          <BlockStyleControls content={block.content} onChange={onChange} />
        </div>
      );

    default:
      return <div>Unknown Block Type</div>;
  }
}

function BlockStyleControls({
  content,
  onChange,
}: {
  content: any;
  onChange: (newContent: any) => void;
}) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50/50 p-4 rounded-xl">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        Block Styling
      </p>
      <div className="space-y-6">
        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Background Color
            </label>
            <div className="flex gap-2">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm ring-1 ring-white shrink-0">
                <input
                  type="color"
                  value={content.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    onChange({ backgroundColor: e.target.value })
                  }
                  className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 p-0 border-none cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={content.backgroundColor || ""}
                onChange={(e) => onChange({ backgroundColor: e.target.value })}
                placeholder="#ffffff"
                className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 font-mono outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Text Color
            </label>
            <div className="flex gap-2">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm ring-1 ring-white shrink-0">
                <input
                  type="color"
                  value={content.textColor || "#000000"}
                  onChange={(e) => onChange({ textColor: e.target.value })}
                  className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 p-0 border-none cursor-pointer"
                />
              </div>
              <input
                type="text"
                value={content.textColor || ""}
                onChange={(e) => onChange({ textColor: e.target.value })}
                placeholder="#000000"
                className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 font-mono outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Gradient */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Gradient Overlay
          </label>
          <GradientPicker
            value={{
              start: content.gradientSettings?.start || "#ffffff",
              end: content.gradientSettings?.end || "#000000",
              direction: content.gradientSettings?.direction || "to right",
              enabled: content.gradientSettings?.enabled || false,
            }}
            onChange={(val) => {
              const gradientCss = val.enabled
                ? `linear-gradient(${val.direction}, ${val.start}, ${val.end})`
                : "";
              onChange({
                gradient: gradientCss,
                gradientSettings: val,
              });
            }}
          />
        </div>

        {/* Spacing */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Padding (px)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Top (e.g. 20)"
              value={content.paddingTop || ""}
              onChange={(e) => onChange({ paddingTop: e.target.value })}
              className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Bottom"
              value={content.paddingBottom || ""}
              onChange={(e) => onChange({ paddingBottom: e.target.value })}
              className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Left"
              value={content.paddingLeft || ""}
              onChange={(e) => onChange({ paddingLeft: e.target.value })}
              className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Right"
              value={content.paddingRight || ""}
              onChange={(e) => onChange({ paddingRight: e.target.value })}
              className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Margin (px)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Top"
              value={content.marginTop || ""}
              onChange={(e) => onChange({ marginTop: e.target.value })}
              className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Bottom"
              value={content.marginBottom || ""}
              onChange={(e) => onChange({ marginBottom: e.target.value })}
              className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Border */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Border & Radius
          </label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Width (e.g. 1px)"
              value={content.borderWidth || ""}
              onChange={(e) => onChange({ borderWidth: e.target.value })}
              className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Radius (e.g. 8px)"
              value={content.borderRadius || ""}
              onChange={(e) => onChange({ borderRadius: e.target.value })}
              className="px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm ring-1 ring-white shrink-0">
              <input
                type="color"
                value={content.borderColor || "#e5e7eb"}
                onChange={(e) => onChange({ borderColor: e.target.value })}
                className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 p-0 border-none cursor-pointer"
              />
            </div>
            <input
              type="text"
              value={content.borderColor || ""}
              onChange={(e) => onChange({ borderColor: e.target.value })}
              placeholder="Border Color #e5e7eb"
              className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 font-mono outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
