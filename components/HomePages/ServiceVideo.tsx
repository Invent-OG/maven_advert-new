"use client";
import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ServiceVideo() {
  // AOS initialized globally

  return (
    <div className="flex  mb-10 items-center justify-center w-full px-4">
      <div 
        data-aos="fade-down"
        className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200/20 bg-gray-900"
      >
        {/* Browser Window Header */}
        <div className="h-10 bg-[#1a1a1a] border-b border-gray-800 flex items-center px-4 space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>

        {/* Video Content */}
        <div className="relative aspect-video ">
          <video
            src="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765961218/2_1_r7hw2c.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceVideo;
