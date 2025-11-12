"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function StickyShowcase() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for side phones
      gsap.utils.toArray<HTMLElement>(".phone-anim").forEach((phone, i) => {
        gsap.to(phone, {
          y: i === 2 ? -40 : -40, // center phone moves less, sides move more
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".showcase-section",
            start: "top top",
            end: "center 30%",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="showcase-section  relative w-full min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Top content */}
      <div className="sticky top-0 z-10 flex flex-col items-center text-center px-4">
        {/* Icon on top */}
        <div className="md:mt-24 mt-24">
          {/* <ShieldCheck className="w-12 h-12 text-blue-600" /> */}
        </div>

        <h1 className="text-4xl md:py-4 md:mt-0 mt-20 text-black max-w-2xl md:text-7xl font-bold">
          Build a remarkable brand experience
        </h1>
        <p className="text-gray-600 mt-2">
          Design, launch, and grow with Maven.{" "}
        </p>

        {/* Main Button */}
        <button className="mt-6 px-6 py-4 bg-blue-600 text-white rounded-md font-medium text-lg">
          Get Started
        </button>
      </div>

      {/* Phones Showcase */}
      <div className="relative py-20 ">
        <div className="flex justify-center  items-end gap-6 flex-nowrap -mx-[40px] sm:-mx-[60px] md:-mx-[80px] lg:-mx-[100px]">
          {/* Phone 1 - lower */}
          <PhoneMockup
            screen="https://picsum.photos/400/800?random=1"
            className="phone-anim translate-y-36  hidden sm:block"
          />
          {/* Phone 2 - slightly higher */}
          <PhoneMockup
            screen="https://picsum.photos/400/800?random=2"
            className="phone-anim translate-y-24"
          />
          {/* Phone 3 - center big */}
          <PhoneMockup
            screen="https://picsum.photos/400/800?random=3"
            className="phone-anim scale-110 z-10"
          />
          {/* Phone 4 - slightly higher */}
          <PhoneMockup
            screen="https://picsum.photos/400/800?random=4"
            className="phone-anim translate-y-24"
          />
          {/* Phone 5 - lower */}
          <PhoneMockup
            screen="https://picsum.photos/400/800?random=5"
            className="phone-anim translate-y-36 hidden sm:block"
          />
        </div>
      </div>
    </section>
  );
}

/* -----------------
   Phone Mockup Component (responsive)
------------------- */
type PhoneMockupProps = {
  screen: string;
  className?: string;
};

function PhoneMockup({ screen, className }: PhoneMockupProps) {
  return (
    <div
      className={`relative 
        w-[160px] h-[320px]      // mobile
        sm:w-[200px] sm:h-[400px]
        md:w-[240px] md:h-[480px]
        lg:w-[260px] lg:h-[520px]
        xl:w-[280px] xl:h-[560px]
        ${className || ""}`}
    >
      {/* Screen image */}
      <Image
        src={screen}
        alt="screen"
        fill
        className="object-cover  rounded-[2rem] px-[12px] pt-[10px] pb-[12px]"
      />
      {/* iPhone frame */}
      <Image
        src="/assets/mobileimages/H2xOBKfRU2M06U4j9LF5WN8z6pA.avif"
        alt="frame"
        fill
        className="pointer-events-none  select-none"
      />
    </div>
  );
}
