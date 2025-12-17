"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function FeatureOn() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651186/Clients_logo-07_fhw5hp.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1765353428/OG_logo_black_xortdx.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651182/Clients_logo-11_nezn6z.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651182/Clients_logo-10_sssxoy.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651179/Clients_logo-08_lkpkoc.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651170/Clients_logo-03_a0ys49.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651167/Clients_logo-05_ia3u2t.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651162/Clients_logo-09_bp5pzt.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651159/Clients_logo-06_iuh7kf.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651155/Clients_logo-02_ilg12c.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651151/Clients_logo-01_et7hay.png",
    "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651148/Clients_logo-04_dkdqyj.png",
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      const totalWidth = marquee.scrollWidth / 3; // corrected to match 3x images

      gsap.fromTo(
        marquee,
        { x: 0 },
        {
          x: -totalWidth,
          duration: 30,
          ease: "linear",
          repeat: -1,
        }
      );
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className=" flex flex-col justify-center items-center mt-10 py-10 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-semibold  text-neutral-900  text-center mb-8">
        Brands We Work With
      </h2>

      <div className="overflow-hidden max-w-4xl w-full">
        <div
          ref={marqueeRef}
          className="flex space-x-10 whitespace-nowrap w-max"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Repeat images 3 times for smooth infinite scroll */}
          {[...images, ...images, ...images].map((src, index) => (
            // <img
            //   key={index}
            //   src={src}
            //   alt={`Featured ${index + 1}`}
            //   className="h-24 object-contain inline-block select-none"
            //   draggable={false}
            // />

            <Image
              key={index}
              src={src}
              alt={`Featured ${index + 1}`}
              className="h-32 object-contain inline-block select-none"
              width={180}
              height={180}
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
