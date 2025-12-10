"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true, // lock screen during zoom
        },
      });

      tl.fromTo(
        videoRef.current,
        { scale: 1 },
        { scale: 1.2, ease: "none", duration: 2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765181946/Banner_1_igaers.mp4"
        className="
          absolute top-0 left-0 
          w-full h-full 
          object-cover 
          will-change-transform 
          
          /* Mobile handling */
          md:object-contain
        "
        autoPlay
        muted
        playsInline
      />
    </section>
  );
}
