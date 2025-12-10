"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export default function HeroSecondVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px" });

  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="relative w-full md:h-screen h-[50vh] overflow-hidden"
    >
      {/* <h1 className="text-center font-bold text-3xl md:text-6xl">Heading</h1> */}
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765181958/Banner_2_eu3beu.mp4"
        poster="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765181958/Banner_2_eu3beu.jpg"
        loop
        muted
        playsInline
        preload="none"
        className="absolute top-20 left-0 w-full h-full md:object-cover object-contain"
      />
    </div>
  );
}
