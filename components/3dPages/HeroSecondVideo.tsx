"use client";

import React from "react";

export default function HeroSecondVideo() {
  return (
    <div className="relative w-full md:h-screen h-[50vh] overflow-hidden">
      {/* <h1 className="text-center font-bold text-3xl md:text-6xl">Heading</h1> */}
      <video
        src="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765181958/Banner_2_eu3beu.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-20 left-0 w-full h-full md:object-cover object-contain"
      />
    </div>
  );
}
