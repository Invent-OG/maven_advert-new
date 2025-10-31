"use client";

import React from "react";

function Video() {
  return (
    <section className="relative w-full min-h-screen  overflow-hidden flex items-center justify-center">
      {/* --- Background Video --- */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source
          src="https://youtu.be/c5YdpZjW-dc?si=5HfbrKAbVs5hDXt3" // ← Replace with real video link
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </section>
  );
}

export default Video;
