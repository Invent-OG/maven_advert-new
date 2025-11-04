"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Mail, Globe, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Designers() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (el) {
      gsap.fromTo(
        el.querySelectorAll(".designer-card"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center justify-center py-24 bg-white text-center"
    >
      {/* Title */}
      <h2 className="text-5xl md:text-9xl font-extrabold text-black leading-tight">
        CONNECT WITH <br /> THE DESIGNERS
      </h2>

      {/* Subtitle */}
      <p className="mt-6 text-gray-500 text-sm md:text-base max-w-lg">
        Want to learn more, request more content, interview us, or just chat?
        We’d love to connect. Reach out if you want!
      </p>

      {/* Designers List */}
      <div className="mt-12 flex flex-col gap-6 w-full max-w-sm">
        {/* Designer 1 */}
        <div className="designer-card flex items-center justify-between bg-white  rounded-xl shadow-sm hover:shadow-md transition-all p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
                alt="Will Rust"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-sm text-black tracking-wide">
                WILL RUST
              </h3>
              <p className="text-xs text-gray-500">Visual Designer</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-600">
            <a href="#" className="hover:text-black transition">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-black transition">
              <Globe size={18} />
            </a>
            <a
              href="mailto:will@design.com"
              className="hover:text-black transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Designer 2 */}
        <div className="designer-card flex items-center justify-between bg-white  rounded-xl shadow-sm hover:shadow-md transition-all p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                alt="Eve Weinberg"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-sm text-black tracking-wide">
                EVE WEINBERG
              </h3>
              <p className="text-xs text-gray-500">Head of Design</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-600">
            <a href="#" className="hover:text-black transition">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-black transition">
              <Globe size={18} />
            </a>
            <a
              href="mailto:eve@design.com"
              className="hover:text-black transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
