"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamResult() {
  const lineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the orange line to 90% width
      gsap.fromTo(
        lineRef.current,
        { width: "0%" },
        {
          width: "90%",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // animation starts when section enters view
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate text fade-up
      gsap.from(".fade-up", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-start justify-between gap-12 overflow-hidden"
    >
      {/* Left Side */}
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight fade-up">
          We&apos;ve amazing skills for <br /> marketing agency.
        </h1>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex flex-col gap-8">
        {/* Orange line with animation */}
        <div className="relative w-full h-[4px] bg-gray-200">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-full bg-orange-500"
          ></div>
        </div>

        {/* Paragraphs */}
        <p className="text-lg text-gray-700 font-medium fade-up">
          Value for results
        </p>
        <p className="text-lg text-gray-700 font-medium fade-up">
          Global experience
        </p>
      </div>
    </section>
  );
}
