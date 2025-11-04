"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const gangMembers = [
  {
    name: "MOJO",
    main: "https://images.pexels.com/photos/29325065/pexels-photo-29325065.jpeg",
    variations: [
      "https://images.pexels.com/photos/34447498/pexels-photo-34447498.jpeg",
      "https://images.pexels.com/photos/18884939/pexels-photo-18884939.jpeg",
      "https://images.pexels.com/photos/18983802/pexels-photo-18983802.jpeg",
      "https://images.pexels.com/photos/29325065/pexels-photo-29325065.jpeg",
    ],
  },
  {
    name: "MAX",
    main: "https://images.pexels.com/photos/34505700/pexels-photo-34505700.jpeg",
    variations: [
      "https://images.pexels.com/photos/34505700/pexels-photo-34505700.jpeg",
      "https://images.pexels.com/photos/29325065/pexels-photo-29325065.jpeg",
      "https://images.pexels.com/photos/34447498/pexels-photo-34447498.jpeg",
      "https://images.pexels.com/photos/18884939/pexels-photo-18884939.jpeg",
    ],
  },
  {
    name: "MAMMOTH",
    main: "https://images.pexels.com/photos/18884939/pexels-photo-18884939.jpeg",
    variations: [
      "https://images.pexels.com/photos/18884939/pexels-photo-18884939.jpeg",
      "https://images.pexels.com/photos/29325065/pexels-photo-29325065.jpeg",
      "https://images.pexels.com/photos/34505700/pexels-photo-34505700.jpeg",
      "https://images.pexels.com/photos/34447498/pexels-photo-34447498.jpeg",
    ],
  },
];

export default function MeetGang() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      const images = card.querySelectorAll(".variation");
      const main = card.querySelector(".main-card");

      const tl = gsap.timeline({ paused: true });
      gsap.set(images, { opacity: 0, scale: 0, y: 0, x: 0, rotation: 0 });

      // fan out animation (like screenshot)
      tl.to(main, {
        scale: 1.1,
        duration: 0.4,
        ease: "power3.out",
        boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
      });

      tl.to(
        images,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.08,
          onUpdate: () => {
            images.forEach((img, i) => {
              const total = images.length;
              const spread = 90; // fan spread
              const offset = -spread / 2 + (spread / (total - 1)) * i;
              const radius = 120;
              gsap.set(img, {
                x: Math.cos((offset * Math.PI) / 180) * radius,
                y: -Math.sin((offset * Math.PI) / 180) * 60,
                rotation: offset / 3,
              });
            });
          },
        },
        "<"
      );

      tl.to(
        images,
        {
          y: "+=10",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
        },
        "<"
      );

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());
    });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center py-24 overflow-hidden">
      <h1 className="text-6xl md:text-7xl font-extrabold text-center leading-tight text-black">
        MEET <br /> THE GANG
      </h1>
      <p className="text-gray-500 mt-3 text-sm text-center">
        (TIP: HOVER TO SEE AI VARIATIONS)
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-20 w-full max-w-4xl justify-items-center">
        {gangMembers.map((member, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className="relative group w-60 h-68 bg-white rounded-2xl shadow-lg overflow-visible flex flex-col items-center justify-end transition-all duration-300"
          >
            <div className="relative w-full h-72 rounded-t-2xl overflow-hidden main-card">
              <Image
                src={member.main}
                alt={member.name}
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>

            <h3 className="text-xl font-bold text-center py-4 z-10 bg-white w-full rounded-b-2xl">
              {member.name}
            </h3>

            {/* Hover Variations */}
            {member.variations.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt=""
                width={200}
                height={120}
                className="variation absolute rounded-xl shadow-lg border-1 border-white"
                style={{
                  bottom: "10%",
                  left: "10%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 5,
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
