"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-text-line",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
        }
      )
        .fromTo(
          ".hero-subtext",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-badge",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center px-6 md:px-20 py-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-8 overflow-hidden">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">
              Available for new projects
            </span>
          </div>
        </div>

        <h1 ref={textRef} className="text-5xl md:text-8xl font-bold leading-[1.1] tracking-tight mb-8">
          <div className="overflow-hidden">
            <div className="hero-text-line">Crafting Digital</div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-text-line text-gray-500">Experiences That</div>
          </div>
          <div className="overflow-hidden">
            <div className="hero-text-line">Define Brands.</div>
          </div>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-12">
          <p className="hero-subtext text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
            We build premium, high-performance websites that blend aesthetic
            excellence with cutting-edge technology.
          </p>

          <button className="hero-subtext group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors">
            Start a Project
            <ArrowDownRight className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
