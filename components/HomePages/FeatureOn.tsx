"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FeatureOn() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://framerusercontent.com/images/fTuo3BLBmOawEBlfHheYjKQTiw.png",
    "https://framerusercontent.com/images/fNOds6IzgpH9sSMRox1ZSkRey4.png",
    "https://framerusercontent.com/images/dRJf5fbNxWW47wpQ0vMbV5ti8.png",
    "https://framerusercontent.com/images/wFhSRGxJ8ejJqjKT5AWYWv68fc.png?scale-down-to-512",
    "https://framerusercontent.com/images/Yc0S4Pr57a8sH1xKcO2sVcywvp4.png",
    "https://framerusercontent.com/images/YmTJNLgBckX8euQ3jOjchFUXxYc.png",
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const totalWidth = marquee.scrollWidth / 3; // corrected to match 3x images

      gsap.fromTo(
        marquee,
        { x: 0 },
        {
          x: -totalWidth,
          duration: 40,
          ease: "linear",
          repeat: -1,
        }
      );
    }
  }, []);

  return (
    <section className=" flex flex-col justify-center items-center mt-10 py-10 overflow-hidden">
      <h2 className="text-7xl font-bold text-center mb-8">Featured On</h2>

      <div className="overflow-hidden max-w-4xl w-full">
        <div
          ref={marqueeRef}
          className="flex space-x-10 whitespace-nowrap w-max"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Repeat images 3 times for smooth infinite scroll */}
          {[...images, ...images, ...images].map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Featured ${index + 1}`}
              className="h-6 object-contain inline-block select-none"
              draggable={false}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
