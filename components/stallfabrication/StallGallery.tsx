"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, X, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function StallGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // GSAP animation removed to fix visibility issue
    // const cards = section.querySelectorAll(".gallery-card");
  }, []);

  const galleryVideos = [
    {
      id: 1,
      videoUrl:
        "https://res.cloudinary.com/dr9gcshs6/video/upload/v1770379990/DJI_0077_nsgtck.mp4",
    },
    {
      id: 2,
      videoUrl:
        "https://res.cloudinary.com/dr9gcshs6/video/upload/v1770380969/DJI_0279_zmivt1.mp4",
    },
    {
      id: 3,
      videoUrl:
        "https://res.cloudinary.com/dr9gcshs6/video/upload/v1770380790/DJI_0196_vjre5k.mp4",
    },
    {
      id: 4,
      videoUrl:
        "https://res.cloudinary.com/dr9gcshs6/video/upload/v1770381291/DJI_0289_kynpc3.mp4",
    },
    {
      id: 5,
      videoUrl:
        "https://res.cloudinary.com/dr9gcshs6/video/upload/v1770381532/DJI_0682_upzxuq.mp4",
    },
    {
      id: 6,
      videoUrl:
        "https://res.cloudinary.com/dr9gcshs6/video/upload/v1770380542/DJI_0292_xlylk9.mp4",
    },
    {
      id: 7,
      videoUrl:
        "https://res.cloudinary.com/dr9gcshs6/video/upload/v1770380417/C3795_r22vlm.mp4",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-white text-center overflow-hidden"
    >
      {/* Heading */}
      <div className="mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900  mb-4">
          Explore Our Projects{" "}
        </h2>
        <p className="text-neutral-600  max-w-2xl mx-auto">
          Experience how we turn ideas into impactful spaces through creativity,
          precision, and design excellence.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-8">
        {/* Row 1 - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryVideos.slice(0, 2).map((item, i) => (
            <div
              key={i}
              className="gallery-card relative overflow-hidden rounded-md cursor-pointer group"
              onClick={() => setSelectedVideo(item.videoUrl)}
            >
              <video
                src={item.videoUrl}
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                // autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-orange-500/90 transition-all duration-500 ease-in-out"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                <div className="bg-white rounded-full p-4 text-orange-500 shadow-lg">
                  <Play className="w-8 h-8 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryVideos.slice(2, 5).map((item, i) => (
            <div
              key={i + 2}
              className="gallery-card relative overflow-hidden rounded-md cursor-pointer group"
              onClick={() => setSelectedVideo(item.videoUrl)}
            >
              <video
                src={item.videoUrl}
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                // autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-orange-500/90 transition-all duration-500 ease-in-out"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                <div className="bg-white rounded-full p-4 text-orange-500 shadow-lg">
                  <Play className="w-8 h-8 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 3 - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryVideos.slice(5, 7).map((item, i) => (
            <div
              key={i + 5}
              className="gallery-card relative overflow-hidden rounded-md cursor-pointer group"
              onClick={() => setSelectedVideo(item.videoUrl)}
            >
              <video
                src={item.videoUrl}
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                // autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-orange-500/90 transition-all duration-500 ease-in-out"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                <div className="bg-white rounded-full p-4 text-orange-500 shadow-lg">
                  <Play className="w-8 h-8 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal / Lightbox */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 transition-all duration-500 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-5xl mx-auto p-4 md:p-8">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black">
              <video
                src={selectedVideo}
                className="w-full h-full object-contain"
                controls
                // autoPlay
                playsInline
              />
            </div>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 md:-top-10 md:-right-4 text-white hover:text-orange-500 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
