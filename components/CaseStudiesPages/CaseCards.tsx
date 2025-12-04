"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Portfolio } from "@/lib/types/portfolios";
import Image from "next/image";

const categories = ["All", "Selected", "Digital", "Branding", "Web"] as const;
type Category = (typeof categories)[number];

type CaseItem = {
  id: string | undefined;
  title: string;
  category: string;
  subtitle: string;
  image: string | null;
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
        const res = await fetch("/api/portfolio");
        const data: Portfolio[] = await res.json();

        const parsed: CaseItem[] = data.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.description || "General",
          subtitle: p.description || "General",
          image:
            Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null,
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
            <Link
              key={item.id}
              href={`/casestudies/${item.id}`}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-white">
                {item.image ? (
                  // <img
                  //   src={item.image}
                  //   alt={item.title}
                  //   className="
                  //     w-full h-[320px]
                  //     object-cover
                  //     transition-transform duration-700
                  //     group-hover:scale-110
                  //   "
                  // />
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={320}
                    className="
    w-full h-[320px]
    object-cover
    transition-transform duration-700
    group-hover:scale-110
  "
                  />
                ) : (
                  <div className="w-full h-[320px] bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Title + Short subtitle */}
              <div className="mt-6 flex items-center justify-center gap-10">
                <h3 className="text-[18px] font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p
                  className="text-[14px] text-gray-500 max-w-[160px] overflow-hidden whitespace-nowrap text-ellipsis"
                  title={item.subtitle}
                >
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
