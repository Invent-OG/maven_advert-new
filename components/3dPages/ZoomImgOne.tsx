"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ZoomImgOne() {
  const fgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fg = fgRef.current;

    if (!fg) return;

    // Zoom in FG image on scroll
    gsap.to(fg, {
      scale: 1.4,
      ease: "none",
      scrollTrigger: {
        trigger: fg,
        start: "top bottom", // start when it enters viewport
        end: "bottom top", // end when scrolled past
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative md:h-[200vh] h-[80vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <Image
        src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/6871af908e4d6a811dfc40f0_03-BG-min-p-1080.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Center text */}
      <div className="absolute inset-0 top-10  z-10 pointer-events-none">
        <h1 className="text-white text-center font-extrabold leading-tight uppercase tracking-tight drop-shadow-2xl md:text-[11vw] text-[12vw]">
          Free <br /> Wallpapers
        </h1>
      </div>

      {/* Foreground image (animated zoom) */}
      <div
        ref={fgRef}
        className="absolute md:bottom-10 bottom-10 left-0 w-full h-auto origin-center z-20 scale-[0.6]"
      >
        <Image
          src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/6871af9dfaa40ca04befb5fb_03-Full-FG-min.png"
          alt="Foreground"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </section>
  );
}
