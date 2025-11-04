"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const wallpapers = [
  "https://cdn.prod.website-files.com/63f9f100025c058594957cca/6875886801beddda347e4e8a_wallpaper-08-min-p-1600.png",
  "https://cdn.prod.website-files.com/63f9f100025c058594957cca/6875886790a5cce3b0279c02_wallpaper-02-min-p-1600.png",
  "https://cdn.prod.website-files.com/63f9f100025c058594957cca/68758868c2b208974319768c_wallpaper-03-min-p-1600.png",
  "https://cdn.prod.website-files.com/63f9f100025c058594957cca/687588688b516728ae842857_wallpaper-04-min-p-1600.png",
  "https://cdn.prod.website-files.com/63f9f100025c058594957cca/68758868575425bc8252e1ca_wallpaper-05-min-p-1600.png",
  "https://cdn.prod.website-files.com/63f9f100025c058594957cca/68758868ac4916751910bb37_wallpaper-06-min-p-1600.png",
  "https://cdn.prod.website-files.com/63f9f100025c058594957cca/68758867c581eb24a4b868d9_wallpaper-07-min-p-1600.png",
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const laptopRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Fade animation when wallpaper changes
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  // Entrance animation for the laptop
  useEffect(() => {
    if (laptopRef.current) {
      gsap.fromTo(
        laptopRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#07111A] text-white px-4 py-16">
      {/* Laptop Mockup */}
      <div
        ref={laptopRef}
        className="relative w-full max-w-6xl aspect-[16/9]  overflow-hidden "
      >
        {/* Wallpaper Image */}
        <Image
          ref={imgRef}
          key={activeIndex}
          src={wallpapers[activeIndex]}
          alt="Desktop Wallpaper"
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex scrollbar-hide justify-center w-full mt-12">
        <div className="flex flex-nowrap gap-4 overflow-x-auto scrollbar-hide px-4 max-w-full md:max-w-4xl">
          {wallpapers.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-24 h-14 md:w-28 md:h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                activeIndex === i
                  ? "border-white scale-105"
                  : "border-gray-600 hover:border-gray-300"
              }`}
            >
              <Image
                src={src}
                alt={`Wallpaper ${i}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
