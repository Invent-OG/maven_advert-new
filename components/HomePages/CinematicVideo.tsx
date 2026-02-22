"use client";

import React, { useRef } from "react";
import "aos/dist/aos.css";

const CinematicVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex flex-col py-16 sm:py-20 md:py-24 items-center justify-center bg-black text-white text-center px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-black opacity-50 z-0"></div>

      <div className="z-10 flex flex-col items-center">
        {/* Heading */}
        <h2
          data-aos="fade-down"
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-full sm:max-w-4xl leading-tight"
        >
          Ultra-Premium Cinematic Experiences
        </h2>

        {/* Subtext */}
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-gray-300 text-sm sm:text-base md:text-lg mt-6 max-w-full sm:max-w-4xl px-2 sm:px-0 leading-relaxed"
        >
          At Maven Advert, we craft ultra-premium 3D cinematic experiences that
          redefine visual storytelling. Inspired by the adrenaline of F1 and the
          futuristic brilliance of Tron, speed and light converge over
          Coimbatore’s iconic GD Naidu Bridge, transforming the familiar into a
          sleek digital dimension. As reality dissolves into a high-tech visual
          universe, Maven Advert enters into 3D — elevating imagination into an
          immersive, next-generation spectacle.
        </p>

        {/* Video Section */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full max-w-full sm:max-w-6xl px-2 sm:px-0">
          <div
            data-aos="zoom-in"
            data-aos-delay="200"
            className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 border border-gray-800 bg-black relative"
          >
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://res.cloudinary.com/dr9gcshs6/video/upload/v1771553759/MAV_TRON_LANDSCAPE_wrmrii.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicVideo;
