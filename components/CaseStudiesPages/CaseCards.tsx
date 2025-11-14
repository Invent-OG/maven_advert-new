"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const categories = ["All", "Selected", "Digital", "Branding", "Web"];

export const items = [
  {
    id: 1,
    title: "Tailoring inteo",
    category: "Branding",
    subtitle: "Branding",
    image:
      "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/portfolio-207-600x430.jpg.webp",
    description:
      "A creative branding campaign focusing on tailor-made visual identity.",
  },
  {
    id: 2,
    title: "Design blast",
    category: "Photography",
    subtitle: "Photography",
    image:
      "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/portfolio-98-600x430.jpg.webp",
    description: "A dynamic photo-driven marketing project for visual appeal.",
  },
  {
    id: 3,
    title: "Herbal beauty",
    category: "Application",
    subtitle: "Application",
    image:
      "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/portfolio-240-600x430.jpg.webp",
    description: "A sleek app design promoting herbal skincare products.",
  },
  {
    id: 4,
    title: "Organic dropper",
    category: "Selected",
    subtitle: "Selected",
    image:
      "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/portfolio-33-600x430.jpg.webp",
    description:
      "Packaging and branding for an eco-friendly essential oils brand.",
  },
  {
    id: 5,
    title: "Cork product",
    category: "Digital",
    subtitle: "Digital",
    image:
      "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/portfolio-177-600x430.jpg.webp",
    description: "Digital strategy for sustainable cork-based products.",
  },
  {
    id: 6,
    title: "Modern packaging",
    category: "Web",
    subtitle: "Web",
    image:
      "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/portfolio-178-600x430.jpg.webp",
    description: "A modern website showcasing innovative packaging solutions.",
  },
];

export default function CaseCards() {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeCategory]);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Filter Bar */}
        <div
          data-aos="fade-up"
          className="flex flex-wrap justify-center gap-6 mb-10 pb-4"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-gray-700 font-medium relative transition-all pb-1 ${
                activeCategory === cat
                  ? "text-gray-900 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gray-900"
                  : "hover:text-gray-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Gallery */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/casestudies/${item.id}`}
              className="group cursor-pointer overflow-hidden"
            >
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-8 flex justify-evenly items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-md text-gray-500">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
