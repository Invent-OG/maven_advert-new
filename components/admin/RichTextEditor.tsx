import React, { useEffect, useState, useRef } from "react";
import {
  useEditor,
  EditorContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  NodeViewProps,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import UnderlineExtension from "@tiptap/extension-underline";
import HighlightExtension from "@tiptap/extension-highlight";
import SubscriptExtension from "@tiptap/extension-subscript";
import SuperscriptExtension from "@tiptap/extension-superscript";
import { Color as ColorExtension } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Highlighter,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Quote,
  Minus,
  Loader2,
  Upload,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

// 🖼️ Custom Image NodeView with dedicated Delete Button for added blog images
const BlogImageNodeView: React.FC<NodeViewProps> = ({
  node,
  deleteNode,
  selected,
}) => {
  const { src, alt, title } = node.attrs;

  return (
    <NodeViewWrapper className="relative my-6 block mx-auto text-center group/blog-img max-w-full">
      <div className="relative inline-block max-w-full">
        <img
          src={src}
          alt={alt || ""}
          title={title || ""}
          className={`rounded-xl max-w-full h-auto block mx-auto transition-all ${
            selected
              ? "ring-4 ring-orange-500 shadow-xl"
              : "shadow-md hover:shadow-lg"
          }`}
        />

        {/* Delete Image Button directly on the image */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          <button
            type="button"
            contentEditable={false}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteNode();
              toast.success("Image removed from blog");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-semibold rounded-lg shadow-lg border border-red-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
            title="Delete this image from blog"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete Image</span>
          </button>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

const CustomImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlogImageNodeView);
  },
});

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const uploadAndInsertFile = async (file: File) => {
    if (!editor) return;
    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const fileExt = file.name.split(".").pop();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      const fileName = `content/${Date.now()}-${sanitizedName}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("blogs")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("blogs")
        .getPublicUrl(fileName);

      if (urlData?.publicUrl) {
        editor
          .chain()
          .focus()
          .setImage({ src: urlData.publicUrl })
          .run();
        toast.success("Image added to blog successfully!", { id: toastId });
        setIsImagePopoverOpen(false);
      } else {
        throw new Error("Could not retrieve public image URL");
      }
    } catch (err: any) {
      console.error("Upload image error:", err);
      toast.error(err.message || "Failed to upload image", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleInsertUrl = () => {
    if (!editor || !imageUrlInput.trim()) return;
    editor
      .chain()
      .focus()
      .setImage({ src: imageUrlInput.trim() })
      .run();
    setImageUrlInput("");
    setIsImagePopoverOpen(false);
    toast.success("Image inserted!");
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        underline: false,
      }),
      CustomImage.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-xl max-w-full h-auto my-6 mx-auto block shadow-md cursor-pointer",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      UnderlineExtension,
      HighlightExtension,
      SubscriptExtension,
      SuperscriptExtension,
      TextStyle,
      ColorExtension,
    ],
    content,
    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith("image/")) {
            event.preventDefault();
            uploadAndInsertFile(file);
            return true;
          }
        }
        return false;
      },
      handlePaste: (view, event, slice) => {
        const items = event.clipboardData?.items;
        if (items) {
          for (const item of Array.from(items)) {
            if (item.type.startsWith("image/")) {
              const file = item.getAsFile();
              if (file) {
                event.preventDefault();
                uploadAndInsertFile(file);
                return true;
              }
            }
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!isClient || !editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Hidden file input for direct file upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            uploadAndInsertFile(file);
            e.target.value = "";
          }
        }}
      />

      <div className="bg-muted/50 p-2 flex flex-wrap gap-1 border-b items-center">
        {/* History */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        {/* Basic Formatting */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("bold") ? "bg-muted-foreground/20 text-black" : ""
            }`}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("italic")
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("underline")
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("strike")
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("code") ? "bg-muted-foreground/20 text-black" : ""
            }`}
            onClick={() => editor.chain().focus().toggleCode().run()}
            title="Inline Code"
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("highlight")
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            title="Highlight"
          >
            <Highlighter className="h-4 w-4" />
          </Button>
          <div className="flex items-center h-8 w-8 justify-center">
            <input
              type="color"
              className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
              onInput={(e) =>
                editor
                  .chain()
                  .focus()
                  .setColor((e.target as HTMLInputElement).value)
                  .run()
              }
              value={editor.getAttributes("textStyle").color || "#000000"}
              title="Text Color"
            />
          </div>
        </div>

        {/* Scripts */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("subscript")
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            title="Subscript"
          >
            <SubscriptIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("superscript")
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            title="Superscript"
          >
            <SuperscriptIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("heading", { level: 1 })
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("heading", { level: 2 })
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("heading", { level: 3 })
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive({ textAlign: "left" })
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive({ textAlign: "center" })
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive({ textAlign: "right" })
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-1 border-r pr-2 mr-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("bulletList")
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("orderedList")
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("blockquote")
                ? "bg-muted-foreground/20 text-black"
                : ""
            }`}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        {/* Inserts */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              editor.isActive("link") ? "bg-muted-foreground/20 text-black" : ""
            }`}
            onClick={setLink}
            title="Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>

          {/* 🖼️ Enhanced Image Insertion with Popover (Upload File or Enter URL) */}
          <Popover
            open={isImagePopoverOpen}
            onOpenChange={setIsImagePopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 relative hover:bg-orange-50 hover:text-orange-600 transition-colors"
                title="Insert Image (Upload or URL)"
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                ) : (
                  <ImageIcon className="h-4 w-4" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 p-4 space-y-3 z-50 bg-white shadow-xl border border-gray-200"
              align="start"
            >
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-gray-900">
                  Insert Image into Blog
                </h4>
                <p className="text-xs text-gray-500">
                  Upload an image from your device or paste an image URL.
                </p>
              </div>

              {/* Upload from Device */}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-dashed border-2 border-gray-300 hover:border-orange-500 hover:text-orange-600 transition-colors py-5"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading image...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 text-orange-500" />
                      Upload from computer
                    </>
                  )}
                </Button>
              </div>

              <div className="relative flex items-center justify-center text-[10px] text-gray-400 uppercase font-medium">
                <span className="bg-white px-2 z-10">Or paste image URL</span>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
              </div>

              {/* Paste URL */}
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInsertUrl();
                    }
                  }}
                  className="h-8 text-xs"
                />
                <Button
                  type="button"
                  size="sm"
                  className="h-8 text-xs bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={handleInsertUrl}
                  disabled={!imageUrlInput.trim()}
                >
                  Insert
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Delete Button in toolbar when an image is selected */}
          {editor.isActive("image") && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="h-8 text-xs flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white shadow-sm ml-1"
              onClick={() => {
                editor.chain().focus().deleteSelection().run();
                toast.success("Image removed from blog");
              }}
              title="Delete selected image"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Image</span>
            </Button>
          )}
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="p-4 min-h-[350px] max-w-none focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror_img]:rounded-xl [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto [&_.ProseMirror_img]:my-6 [&_.ProseMirror_img]:mx-auto [&_.ProseMirror_img]:block [&_.ProseMirror_img]:shadow-md [&_.ProseMirror_p]:mb-4"
      />
    </div>
  );
};

export default RichTextEditor;
