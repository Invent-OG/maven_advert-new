"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const textWidth = marquee.scrollWidth / 2;

    gsap.to(marquee, {
      x: `-${textWidth}px`,
      duration: 15,
      ease: "none",
      repeat: -1,
    });
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <section
      data-aos="fade-up"
      className="w-full overflow-hidden bg-white py-10"
    >
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap text-[8vw] font-extrabold"
      >
        <span className="text-neutral-800 bg-white px-6">Innovation</span>
        <span
          className="text-white px-6"
          style={{ WebkitTextStroke: "1px #666", color: "transparent" }}
        >
          Excellence
        </span>
        <span className="text-neutral-800 bg-white px-6">thinking</span>
        <span
          className="text-white px-6"
          style={{ WebkitTextStroke: "1px #666", color: "transparent" }}
        >
          Resonance
        </span>
        <span className="text-neutral-800 bg-white px-6">thinking</span>
        {/* <span
          className="text-white px-6"
          style={{ WebkitTextStroke: "1px black", color: "transparent" }}
        >
          amazing
        </span> */}
      </div>
    </section>
  );
}
