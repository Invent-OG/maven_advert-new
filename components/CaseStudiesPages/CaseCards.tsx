"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Portfolio } from "@/lib/types/portfolios";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";

const categories = ["All", "Selected", "Digital", "Branding", "Web"] as const;
type Category = (typeof categories)[number];

type CaseItem = {
  id: string | undefined;
  title: string;
  category: string;
  subtitle: string;
  image: string | null;
  websiteUrl?: string | null;
};

export default function CaseCards() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [items, setItems] = useState<CaseItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  useEffect(() => {
    async function loadPortfolios() {
      try {
        const res = await fetch("/api/portfolio", { cache: "no-store" });
        const data: Portfolio[] = await res.json();

const parsed: CaseItem[] = data.map((p) => {
          let imageUrl =
            Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;

          if (!imageUrl && p.blocks && Array.isArray(p.blocks)) {
            // Priority 1: Single image blocks
            const imageBlock = p.blocks.find(
              (b) =>
                (b.type === "hero" ||
                  b.type === "image_full" ||
                  b.type === "image_with_text" ||
                  b.type === "image_text_split") &&
                b.content?.image
            );
            if (imageBlock) {
              imageUrl = imageBlock.content.image;
            }

            // Priority 2: Gallery/Grid blocks (take first image)
            if (!imageUrl) {
              const galleryBlock = p.blocks.find(
                (b) =>
                  (b.type === "gallery" ||
                    b.type === "image_grid" ||
                    b.type === "gallery_text_split") &&
                  Array.isArray(b.content?.images) &&
                  b.content.images.length > 0
              );
              if (galleryBlock) {
                imageUrl = galleryBlock.content.images[0];
              }
            }
          }

          return {
            id: p.id,
            title: p.title,
            category: p.description || "General",
            subtitle: p.description || "General",
            image: imageUrl,
            websiteUrl: p.websiteUrl,
          };
        });

        setItems(parsed);
      } catch (e) {
        console.error("Failed to load portfolios", e);
      }
    }
    loadPortfolios();

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeCategory]);

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Filter Bar */}
        <div
          data-aos="fade-up"
          className="flex flex-wrap justify-center gap-8 mb-14 pb-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-gray-600 font-medium relative pb-1 transition-all ${
                activeCategory === cat
                  ? "text-gray-900 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gray-900"
                  : "hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col items-start gap-4"
              data-aos="fade-up"
            >
              <Link href={`/casestudies/${item.id}`} className="block w-full">
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 rounded-none cursor-pointer">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                      <span className="text-sm font-medium uppercase tracking-wider">
                        No Image
                      </span>
                    </div>
                  )}

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Visit Live Site Badge (Floating) */}
                  {item.websiteUrl && (
                    <div
                      className="absolute top-4 right-4 z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform sm:translate-y-2 sm:group-hover:translate-y-0"
                      onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking this button
                    >
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-none shadow-lg hover:bg-[#DFB025] hover:text-white transition-colors border border-gray-100"
                      >
                        Visit Site <FaExternalLinkAlt className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="mt-5 w-full flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight group-hover:text-[#DFB025] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0 transform">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#DFB025]"
                      >
                        <path
                          d="M7 17L17 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 7H17V17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <p className="text-sm md:text-base text-gray-500 line-clamp-2 leading-relaxed max-w-[90%]">
                    {item.subtitle}
                  </p>
                  
                  {/* Optional: Add a subtle line or just keep it clean */}
                  <div className="w-0 group-hover:w-full h-[1px] bg-[#DFB025] mt-4 transition-all duration-500 ease-out" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
