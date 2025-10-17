"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col py-12 md:py-24 items-center justify-center bg-gradient-to-b from-[#1a3c8b] via-[#000000] to-black text-white text-center px-4 sm:px-6 md:px-8"
    >
      {/* Top Text */}
      <p className="text-[10px] sm:text-xs py-2 sm:py-4 tracking-wide uppercase mb-2 sm:mb-3 opacity-80">
        Join thousands on PopSite™
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold max-w-full sm:max-w-2xl md:max-w-3xl leading-snug">
        The easiest way to <br /> build a stunning personal site.
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-300 mt-2 sm:mt-3 max-w-full sm:max-w-lg px-2 sm:px-0">
        No complicated tools or hidden fees—just a fast, free way to create a
        stunning site in minutes. Professional results in just 60 seconds.
      </p>

      {/* Video Section */}
      <div className="mt-8 sm:mt-12 relative w-full max-w-full sm:max-w-4xl px-2 sm:px-0">
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-black">
          <iframe
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&mute=0&loop=1&playlist=dQw4w9WgXcQ"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Video;
