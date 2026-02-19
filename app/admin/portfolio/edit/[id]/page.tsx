"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Trash2,
  Calendar,
  Eye,
  Settings,
  ChevronDown,
  Palette,
  Layers,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import {
  useUpdatePortfolio,
  useDeletePortfolio,
  usePortfolio,
} from "@/lib/queries/portfolio";
import PortfolioBuilder from "@/components/admin/portfolio/PortfolioBuilder";
import { PortfolioBlock, Portfolio } from "@/lib/types/portfolios";
import BlockRenderer from "@/components/Portfolio/BlockRenderer";
import { GradientPicker } from "@/components/admin/portfolio/GradientPicker";

// --- UI Components (Shared) ---

const Section = ({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 text-gray-700 font-medium">
          <Icon className="w-5 h-5 text-gray-400" />
          {title}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function EditPortfolioPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const { data: portfolio } = usePortfolio(id);
  const updateMutation = useUpdatePortfolio();
  const deleteMutation = useDeletePortfolio();

  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  // Page Styling
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  // Gradient State
  const [gradientEnabled, setGradientEnabled] = useState(false);
  const [gradientStart, setGradientStart] = useState("#ffffff");
  const [gradientEnd, setGradientEnd] = useState("#000000");
  const [gradientDirection, setGradientDirection] = useState("to right");

  const [blocks, setBlocks] = useState<PortfolioBlock[]>([]);

  // Preview Mode
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  const gradient = gradientEnabled
    ? `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`
    : "";

  useEffect(() => {
    if (portfolio) {
      setTitle(portfolio.title);
      setDescription(portfolio.description);
      setWebsiteUrl(portfolio.websiteUrl || "");

      // Handle images
      let imgs: string[] = [];
      if (typeof portfolio.images === "string") {
        try {
          imgs = JSON.parse(portfolio.images);
        } catch {
          imgs = [];
        }
      } else if (Array.isArray(portfolio.images)) {
        imgs = portfolio.images;
      }
      setImagesPreview(imgs);

      // Parse styling
      try {
        if (portfolio.content && portfolio.content.startsWith("{")) {
          const settings = JSON.parse(portfolio.content);
          setBackgroundColor(settings.backgroundColor || "#ffffff");
          setGradientEnabled(settings.gradientEnabled || false);
          setGradientStart(settings.gradientStart || "#ffffff");
          setGradientEnd(settings.gradientEnd || "#000000");
          setGradientDirection(settings.gradientDirection || "to right");
        }
      } catch (e) {
        console.error("Failed to parse portfolio settings", e);
      }

      // Load blocks
      try {
        if (typeof portfolio.blocks === "string") {
          setBlocks(JSON.parse(portfolio.blocks));
        } else if (Array.isArray(portfolio.blocks)) {
          setBlocks(portfolio.blocks);
        } else {
          setBlocks([]);
        }
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    }
  }, [portfolio]);

  const handleUpdate = async () => {
    if (!id) return toast.error("Invalid ID");
    if (!title.trim() || !description.trim()) {
      return toast.error("Title and description are required");
    }

    try {
      const settings = {
        backgroundColor,
        gradient,
        gradientEnabled,
        gradientStart,
        gradientEnd,
        gradientDirection,
      };

      const payload: any = {
        id,
        title,
        description,
        content: JSON.stringify(settings),
        layoutId: 0,
        images: [],
        websiteUrl: websiteUrl.trim() || null,
        blocks: blocks,
      };

      await updateMutation.mutateAsync(payload);
      toast.success("Portfolio updated successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to update portfolio");
    }
  };

  const handleDelete = async () => {
    if (!id) return toast.error("Invalid ID");
    if (
      !confirm(
        "Are you sure you want to delete this portfolio? This action cannot be undone.",
      )
    )
      return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Portfolio deleted successfully!");
      router.push("/admin/portfolio");
    } catch (e) {
      toast.error("Failed to delete portfolio");
    }
  };

  const deviceWidths = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[375px]",
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden font-sans">
      <Toaster richColors position="top-right" />

      {/* --- LEFT SIDEBAR (EDITOR) --- */}
      <div className="w-[450px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col z-20 shadow-2xl">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/portfolio")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-bold text-gray-800 text-lg tracking-tight">
              Edit Portfolio
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.open(`/casestudies/${id}`, "_blank")}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
              title="View Live"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
          {/* Last Updated Info */}
          {portfolio && (
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs text-gray-500 flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              Last updated:{" "}
              {new Date(
                (portfolio as { updatedAt?: string | Date }).updatedAt ??
                  portfolio.createdAt ??
                  new Date(),
              ).toLocaleDateString()}
            </div>
          )}

          <Section title="General Info" icon={Settings} defaultOpen>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Portfolio Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="My Portfolio"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="Brief description..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Website URL
                </label>
                <input
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>
          </Section>

          <Section title="Appearance" icon={Palette} defaultOpen>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm border border-gray-200 ring-2 ring-white">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 p-0 border-none cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <GradientPicker
                  value={{
                    start: gradientStart,
                    end: gradientEnd,
                    direction: gradientDirection,
                    enabled: gradientEnabled,
                  }}
                  onChange={(val) => {
                    setGradientEnabled(val.enabled);
                    setGradientStart(val.start);
                    setGradientEnd(val.end);
                    setGradientDirection(val.direction);
                  }}
                />
              </div>
            </div>
          </Section>

          <Section title="Content Blocks" icon={Layers} defaultOpen>
            <div className="mb-2">
              <p className="text-xs text-gray-400 mb-4">
                Drag and drop blocks to rearrange. Click to edit.
              </p>
              <PortfolioBuilder blocks={blocks} onChange={setBlocks} />
            </div>
          </Section>

          <div className="p-4 space-y-3">
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-3 px-4 rounded-xl font-medium transition-all text-sm border border-transparent hover:border-red-100"
            >
              {deleteMutation.isPending ? (
                "Deleting..."
              ) : (
                <>
                  {" "}
                  <Trash2 className="w-4 h-4" /> Delete Portfolio{" "}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-white space-y-3">
          <button
            onClick={handleUpdate}
            disabled={updateMutation.isPending}
            className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-medium transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-600/20"
          >
            {updateMutation.isPending ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Update Portfolio
          </button>
        </div>
      </div>

      {/* --- RIGHT PREVIEW --- */}
      <div className="flex-1 bg-[#F3F4F6] relative flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="h-14 flex items-center justify-center gap-1 mt-4">
          <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex gap-1">
            <button
              onClick={() => setPreviewDevice("desktop")}
              className={`p-2 rounded-md transition-all ${previewDevice === "desktop" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice("tablet")}
              className={`p-2 rounded-md transition-all ${previewDevice === "tablet" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice("mobile")}
              className={`p-2 rounded-md transition-all ${previewDevice === "mobile" ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Device Frame */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 flex justify-center items-start scrollbar-thin">
          <div
            className={`
                transition-all duration-300 ease-in-out bg-white shadow-2xl origin-top
                ${deviceWidths[previewDevice]}
                ${previewDevice === "mobile" ? "min-h-[667px] rounded-[3rem] border-8 border-gray-800" : ""}
                ${previewDevice === "tablet" ? "min-h-[1024px] rounded-[2rem] border-8 border-gray-800" : ""}
                ${previewDevice === "desktop" ? "min-h-full rounded-lg border border-gray-200" : ""}
             `}
          >
            {/* Screen Content */}
            <div
              className={`w-full h-full overflow-hidden bg-white ${previewDevice !== "desktop" ? "rounded-[2.5rem]" : ""}`}
              style={{
                background: gradient || backgroundColor,
                minHeight: "100%",
              }}
            >
              {blocks.length > 0 ? (
                <BlockRenderer blocks={blocks} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4 p-10 text-center">
                  <Settings className="w-16 h-16 opacity-50" />
                  <p className="text-lg font-medium">Your canvas is empty</p>
                  <p className="text-sm">
                    Add blocks from the left panel to start building.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
