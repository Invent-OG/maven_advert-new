
"use client";

import { useBlog, useBlogs } from "@/lib/queries/blogs";
import { blogs as fallbackBlogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { Calendar, Timer } from "lucide-react";
import { BsPersonFill } from "react-icons/bs";


export default function BlogsId() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);

  const { data, isLoading, isError } = useBlog(id as string);
  const { data: recentData } = useBlogs(1, 6, "", undefined);

  // Find local fallback blog if it exists
  const localBlog = useMemo(() => {
    return fallbackBlogs.find(
      (b) => b.id.toString() === id || b.id.toLowerCase() === (id as string)?.toLowerCase()
    );
  }, [id]);

  // Determine post content safely with fallbacks
  const postData = useMemo(() => {
    if (data?.blog) {
      return data.blog;
    }
    if (localBlog) {
      return {
        id: localBlog.id.toString(),
        title: localBlog.title,
        heading: localBlog.title,
        description: localBlog.excerpt,
        imageUrl: localBlog.cover,
        author: localBlog.author || "Maven Advert Team",
        readTime: localBlog.readTime || "5 min",
        createdAt: localBlog.date || "Recent",
        content: localBlog.content, // already formatted array or string
        tags: localBlog.tags || localBlog.categories || [],
        category: localBlog.categories?.[0] || "General",
      };
    }
    return null;
  }, [data?.blog, localBlog]);

  // Merge database recent blogs and fallback blogs (excluding current post)
  const recent = useMemo(() => {
    const dbBlogs = recentData?.blogs || [];
    const dbIds = new Set(dbBlogs.map((b) => b.id?.toString() || ""));
    const dbSlugs = new Set(dbBlogs.map((b) => b.slug?.toLowerCase() || ""));

    const formattedDbBlogs = dbBlogs.map((b) => ({
      id: b.id?.toString() || "",
      slug: b.slug || "",
      title: b.title,
      imageUrl: b.imageUrl,
      readTime: b.readTime || "5 min",
      createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : "",
    }));

    const formattedFallbacks = fallbackBlogs
      .filter(
        (fb) =>
          !dbIds.has(fb.id?.toString() || "") &&
          !dbSlugs.has(fb.id?.toLowerCase() || "") &&
          fb.id?.toString() !== id &&
          fb.id?.toLowerCase() !== (id as string)?.toLowerCase()
      )
      .map((fb) => ({
        id: fb.id?.toString() || "",
        slug: fb.id?.toString() || "",
        title: fb.title,
        imageUrl: fb.cover,
        readTime: fb.readTime || "5 min",
        createdAt: fb.date || "",
      }));

    return [...formattedDbBlogs, ...formattedFallbacks];
  }, [recentData?.blogs, id]);

  const handleLike = () => {
    if (isLiked) setLikeCount(likeCount - 1);
    else setLikeCount(likeCount + 1);
    setIsLiked(!isLiked);
  };

  // Show loading spinner ONLY if database query is loading and we don't have local fallback data
  if (isLoading && !localBlog)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );

  // Show error ONLY if we have no valid post (either from DB or fallback list) and API call has failed or finished
  if ((isError || !postData) && !isLoading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-gray-900 mb-4">
            Article Not Found
          </h1>
          <Link
            href="/blogs"
            className="text-blue-600 hover:text-blue-800 font-serif"
          >
            ← Return to Articles
          </Link>
        </div>
      </div>
    );

  type PostType = NonNullable<typeof postData> & { tags?: string[] };
  const post = postData as PostType;

  return (
    <div className="min-h-screen bg-gray-50/50 overflow-x-hidden pb-24">
      {/* Premium Hero Banner */}
      <section className="relative bg-gray-950 text-white overflow-hidden pt-44 pb-36 px-6 text-center">
        {/* Background Gradients & Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-600/20 via-gray-950 to-gray-950 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] -z-10" />

        {/* Dynamic mesh design */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex justify-center items-center gap-2.5 text-[10px] sm:text-xs font-bold text-orange-400 uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>•</span>
            <Link href="/blogs" className="hover:text-white transition-colors">BLOGS</Link>
            <span>•</span>
            <span className="text-gray-400 truncate max-w-[150px]">{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-8 leading-tight max-w-3xl mx-auto text-white">
            {post.title}
          </h1>

          {/* Premium Meta Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-1.5 text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
              <BsPersonFill />

              BY {post.author?.toUpperCase()}
            </span>
            <span className="text-gray-800">•</span>
            <span className="flex items-center gap-1.5">
              <Calendar />{post.createdAt
                ? new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
                : "Recent"}
            </span>
            <span className="text-gray-800">•</span>
            <span className="flex items-center gap-1.5">
              <Timer /> {post.readTime} READ
            </span>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* MAIN CONTENT */}
          <article className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-200/50">
            {/* Featured Image */}
            <div className="mb-10 overflow-hidden rounded-2xl border border-gray-100 shadow-sm relative w-full h-64 sm:h-[350px] md:h-[450px]">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Summary Card */}
            <div className="bg-orange-50/60 border-l-4 border-orange-500 p-6 rounded-r-2xl mb-10 shadow-sm">
              <h3 className="text-xs font-bold text-orange-800 tracking-wider mb-2 font-mono">
                ARTICLE SUMMARY
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {post.description}
              </p>
            </div>

            {/* Content Body */}
            <div className="space-y-6 text-gray-800 font-serif text-lg leading-relaxed md:text-[19px] prose max-w-none">
              {Array.isArray(post.content) ? (
                post.content.map((block: any, idx: number) => {
                  if (typeof block === "string") {
                    return (
                      <div
                        key={idx}
                        className="text-gray-800 leading-relaxed text-justify [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-gray-900 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6 [&>li]:mb-2 [&>li]:text-gray-700"
                        dangerouslySetInnerHTML={{ __html: block }}
                      />
                    );
                  } else if (block && block.type === "quote") {
                    return (
                      <blockquote
                        key={idx}
                        className="border-l-4 border-orange-500 pl-6 py-4 italic my-8 text-gray-800 bg-orange-50/20 font-serif text-lg sm:text-xl rounded-r-xl shadow-sm"
                      >
                        &ldquo;{block.text}&rdquo;
                      </blockquote>
                    );
                  }
                  return null;
                })
              ) : (
                <div
                  className="text-gray-800 leading-relaxed text-justify [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-gray-900 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6 [&>li]:mb-2 [&>li]:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </div>

            {/* Premium Interactive Like Widget */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-y border-gray-100 my-10">
              <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
                Was this article helpful to you?
              </span>
              <button
                onClick={handleLike}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${isLiked
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <span>{isLiked ? "❤️" : "🤍"}</span>
                <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
              </button>
            </div>

            {/* Tags */}
            <div className="mt-8">
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className="font-bold text-xs uppercase tracking-wider text-gray-400 mr-2">Tags:</span>
                {(post.tags ?? []).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16 border-t border-gray-100 pt-12">
              <h3 className="font-sans font-extrabold text-gray-900 text-xl sm:text-2xl mb-8 tracking-tight text-center sm:text-left">
                Related Articles You Might Enjoy
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recent.slice(0, 3).map((r) => (
                  <Link
                    key={r.id}
                    href={`/blogs/${r.slug || r.id}`}
                    className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-44 overflow-hidden bg-gray-50">
                      <Image
                        src={r.imageUrl}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="font-sans font-bold text-gray-900 text-sm mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors leading-snug">
                        {r.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 mt-auto">
                        <span>⏱️ {r.readTime}</span>
                        <span>
                          {r.createdAt ? new Date(r.createdAt).getFullYear() : ""}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore More Container */}
            <div className="mt-12 bg-gradient-to-br from-orange-500 to-red-600 p-8 sm:p-10 rounded-3xl text-white shadow-xl shadow-orange-500/20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -z-10" />
              <h3 className="font-sans font-extrabold text-white text-2xl sm:text-3xl mb-3">
                Ready to Explore More?
              </h3>
              <p className="text-orange-50 text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed">
                Dive deeper into our collection of articles and discover strategies to fuel your digital growth.
              </p>
              <Link
                href="/blogs"
                className="inline-block bg-white text-orange-600 hover:bg-orange-50 rounded-full font-bold px-8 py-3.5 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-sm tracking-wide"
              >
                BROWSE ALL ARTICLES
              </Link>
            </div>
          </article>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6 lg:col-span-1">

            {/* Table of Contents */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-sans font-bold text-gray-900 text-sm uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                In This Article
              </h3>
              <div className="space-y-2">
                {[
                  "Introduction",
                  "Key Insights",
                  "Main Discussion",
                  "Case Studies",
                  "Conclusion",
                  "Future Outlook",
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={`#section-${index}`}
                    className="block text-sm text-gray-600 hover:text-orange-500 hover:translate-x-1 transition-all py-1.5 border-b border-gray-50 last:border-b-0 font-medium"
                  >
                    • {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Stories */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-sans font-bold text-gray-900 text-sm uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                Trending Stories
              </h3>
              <div className="space-y-4">
                {recent.slice(0, 3).map((r) => (
                  <Link
                    key={r.id}
                    href={`/blogs/${r.slug || r.id}`}
                    className="block group"
                  >
                    <p className="font-sans font-bold text-gray-800 text-sm group-hover:text-orange-500 transition-colors leading-snug line-clamp-2 mb-1.5">
                      {r.title}
                    </p>
                    <div className="text-[10px] font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wide">
                      <span>⏱️ {r.readTime}</span>
                      <span>•</span>
                      <span>
                        {r.createdAt ? new Date(r.createdAt).getFullYear() : ""}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-sans font-bold text-gray-900 text-sm uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Technology",
                  "Design",
                  "Business",
                  "Innovation",
                  "Startup",
                  "AI",
                  "Future",
                  "Trends",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-100 transition-all cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

