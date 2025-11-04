"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

export default function StallHero() {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center lg:text-left px-6 md:px-16 lg:px-28 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://stunning-buttercream-accb8c.netlify.app/assets/images/home1/banner/bg.jpg')",
      }}
    >
      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 py-20 lg:py-32">
        {/* Left Content */}
        <div className="max-w-xl text-[#0a1b3d]">
          <p className="text-orange-500 font-semibold text-sm md:text-base mb-3">
            Simple & Secure Payment Process
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Giving Awesome Building <br />
            <span className="text-[#0a1b3d]">Ideas Fresh Start</span>
          </h1>

          <p className="text-gray-600 text-base md:text-lg mt-6 mb-10">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300">
              Free Analysis <span className="text-lg">→</span>
            </button>

            <button className="flex items-center gap-3 text-[#0a1b3d] font-semibold group">
              <div className="bg-orange-500 w-14 h-14 rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-all duration-300">
                <Play className="w-6 h-6 fill-white" />
              </div>
              How We Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
