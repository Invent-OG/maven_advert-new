"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function Partner() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765344977/ten_digit_logo_o4fhau.webp",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765344314/Interakt_logo_uywjgb.webp",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765344315/Zoho_partner_logo_lvdbrd.webp",
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      const totalWidth = marquee.scrollWidth / 3;

      gsap.fromTo(
        marquee,
        { x: 0 },
        {
          x: -totalWidth,
          duration: 10,
          ease: "linear",
          repeat: -1,
        }
      );
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex flex-col justify-start items-center overflow-hidden ">
      {/* ===== PROFESSIONAL HEADING ===== */}
      <h2
        className="absolute text-3xl md:text-4xl font-semibold  text-neutral-900  text-center"
        data-aos="fade-up"
      >
        Platform Partners{" "}
      </h2>

      {/* ===== LOGO MARQUEE ===== */}
      <div className="overflow-hidden max-w-4xl w-full">
        <div
          ref={marqueeRef}
          className="flex space-x-18 whitespace-nowrap w-max"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {[...images, ...images, ...images].map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Featured ${index + 1}`}
              className={`
                object-contain inline-block select-none
                ${src.includes("ten_digit_logo") ? "scale-100" : "scale-100"}
              `}
              width={180}
              height={10}
              draggable={false}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
