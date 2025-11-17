"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ZoomImg() {
  const fgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fg = fgRef.current;

    if (!fg) return;

    // Zoom in FG image on scroll
    gsap.to(fg, {
      scale: 1.8,
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
    <section className="relative md:h-[250vh] h-[80vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <Image
        src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/687198af2d225d8995c1f6cb_02-BG-min-p-1080.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Center text */}
      <div className="absolute inset-0 top-1/4  z-10 pointer-events-none">
        <h1 className="text-white text-center font-extrabold leading-tight uppercase tracking-tight drop-shadow-2xl md:text-[11vw] text-[12vw]">
          Humanize <br /> Your Brand
        </h1>
      </div>

      {/* Foreground image (animated zoom) */}
      <div
        ref={fgRef}
        className="absolute md:-bottom-50 bottom-0 left-0 w-full h-auto origin-center z-20"
      >
        <Image
          src="https://cdn.prod.website-files.com/63f9f100025c058594957cca/687199f9c3bbcdd42ab5f646_02-FG-min-p-1080.png"
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
