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

        const parsed: CaseItem[] = data.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.description || "General",
          subtitle: p.description || "General",
          image:
            Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null,
          websiteUrl: p.websiteUrl,
        }));

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
            <div key={item.id} className="group relative">
              <Link href={`/casestudies/${item.id}`} className="block">
                <div className="relative overflow-hidden bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={800}
                      height={320}
                      className="
                        w-full h-[320px]
                        object-cover
                        transition-transform duration-700
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div className="w-full h-[320px] bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                  {/* Gradient Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Title + Short subtitle */}
                <div className="mt-6 flex items-center justify-between px-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[18px] font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p
                      className="text-[14px] text-gray-500 max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis"
                      title={item.subtitle}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  
                  {/* Arrow indicating detail view */}
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-amber-100 group-hover:text-amber-600 transition-all">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                </div>
              </Link>

              {/* Website Redirect Button (Admin added) - Always Visible */}
              {item.websiteUrl && (
                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    absolute top-4 right-4 
                    bg-white/95 backdrop-blur-sm text-gray-900 
                    px-4 py-2 rounded-full 
                    text-xs font-semibold 
                    shadow-lg hover:shadow-xl hover:bg-white hover:scale-105
                    transform transition-all duration-300 z-10
                    flex items-center gap-2 border border-gray-100
                  "
                  title="Visit Live Website"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Site <FaExternalLinkAlt className="w-3 h-3 text-amber-500" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
