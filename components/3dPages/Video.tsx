"use client";

import React from "react";

function Video() {
  return (
    <section className="relative w-full   min-h-screen overflow-hidden flex items-center justify-center bg-black px-6 py-20 md:px-16 lg:px-24">
      {/* --- Background YouTube Video --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/c5YdpZjW-dc?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=c5YdpZjW-dc&modestbranding=1"
          title="Background Video"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}

export default Video;
