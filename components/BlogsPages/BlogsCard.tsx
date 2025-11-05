"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogs } from "@/data/blogs";

gsap.registerPlugin(ScrollTrigger);

export default function BlogsCard() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".news-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.25,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      {/* Header */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Latest News
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Cards (3 only) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
        {blogs.slice(0, 3).map((post) => (
          <article
            key={post.id}
            className="news-card bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md overflow-hidden"
          >
            <div className="w-full h-64 relative">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-2">
                  <span className="text-orange-500">👤</span>
                  {post.author}
                </span>
                <span className="mx-2">•</span>
                <span>📅 {post.date}</span>
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-2 hover:text-orange-500 transition-colors cursor-pointer leading-snug">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>

              <Link
                href={`/blogs/${post.id}`}
                className="text-orange-500 text-sm font-medium hover:underline"
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
