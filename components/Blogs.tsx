"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useBlogs, Blog } from "@/lib/queries/blogs";
import { blogs as fallbackBlogs } from "@/data/blogs";

gsap.registerPlugin(ScrollTrigger);

export default function Blogs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const { data, isLoading } = useBlogs(1, 100);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-row-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeCategory, isLoading]);

  // Merge database blogs and fallback mock blogs
  const allBlogs = useMemo(() => {
    const dbBlogs = data?.blogs || [];
    const dbIds = new Set(dbBlogs.map((b) => b.id?.toString() || ""));
    const dbSlugs = new Set(dbBlogs.map((b) => b.slug?.toLowerCase() || ""));

    const formattedDbBlogs = dbBlogs.map((b) => ({
      id: b.id?.toString() || "",
      slug: b.slug || "",
      title: b.title,
      excerpt: b.description,
      imageUrl: b.imageUrl,
      author: b.author || "Maven Advert Team",
      readTime: b.readTime || "5 min read",
      category: b.category || "General",
      createdAt: b.createdAt
        ? new Date(b.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Recent",
    }));

    const formattedFallbacks = fallbackBlogs
      .filter((fb) => !dbIds.has(fb.id?.toString() || "") && !dbSlugs.has(fb.id?.toLowerCase() || ""))
      .map((fb) => ({
        id: fb.id?.toString() || "",
        slug: fb.id?.toString() || "",
        title: fb.title,
        excerpt: fb.excerpt,
        imageUrl: fb.cover,
        author: fb.author || "Maven Advert Team",
        readTime: fb.readTime || "5 min read",
        category: fb.categories?.[0] || "General",
        createdAt: fb.date || "Recent",
      }));

    return [...formattedDbBlogs, ...formattedFallbacks];
  }, [data?.blogs]);

  // Filter blogs based on active category
  const filteredBlogs = useMemo(() => {
    if (activeCategory === "All") {
      return allBlogs.slice(0, 4); // Limit to top 4 for home page
    }
    return allBlogs
      .filter((blog) => blog.category.toLowerCase() === activeCategory.toLowerCase())
      .slice(0, 4);
  }, [allBlogs, activeCategory]);

  const categories = [
    { name: "All Articles", value: "All" },
    { name: "Web design", value: "Web design" },
    { name: "GFX Design", value: "GFX Design" },
    { name: "Brand Identity", value: "Brand Identity" },
    { name: "UI/UX Design", value: "UI/UX Design" },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-sm font-semibold text-gray-500 block mb-2 font-mono">
              [Blog & Articles]
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Read Our Latest<br />News & Article
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-md">
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              The agency and the client collaborate to refine the strategy further & data-driven improvements.
            </p>
            <Link
              href="/blogs"
              className="px-6 py-3 bg-black text-white hover:bg-orange-600 transition-colors duration-300 font-bold text-xs uppercase tracking-wider rounded-full whitespace-nowrap shadow-md hover:shadow-lg active:scale-95 transform"
            >
              Start for Free
            </Link>
          </div>
        </div>

        {/* Tab Filter Navigation Grid Bar */}
        <div className="w-full border border-gray-200 bg-white rounded-t-xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-gray-200">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`py-4 px-4 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === cat.value
                    ? "bg-white text-black font-extrabold border-b-2 border-b-orange-500"
                    : "bg-gray-50/50 text-gray-500 hover:text-black hover:bg-gray-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Vertical List of Horizontal Row Cards */}
        {filteredBlogs.length === 0 ? (
          <div className="bg-white border-x border-b border-gray-200 rounded-b-xl p-16 text-center shadow-sm">
            <span className="text-4xl block mb-4">✍️</span>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No articles found</h3>
            <p className="text-gray-400 text-sm">
              There are no articles listed under the &ldquo;{activeCategory}&rdquo; category.
            </p>
          </div>
        ) : (
          <div className="w-full border-x border-b border-gray-200 bg-white rounded-b-xl overflow-hidden shadow-sm flex flex-col divide-y divide-gray-200">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="blog-row-item group flex flex-col md:flex-row w-full transition-colors duration-300 hover:bg-gray-50/30"
              >
                {/* Left Side: Content Text */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-between items-start bg-[#FAF9F6] border-b md:border-b-0 md:border-r border-gray-200">
                  <div className="w-full">
                    {/* Category Label Badge */}
                    <span className="inline-block px-3 py-1 bg-white border border-gray-200/80 rounded-none text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-6 shadow-sm">
                      {blog.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                      <Link href={`/blogs/${blog.slug || blog.id}`}>{blog.title}</Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Metadata Bar */}
                  <div className="flex items-center text-xs font-semibold text-gray-400 gap-4">
                    <span className="flex items-center gap-1.5">
                      ⏱ {blog.readTime}
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1.5">
                      📅 {blog.createdAt}
                    </span>
                  </div>
                </div>

                {/* Right Side: Image Container */}
                <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto relative overflow-hidden bg-gray-100">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                    sizes="(max-w-768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
