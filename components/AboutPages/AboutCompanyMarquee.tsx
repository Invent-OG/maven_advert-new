"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutCompanyMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      if (!marquee) return;
      const totalWidth = marquee.scrollWidth / 2;

      gsap.fromTo(
        marquee,
        { x: 0 },
        {
          x: -totalWidth,
          duration: 15,
          ease: "none",
          repeat: -1,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const logos = [
    "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/logo-netflix-dark-gray.svg",
    "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/logo-pingdom-dark-gray.svg",
    "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2024/01/logo-paypal-dark-gray.svg",
    "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/logo-walmart-dark-gray.svg",
    "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/logo-amazon-dark-gray.svg",
    "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/logo-logitech-dark-gray.svg",
    "https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/logo-pingdom-dark-gray.svg",
  ];

  return (
    <section className="w-full mb-10 bg-white py-12">
      {/* The container that restricts width */}
      <div className="relative mx-auto max-w-6xl overflow-hidden flex items-center justify-center">
        {/* The animated marquee */}
        <div
          ref={marqueeRef}
          className="flex gap-16 whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Company logo ${index}`}
              className="h-10 w-auto object-contain  transition-opacity duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
