
"use client";

import { useBlog, useBlogs } from "@/lib/queries/blogs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function BlogsId() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);

  const { data, isLoading, isError } = useBlog(id as string);
  const { data: recentData } = useBlogs(1, 6, "", undefined);
  const recent = recentData?.blogs ?? [];

  const handleLike = () => {
    if (isLiked) setLikeCount(likeCount - 1);
    else setLikeCount(likeCount + 1);
    setIsLiked(!isLiked);
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );

  if (isError || !data?.blog)
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

  type PostType = typeof data.blog & { tags?: string[] };
  const post = data.blog as PostType;

  return (
    <div className="min-h-screen bg-white mt-10 overflow-x-hidden">
      {/* Header */}
      <header className="border-b-2 border-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-4 relative">
          
          <div className="pt-8 text-center">
            <div className="w-20 h-1 bg-gray-900 mx-auto mb-4"></div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight mx-auto max-w-2xl">
              {post.title}
            </h1>
            
          </div>
          
        </div>
        <Link
             href="/blogs"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              BACK TO ARTICLES →
            </Link>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* MAIN CONTENT */}
          <article className="lg:col-span-3">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-8 border-b pb-4">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="font-semibold">
                  BY {post.author?.toUpperCase()}
                </span>
                <span>•</span>
                <span>
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </span>
                <span>•</span>
                <span>{post.readTime} READ</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  LIVE
                </span>
                <span className="text-gray-500">Updated recently</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8 border border-gray-300 bg-white">
              <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-4 text-sm text-gray-600 border-t border-gray-300 flex justify-between items-center">
                <span>Featured image for {post.title}</span>
                <span className="text-xs text-gray-500">
                  Photo: Editorial Team
                </span>
              </div>
            </div>

            {/* LIKE ONLY (Share + Comment Removed) */}
            <div className="flex items-center justify-start mb-8 p-4 bg-gray-50 border border-gray-200">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`text-lg ${
                    isLiked ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {isLiked ? "❤️" : "🤍"}
                </span>
                <span
                  className={`font-semibold ${
                    isLiked ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  {likeCount}
                </span>
              </button>
            </div>

            {/* Article Summary */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
              <h3 className="font-serif font-bold text-gray-900 text-lg mb-3">
                ARTICLE SUMMARY
              </h3>
              <p className="text-gray-700 leading-6">
                This comprehensive exploration delves into the key aspects of
                modern content creation, offering insights and practical advice
                for writers and creators looking to make an impact in
                today&apos;s digital landscape.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {Array.isArray(post.content) ? (
                post.content.map((block: string, idx: number) => (
                  <div
                    key={idx}
                    className="text-gray-700 leading-7 text-justify font-serif text-lg [&>p]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-5 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: block }}
                  />
                ))
              ) : (
                <div
                  className="text-gray-700 leading-7 text-justify font-serif text-lg [&>p]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-5 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>li]:mb-2"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </div>

            {/* Tags */}
            <div className="border-t border-gray-300 pt-8 mt-12">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="font-semibold text-gray-900">Tags:</span>
                {(post.tags ?? []).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16 border-t border-gray-300 pt-12">
              <h3 className="font-serif font-bold text-gray-900 text-2xl mb-8 text-center">
                RELATED ARTICLES YOU MIGHT ENJOY
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recent.slice(0, 3).map((r) => (
                  <Link
                    key={r.id}
                    href={`/blogs/${r.id}`}
                    className="group border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={r.imageUrl}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-800 transition-colors">
                        {r.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{r.readTime}</span>
                        <span>
                          {r.createdAt
                            ? new Date(r.createdAt).getFullYear()
                            : ""}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore More */}
            <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border border-blue-200">
              <h3 className="font-serif font-bold text-gray-900 text-2xl mb-4 text-center">
                READY TO EXPLORE MORE?
              </h3>
              <p className="text-gray-700 text-center mb-6 max-w-2xl mx-auto">
                Dive deeper into our collection of articles and discover more
                insights that matter to you.
              </p>
              <div className="text-center">
                <Link
                  href="/blogs"
                  className="inline-block bg-gray-900 text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
                >
                  BROWSE ALL ARTICLES
                </Link>
              </div>
            </div>
          </article>

          {/* RIGHT SIDEBAR (ASIDE restored) */}
          <aside className="space-y-8 order-last lg:order-last lg:col-span-1">
            {/* Table of Contents */}
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="font-serif font-bold text-gray-900 text-lg mb-4 border-b pb-2">
                IN THIS ARTICLE
              </h3>
              <div className="space-y-3">
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
                    className="block text-sm text-gray-700 hover:text-blue-800 transition-colors py-1 border-b border-gray-100 last:border-b-0"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Stories */}
            <div className="border border-gray-300 p-6">
              <h3 className="font-serif font-bold text-gray-900 text-lg mb-4 border-b pb-2">
                TRENDING STORIES
              </h3>
              <div className="space-y-6">
                {recent.slice(0, 3).map((r) => (
                  <Link
                    key={r.id}
                    href={`/blogs/${r.id}`}
                    className="block group"
                  >
                    <p className="font-serif text-gray-900 group-hover:text-blue-800 leading-tight text-sm mb-2 line-clamp-2">
                      {r.title}
                    </p>
                    <div className="text-xs text-gray-600 flex items-center gap-2">
                      <span>{r.readTime}</span>
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
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="font-serif font-bold text-gray-900 text-lg mb-4 border-b pb-2">
                POPULAR TAGS
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
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
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

