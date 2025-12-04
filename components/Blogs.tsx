"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Blogs() {
  const sectionRef = useRef(null);

  const newsData = [
    {
      img: "https://images.pexels.com/photos/16642613/pexels-photo-16642613.jpeg",
      author: "Endrit Smith",
      date: "Aug 1, 2021",
      title: "The mind healing project that looks amazing",
      desc: "We help ambitious businesses like yours generate more profits",
      link: "#",
    },
    {
      img: "https://images.pexels.com/photos/33539853/pexels-photo-33539853.jpeg",
      author: "Endrit Smith",
      date: "Aug 1, 2021",
      title: "World’s largest construction projects are here",
      desc: "We help ambitious businesses like yours generate more profits",
      link: "#",
    },
    {
      img: "https://images.pexels.com/photos/34452022/pexels-photo-34452022.jpeg",
      author: "Endrit Smith",
      date: "Aug 1, 2021",
      title: "Best construction minds and amazing architecture",
      desc: "We help ambitious businesses like yours generate more profits",
      link: "#",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".news-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.3,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Latest News
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Stay updated with insights, trends, and stories that shape brands,
          experiences, and creative innovation at Maven Advert.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="news-card bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-md overflow-hidden"
          >
            <div className="w-full h-64 relative">
              <Image
                src={news.img}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-2">
                  <span className="text-orange-500">👤</span>
                  {news.author}
                </span>
                <span className="mx-2">•</span>
                <span>📅 {news.date}</span>
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-2 hover:text-orange-500 transition-colors cursor-pointer leading-snug">
                {news.title}
              </h3>

              <p className="text-gray-500 text-sm mb-4">{news.desc}</p>

              <Link
                href={news.link}
                className="text-orange-500 text-sm font-medium hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
