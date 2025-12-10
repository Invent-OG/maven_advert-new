"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Ruler, FileSpreadsheet } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Offering() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".offer-card");

    gsap.from(cards, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });
  }, []);

  const offerings = [
    {
      title: "Stall Fabrication​",
      description:
        "We offer custom exhibition stall fabrication in Tamil Nadu and South India, blending creativity, functionality, and precision to deliver stalls that enhance your brand presence at trade shows and expos.",
      icon: <Building2 className="w-10 h-10" />,
      img: "https://picsum.photos/id/1005/600/400",
      type: "image", // 1
    },
    {
      title: "Corporate Event Setups​",
      description:
        "Our corporate event fabrication services create stunning, brand-focused spaces for product launches, exhibitions, and business events, ensuring a seamless experience from concept to execution.",
      icon: <FileSpreadsheet className="w-10 h-10" />,
      img: "https://picsum.photos/id/1016/600/400",
      type: "content", // 2
    },
    {
      title: "Octanorm Stall​",
      description:
        "Maven Advert provides Octanorm stall fabrication and design services that are flexible, durable, and professional — ideal for exhibitions, trade fairs, and corporate displays across Tamil Nadu and South India.",
      icon: <Ruler className="w-10 h-10" />,
      img: "https://picsum.photos/id/1025/600/400",
      type: "image", // 3
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-[#f5f9fd] text-center overflow-hidden"
    >
      {/* Section Header */}
      <div className="mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900  mb-4">
          Services We’re Offering{" "}
        </h2>
        <p className="text-neutral-600  max-w-2xl mx-auto">
          At Maven Advert, we specialize in exhibition stall fabrication,
          corporate event setups, and Octanorm stall design — delivering
          creative, durable, and brand-focused solutions that make every space
          stand out.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 md:px-10">
        {offerings.map((offer, i) => (
          <div
            key={i}
            className="offer-card relative group overflow-hidden rounded-md shadow-lg cursor-pointer"
          >
            {/* For IMAGE-first cards */}
            {offer.type === "image" && (
              <>
                {/* Background Image */}
                <Image
                  src={offer.img}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-orange-500/90 transition-all duration-500"></div>
                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out px-8">
                  <div className="text-white mb-4">{offer.icon}</div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {offer.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-5">
                    {offer.description}
                  </p>
                  <button className="text-white font-medium underline underline-offset-4 hover:text-gray-200 transition-all">
                    Read More
                  </button>
                </div>
              </>
            )}

            {/* For CONTENT-first cards */}
            {offer.type === "content" && (
              <>
                {/* Default White Content */}
                <div className="bg-white h-full flex flex-col items-center justify-center p-10 transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-95 text-center">
                  <div className="text-orange-500 mb-4">{offer.icon}</div>
                  <h3 className="text-lg font-semibold text-neutral-900  mb-3">
                    {offer.title}
                  </h3>
                  <p className="text-neutral-600  text-sm mb-5">
                    {offer.description}
                  </p>
                  <button className="text-orange-500 font-medium underline underline-offset-4 hover:text-orange-600 transition-all">
                    Read More
                  </button>
                </div>

                {/* Hover State with Image */}
                <Image
                  src={offer.img}
                  alt={offer.title}
                  fill
                  className="object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-orange-500/90 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-700 px-8">
                  <div className="mb-4">{offer.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3">{offer.title}</h3>
                  <p className="text-white/90 text-sm mb-5">
                    {offer.description}
                  </p>
                  <button className="text-white font-medium underline underline-offset-4 hover:text-gray-200 transition-all">
                    Read More
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
