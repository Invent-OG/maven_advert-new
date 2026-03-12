"use client";

import React, { useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function HeroThirdVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(e => console.log("Auto-play prevented", e));
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.1 } // Play when 10% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  const isInView = useInView(containerRef, { margin: "200px 0px" });

  useLayoutEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
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

  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765181947/Architectural_Walkthroughs_zyns0h.mp4"
        poster="https://res.cloudinary.com/dr9gcshs6/video/upload/v1765181947/Architectural_Walkthroughs_zyns0h.jpg"
        loop
        muted
        playsInline
        preload="none"
        className="absolute top-0 left-0 w-full h-full md:object-contain object-cover"
      />
    </div>
  );
}
