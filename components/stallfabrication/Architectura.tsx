"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ruler, Building2 } from "lucide-react";
import { LiquidButton } from "../ui/liquid-glass-button";
import { useRouter } from "next/navigation";
import { FaRocket } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Architectura() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const text = section.querySelectorAll(".fade-left");
    const image = section.querySelector(".fade-right");

    gsap.from(text, {
      x: -60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });

    gsap.from(image, {
      x: 60,
      opacity: 0,
      duration: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-white flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-16 lg:px-28 overflow-hidden"
    >
      {/* Left Content */}
      <div className="fade-left max-w-xl text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-snug">
          Redefining Stall Experiences <br /> with Maven Advert​
        </h2>

        <p className="text-neutral-600 text-base md:text-lg leading-relaxed mb-10">
          Maven Advert, a trusted name in exhibition stall fabrication across
          Tamil Nadu and South India, creates dynamic setups for corporate
          events and trade shows. We specialize in custom and Octanorm stall
          designs that blend innovation, functionality, and flawless execution.
        </p>

        {/* Feature Items */}
        <div className="space-y-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <Ruler className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-neutral-900 mb-1">
                Concept & Design Innovation​{" "}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                We merge creativity with strategy to design custom exhibition
                stalls that tell your brand story with purpose and impact.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-neutral-900 mb-1">
                Build & Beyond​{" "}
              </h3>
              <p className="text-neutral-600  text-sm leading-relaxed">
                From stall fabrication to installation, every detail is executed
                with precision — ensuring a seamless and memorable brand
                presence.
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        {/* <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-md flex items-center gap-2 transition-all duration-300">
          More About Us <span className="text-lg">→</span>
        </button> */}
        <LiquidButton
          onClick={() => router.push("/contact")}
          className=""
          size="xl"
        >
          <span className="flex items-center justify-center gap-2">
            {/* Rocket Icon */}
            Get Started <FaRocket className="w-4 h-4" />
          </span>
        </LiquidButton>
      </div>

      {/* Right Image */}
      <div className="fade-right relative lg:w-1/2 flex justify-center items-center">
        <div className="relative">
          <div className="absolute -bottom-3 -right-3 w-full h-full border-12 border-orange-500 rounded-sm z-0"></div>
          <Image
            src="https://images.pexels.com/photos/7333995/pexels-photo-7333995.jpeg"
            alt="Architect Worker"
            width={550}
            height={550}
            className="relative z-10 object-cover rounded-sm"
            priority
          />
        </div>
      </div>
    </section>
  );
}
