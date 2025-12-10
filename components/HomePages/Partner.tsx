"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  "https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651186/Clients_logo-07_fhw5hp.png",
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

function Partner() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      // Smooth scroll speed on mobile
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-white py-12 overflow-hidden">
      {/* MARQUEE TRACK */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-10 items-center whitespace-nowrap px-4"
        >
          {/* Render logos twice for seamless loop */}
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 opacity-90 hover:opacity-100 transition"
            >
              <Image
                src={logo}
                alt={`partner-${i}`}
                width={160}
                height={80}
                className="object-contain w-[120px] md:w-[160px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partner;
