"use client";

import React, { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBlogs, Blog } from "@/lib/queries/blogs";
import { blogs as fallbackBlogs } from "@/data/blogs";

gsap.registerPlugin(ScrollTrigger);

export default function BlogsCard() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".news-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { data, isLoading } = useBlogs(1, 3);

  const visibleBlogs = useMemo(() => {
    const source = data?.blogs?.length ? data.blogs : fallbackBlogs;
    return source.slice(0, 3).map((post) => {
      const apiPost = post as Partial<Blog>;
      const image =
        ("cover" in post && post.cover) ||
        apiPost.imageUrl ||
        "/placeholder.svg";
      const description =
        apiPost.description || ("excerpt" in post ? post.excerpt : "") || "";
      const author =
        apiPost.author ||
        ("author" in post ? post.author : "Maven Advert Team");
      const createdAt = apiPost.createdAt
        ? new Date(apiPost.createdAt).toLocaleDateString()
        : "date" in post
        ? post.date
        : "—";
      const slug = apiPost.slug || post.id?.toString() || "";

      return {
        id: apiPost.id || post.id?.toString() || slug,
        title: post.title,
        author,
        date: createdAt,
        readTime: apiPost.readTime || ("readTime" in post ? post.readTime : ""),
        excerpt: description,
        image,
        slug,
      };
    });
  }, [data?.blogs]);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      {/* Header */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          Our Latest News
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
          Stay updated with trends, products, and insights from our team.
        </p>

        {isLoading && (
          <p className="text-sm text-orange-500 mt-3">
            Fetching the newest stories...
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {visibleBlogs.map((post) => (
          <article
            key={post.id}
            className="news-card bg-white rounded-none shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-64 overflow-hidden group">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center text-sm text-gray-500 mb-3 gap-2 flex-wrap">
                <span className="flex items-center gap-1">
                  👤 {post.author}
                </span>
                <span>•</span>
                <span>📅 {post.date}</span>
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-3 hover:text-orange-500 transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm mb-5 line-clamp-3 flex-grow">
                {post.excerpt}
              </p>

              <Link
                href={`/blogs/${post.id}`}
                className="text-orange-500 text-sm font-medium hover:underline mt-auto"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
