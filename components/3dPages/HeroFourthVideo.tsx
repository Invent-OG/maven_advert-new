"use client";

import React from "react";

export default function HeroFourthVideo() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765181947/3d_character_Animation_jqm2sa.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Optional overlay example */}
      {/* <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-7xl font-bold">
          3D Character Animation
        </h1>
      </div> */}
    </div>
  );
}
