"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function StallGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".gallery-card");

    gsap.from(cards, {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });
  }, []);

  const galleryImages = [
    "https://picsum.photos/id/1011/600/500",
    "https://picsum.photos/id/1015/600/500",
    "https://picsum.photos/id/1024/600/500",
    "https://picsum.photos/id/1033/600/500",
    "https://picsum.photos/id/1042/600/500",
    "https://picsum.photos/id/1050/600/500",
    "https://picsum.photos/id/1062/600/500",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-white text-center overflow-hidden"
    >
      {/* Heading */}
      <div className="mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0a1b3d] mb-4">
          Explore Our Projects{" "}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience how we turn ideas into impactful spaces through creativity,
          precision, and design excellence.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-8">
        {/* Row 1 - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.slice(0, 2).map((img, i) => (
            <div
              key={i}
              className="gallery-card relative overflow-hidden rounded-md cursor-pointer group"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Gallery ${i + 1}`}
                width={600}
                height={400}
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-orange-500/90 transition-all duration-500 ease-in-out"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                <div className="bg-white rounded-full p-3 text-orange-500">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.slice(2, 5).map((img, i) => (
            <div
              key={i + 2}
              className="gallery-card relative overflow-hidden rounded-md cursor-pointer group"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Gallery ${i + 3}`}
                width={600}
                height={400}
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-orange-500/90 transition-all duration-500 ease-in-out"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                <div className="bg-white rounded-full p-3 text-orange-500">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 3 - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.slice(5, 7).map((img, i) => (
            <div
              key={i + 5}
              className="gallery-card relative overflow-hidden rounded-md cursor-pointer group"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Gallery ${i + 6}`}
                width={600}
                height={400}
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-orange-500/90 transition-all duration-500 ease-in-out"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                <div className="bg-white rounded-full p-3 text-orange-500">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Popup / Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-all duration-500"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full mx-auto p-6">
            <Image
              src={selectedImage}
              alt="Selected"
              width={1000}
              height={700}
              className="rounded-md object-contain w-full h-auto"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2 hover:bg-orange-500 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
