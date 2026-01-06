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
} from "lucide-react";
import { PortfolioBlock, PortfolioBlockType } from "@/lib/types/portfolios";
import { v4 as uuidv4 } from "uuid";

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
      b.id === id ? { ...b, content: { ...b.content, ...content } } : b
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
      case "image_with_text":
        return <BookOpen className="w-5 h-5" />;
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
      case "image_with_text":
          return "Image & Text";
      default:
        return "Block";
    }
  };

  const getInitialContent = (type: PortfolioBlockType) => {
    switch (type) {
      case "hero":
        return { title: "New Hero Title", subtitle: "Subtitle here", image: "" };
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
                { label: "Experience", value: "10 Yrs" }
            ] 
        };
      case "image_text_split":
         return {
             title: "LOREM IPSUM",
             description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
             image: "",
             points: [
                 { title: "Point One", description: "Detailed description for point one." },
                 { title: "Point Two", description: "Detailed description for point two." },
                 { title: "Point Three", description: "Detailed description for point three." },
             ]
         };
      case "image_with_text":
          return {
              image: "",
              label: "FEATURE",
              title: "Your Title Here",
              description: "Write your description here.",
              reverse: false
          };
      default:
        return {};
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* TOOLBAR */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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
            "image_with_text",
          ] as PortfolioBlockType[]
        ).map((type) => (
          <button
            key={type}
            onClick={() => addBlock(type)}
            className="flex flex-col items-center justify-center p-3 gap-2 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition border border-transparent hover:border-blue-100"
          >
            {getIcon(type)}
            <span className="text-xs font-medium">{getLabel(type)}</span>
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
                <div className="flex items-center justify-between p-3 border-b bg-gray-50/50 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <div className="cursor-grab active:cursor-grabbing p-1 text-gray-400 hover:text-gray-600">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 font-semibold">
                      {getIcon(block.type)}
                      <span>{getLabel(block.type)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setActiveBlockId(
                          activeBlockId === block.id ? null : block.id
                        )
                      }
                      className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 text-sm font-medium"
                    >
                      {activeBlockId === block.id ? "Close" : "Edit"}
                    </button>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="p-2 hover:bg-red-100 text-red-500 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Editor Body */}
                {activeBlockId === block.id && (
                  <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl">
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
                <p className="text-gray-400 text-sm mt-1">Select a block type from above to start building.</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              value={block.content.title || ""}
              onChange={(e) => onChange({ title: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              value={block.content.subtitle || ""}
              onChange={(e) => onChange({ subtitle: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Image URL
            </label>
            <input
              value={block.content.image || ""}
              onChange={(e) => onChange({ image: e.target.value })}
              placeholder="https://..."
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      );

    case "text":
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            HTML Content
          </label>
          <textarea
            value={block.content.html || ""}
            onChange={(e) => onChange({ html: e.target.value })}
            className="w-full p-2 border rounded min-h-[150px] font-mono text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">Supports Basic HTML tags</p>
        </div>
      );

    case "image_full":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              value={block.content.image || ""}
              onChange={(e) => onChange({ image: e.target.value })}
              placeholder="https://..."
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Caption (Optional)
            </label>
            <input
              value={block.content.caption || ""}
              onChange={(e) => onChange({ caption: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      );

    case "image_grid":
    case "gallery":
      return (
        <div className="space-y-4">
           <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs</label>
               {(block.content.images || []).map((img: string, idx: number) => (
                   <div key={idx} className="flex gap-2 mb-2">
                       <input 
                           value={img}
                           onChange={(e) => {
                               const newImages = [...(block.content.images || [])];
                               newImages[idx] = e.target.value;
                               onChange({ images: newImages });
                           }}
                           placeholder={`Image URL ${idx + 1}`}
                           className="flex-1 p-2 border rounded text-sm"
                       />
                       <button 
                           onClick={() => {
                               const newImages = (block.content.images || []).filter((_: any, i: number) => i !== idx);
                               onChange({ images: newImages });
                           }}
                           className="text-red-500 hover:bg-red-50 p-2 rounded"
                       >
                           <X className="w-4 h-4" />
                       </button>
                   </div>
               ))}
               <button
                  onClick={() => onChange({ images: [...(block.content.images || []), ""] })}
                  className="mt-2 text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline"
               >
                   <Plus className="w-4 h-4" /> Add Image
               </button>
           </div>
        </div>
      );

    case "spacer":
        return (
            <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height (px)
                 </label>
                 <input
                    type="number"
                    value={block.content.height || 50}
                    onChange={(e) => onChange({ height: Number(e.target.value) })}
                    className="w-full p-2 border rounded"
                />
            </div>
        )
    
    case "stats_grid":
        return (
            <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">Stats Items (4 Columns)</p>
                <div className="grid grid-cols-2 gap-4">
                    {block.content.items?.map((item: any, idx: number) => (
                        <div key={idx} className="p-3 border rounded bg-gray-50">
                            <label className="block text-xs uppercase text-gray-400 mb-1">Label</label>
                            <input 
                                value={item.label}
                                onChange={(e) => {
                                    const newItems = [...block.content.items];
                                    newItems[idx] = { ...item, label: e.target.value };
                                    onChange({ items: newItems });
                                }}
                                className="w-full text-sm font-semibold bg-transparent border-b border-gray-200 mb-2 focus:outline-none"
                            />
                            <label className="block text-xs uppercase text-gray-400 mb-1">Value</label>
                             <input 
                                value={item.value}
                                onChange={(e) => {
                                    const newItems = [...block.content.items];
                                    newItems[idx] = { ...item, value: e.target.value };
                                    onChange({ items: newItems });
                                }}
                                className="w-full text-lg font-bold bg-transparent border-b border-gray-200 focus:outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );

    case "image_text_split":
        return (
            <div className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select
                        value={block.content.theme || "dark"}
                        onChange={(e) => onChange({ theme: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="dark">Dark Theme (Black BG)</option>
                        <option value="light">Light Theme (White BG)</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
                    <input
                        value={block.content.image || ""}
                        onChange={(e) => onChange({ image: e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="https://..."
                    />
                 </div>
                 <div className="flex items-center justify-between bg-gray-50 p-2 rounded border mb-4">
                     <span className="text-sm font-medium text-gray-700">Flip Layout (Image Right)</span>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={block.content.reverse || false}
                            onChange={(e) => onChange({ reverse: e.target.checked })}
                            className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                     </label>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
                        <input
                            value={block.content.title || ""}
                            onChange={(e) => onChange({ title: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                     </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={block.content.description || ""}
                            onChange={(e) => onChange({ description: e.target.value })}
                            className="w-full p-2 border rounded h-[42px] resize-none"
                        />
                     </div>
                 </div>

                 <div className="border-t pt-4">
                     <p className="text-sm font-medium text-gray-700 mb-3">Bullet Points</p>
                     <div className="space-y-3">
                         {block.content.points?.map((point: any, idx: number) => (
                             <div key={idx} className="flex gap-3 items-start p-3 bg-gray-50 rounded border">
                                 <div className="flex-1 space-y-2">
                                     <input 
                                         value={point.title}
                                         onChange={(e) => {
                                             const newPoints = [...block.content.points];
                                             newPoints[idx] = { ...point, title: e.target.value };
                                             onChange({ points: newPoints });
                                         }}
                                         placeholder="Point Title"
                                         className="w-full text-sm font-bold bg-white border rounded px-2 py-1"
                                     />
                                     <textarea 
                                         value={point.description}
                                         onChange={(e) => {
                                             const newPoints = [...block.content.points];
                                             newPoints[idx] = { ...point, description: e.target.value };
                                             onChange({ points: newPoints });
                                         }}
                                          placeholder="Point Description"
                                         className="w-full text-sm text-gray-600 bg-white border rounded px-2 py-1 resize-none h-[60px]"
                                     />
                                 </div>
                                 <button 
                                     onClick={() => {
                                         const newPoints = block.content.points.filter((_: any, i: number) => i !== idx);
                                         onChange({ points: newPoints });
                                     }}
                                     className="text-red-500 hover:bg-red-50 p-1 rounded"
                                 >
                                     <X className="w-4 h-4" />
                                 </button>
                             </div>
                         ))}
                         <button 
                            onClick={() => onChange({ points: [...(block.content.points || []), { title: "New Point", description: "Description" }] })}
                            className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
                         >
                             <Plus className="w-4 h-4" /> Add Point
                         </button>
                     </div>
                 </div>
            </div>
        );



    case "image_with_text":
        return (
            <div className="space-y-4">
                 <div className="flex items-center justify-between bg-gray-50 p-2 rounded border mb-4">
                     <span className="text-sm font-medium text-gray-700">Flip Layout (Image Right)</span>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={block.content.reverse || false}
                            onChange={(e) => onChange({ reverse: e.target.checked })}
                            className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                     </label>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input 
                        value={block.content.image || ""}
                        onChange={(e) => onChange({ image: e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="https://..."
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Label (Small)</label>
                        <input 
                            value={block.content.label || ""}
                            onChange={(e) => onChange({ label: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title (Large)</label>
                        <input 
                            value={block.content.title || ""}
                            onChange={(e) => onChange({ title: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                     </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                        value={block.content.description || ""}
                        onChange={(e) => onChange({ description: e.target.value })}
                        className="w-full p-2 border rounded h-24 resize-none"
                    />
                 </div>
            </div>
        );

    default:
      return <div>Unknown Block Type</div>;
  }
}
