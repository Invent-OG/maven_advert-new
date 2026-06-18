"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useBlogs } from "@/lib/queries/blogs";
import { blogs as fallbackBlogs } from "@/data/blogs";
import { Calendar, Search, Timer } from "lucide-react";
import { BsPersonFill } from "react-icons/bs";

const ITEMS_PER_PAGE = 7; // Magazine layout: 1 Featured + 6 Grid items (2 rows of 3) on page 1, or 7 items on other pages.

export default function BlogsArchive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch up to 100 blogs from API
  const { data, isLoading } = useBlogs(1, 100);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Merge database blogs and fallback blogs (deduplicated by ID/slug)
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
      readTime: b.readTime || "5 min",
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
        readTime: fb.readTime || "5 min",
        category: fb.categories?.[0] || "General",
        createdAt: fb.date || "Recent",
      }));

    return [...formattedDbBlogs, ...formattedFallbacks];
  }, [data?.blogs]);

  // Dynamically extract all available categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    allBlogs.forEach((blog) => {
      if (blog.category) {
        cats.add(blog.category.trim());
      }
    });
    return ["All", ...Array.from(cats)];
  }, [allBlogs]);

  // Filter blogs by search query and category
  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allBlogs, searchQuery, selectedCategory]);

  // Determine if we show the featured article
  const showFeatured = currentPage === 1 && searchQuery === "" && selectedCategory === "All" && filteredBlogs.length > 0;

  // Split featured and grid source
  const featuredBlog = showFeatured ? filteredBlogs[0] : null;
  const gridSource = showFeatured ? filteredBlogs.slice(1) : filteredBlogs;

  // Paginated grid blogs
  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return gridSource.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [gridSource, currentPage]);

  const totalPages = Math.ceil(gridSource.length / ITEMS_PER_PAGE);

  // Group paginated blogs for magazine layout (1 Large + 3 Small = 4 items per group)
  const magazineGroups = useMemo(() => {
    const result = [];
    for (let i = 0; i < paginatedBlogs.length; i += 4) {
      result.push(paginatedBlogs.slice(i, i + 4));
    }
    return result;
  }, [paginatedBlogs]);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!isLoading && paginatedBlogs.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".archive-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [paginatedBlogs, isLoading]);

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#f8fafc] pb-24">
      {/* Premium Hero Banner */}
      <section className="relative bg-gray-950 text-white overflow-hidden pt-44 pb-32 px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-600/20 via-gray-950 to-gray-950 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

        <div className="max-w-4xl mx-auto">
          <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest bg-orange-950/40 border border-orange-500/20 px-4 py-1.5 rounded-full inline-block mb-4">
            Maven Insights
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6">
            The <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Maven Blog</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Dive into design trends, industry strategies, and engineering innovation. Explore thoughts that drive digital transformation.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-4 -mt-10 relative z-10">
        {/* Sticky Control Panel: Search & Categories */}
        <div className="sticky top-[86px] z-30 bg-white/90 backdrop-blur-md border border-gray-100 rounded-3xl p-6 shadow-lg shadow-slate-200/50 mb-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-grow max-w-lg w-full">
              <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search articles, topics or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category selection scrollbar */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 -mx-6 px-6 lg:mx-0 lg:px-0">
              {categories.map((category) => {
                const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "text-white shadow-md shadow-orange-500/25"
                        : "bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    style={
                      isActive
                        ? {
                            background: "linear-gradient(180deg, #ff914d 0%, #ff5200 100%)",
                          }
                        : {}
                    }
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Loading Skeleton Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl p-6 space-y-4 animate-pulse">
                <div className="bg-gray-200 h-56 w-full rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm px-6">
            <span className="text-5xl block mb-4">✍️</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
              We couldn&apos;t find any articles matching your search filter. Try modifying your keywords or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-6 py-2.5 rounded-full text-white font-semibold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md shadow-orange-500/20"
              style={{
                background: "linear-gradient(180deg, #ff914d 0%, #ff5200 100%)",
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* 1. FEATURED ARTICLE SECTION */}
            {featuredBlog && (
              <div className="mb-16 archive-card opacity-0">
                <div className="group bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-10 items-stretch">
                  {/* Image (60%) */}
                  <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[400px] overflow-hidden bg-gray-50">
                    <Image
                      src={featuredBlog.imageUrl}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      priority
                    />
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-md">
                        {featuredBlog.category}
                      </span>
                    </div>
                  </div>
                  {/* Content (40%) */}
                  <div className="lg:col-span-4 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 text-gray-400 text-xs sm:text-sm mb-6 font-semibold">
                        <span className="flex items-center gap-1.5 text-orange-500">
                          <BsPersonFill size={14} />
                          BY {featuredBlog.author?.toUpperCase()}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {featuredBlog.createdAt}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Timer size={14} />
                          {featuredBlog.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900 mb-5 group-hover:text-orange-500 transition-colors duration-300">
                        <Link href={`/blogs/${featuredBlog.slug || featuredBlog.id}`}>
                          {featuredBlog.title}
                        </Link>
                      </h2>

                      <p className="text-gray-500 text-sm sm:text-base leading-relaxed line-clamp-4">
                        {featuredBlog.excerpt}
                      </p>
                    </div>

                    <div className="mt-8">
                      <Link
                        href={`/blogs/${featuredBlog.slug || featuredBlog.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 text-white font-bold hover:bg-orange-500 transition-all duration-300 hover:shadow-lg active:scale-95 text-xs tracking-wider"
                      >
                        READ ARTICLE
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. MAGAZINE GRID SECTION */}
            <div className="space-y-12">
              {magazineGroups.map((group, groupIdx) => {
                const isLeftLarge = groupIdx % 2 === 0;
                const largeArticle = group[0];
                const smallArticles = group.slice(1);

                // Dynamically collapse columns if there are no small articles
                const colSpanClass = smallArticles.length === 0 ? "lg:col-span-3 md:col-span-2" : "lg:col-span-2 md:col-span-2";

                return (
                  <div key={groupIdx} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {isLeftLarge ? (
                      <>
                        {/* Large Card */}
                        <div className={`${colSpanClass} flex flex-col`}>
                          {largeArticle && <LargeCard blog={largeArticle} />}
                        </div>
                        {/* Stack of Small Cards */}
                        {smallArticles.length > 0 && (
                          <div className="lg:col-span-1 md:col-span-2 flex flex-col gap-6 justify-between">
                            {smallArticles.map((smallBlog) => (
                              <SmallCard key={smallBlog.id} blog={smallBlog} />
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Stack of Small Cards on left */}
                        {smallArticles.length > 0 && (
                          <div className="lg:col-span-1 md:col-span-2 flex flex-col gap-6 justify-between lg:order-first md:order-last">
                            {smallArticles.map((smallBlog) => (
                              <SmallCard key={smallBlog.id} blog={smallBlog} />
                            ))}
                          </div>
                        )}
                        {/* Large Card */}
                        <div className={`${colSpanClass} flex flex-col`}>
                          {largeArticle && <LargeCard blog={largeArticle} />}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-16">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border border-gray-250 bg-white text-gray-600 hover:bg-gray-50 hover:text-orange-500 active:scale-95 transition-all ${
                    currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border transition-all active:scale-95 ${
                      currentPage === page
                        ? "text-white border-orange-500 shadow-md shadow-orange-500/25"
                        : "bg-white border-gray-250 text-gray-600 hover:bg-gray-50 hover:text-orange-500"
                    }`}
                    style={
                      currentPage === page
                        ? {
                            background: "linear-gradient(180deg, #ff914d 0%, #ff5200 100%)",
                          }
                        : {}
                    }
                  >
                    {page}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border border-gray-250 bg-white text-gray-600 hover:bg-gray-50 hover:text-orange-500 active:scale-95 transition-all ${
                    currentPage === totalPages ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

// ==========================================
// Subcomponents for Magazine Card Layouts
// ==========================================

function LargeCard({ blog }: { blog: any }) {
  return (
    <article className="archive-card group bg-white rounded-[24px] border border-gray-150 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Image */}
      <div className="relative h-[240px] sm:h-[280px] overflow-hidden bg-gray-50">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />
        <div className="absolute top-5 left-5 z-10">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
        <div>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-gray-400 text-xs mb-3 font-semibold">
            <span className="flex items-center gap-1.5 text-orange-500">
              <BsPersonFill size={14} />
              {blog.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {blog.createdAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Timer size={13} />
              {blog.readTime}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold leading-snug text-slate-900 line-clamp-2 mb-3 group-hover:text-orange-500 transition-colors duration-300">
            <Link href={`/blogs/${blog.slug || blog.id}`}>
              {blog.title}
            </Link>
          </h3>

          <p className="text-gray-500 text-sm sm:text-base leading-relaxed line-clamp-3">
            {blog.excerpt}
          </p>
        </div>

        <div className="mt-6">
          <Link
            href={`/blogs/${blog.slug || blog.id}`}
            className="text-orange-500 font-extrabold text-sm sm:text-base inline-flex items-center gap-2 group-hover:text-orange-600 transition-colors"
          >
            Read Article
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function SmallCard({ blog }: { blog: any }) {
  return (
    <article className="archive-card group bg-white rounded-[24px] border border-gray-150 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-4 flex gap-4 items-center overflow-hidden flex-1">
      {/* Thumbnail */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[16px] overflow-hidden flex-shrink-0 bg-gray-50">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />
      </div>

      {/* Info */}
      <div className="flex-grow min-w-0">
        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-1">
          {blog.category}
        </span>
        
        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors duration-300 mb-2">
          <Link href={`/blogs/${blog.slug || blog.id}`}>
            {blog.title}
          </Link>
        </h4>

        <div className="flex items-center gap-2.5 text-[11px] font-semibold text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {blog.createdAt}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Timer size={12} />
            {blog.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
