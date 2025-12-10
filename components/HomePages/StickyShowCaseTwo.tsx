"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function StickyShowCaseTwo() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for center phone
      gsap.to(".phone-center", {
        y: -40,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".showcase-section",
          start: "top top",
          end: "center 30%",
          scrub: true,
        },
      });

      // Animate left images
      gsap.utils.toArray<HTMLElement>(".left-img").forEach((img) => {
        gsap.fromTo(
          img,
          { x: -200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "bottom 65%",
              scrub: true,
            },
          }
        );
      });

      // Animate right images
      gsap.utils.toArray<HTMLElement>(".right-img").forEach((img) => {
        gsap.fromTo(
          img,
          { x: 200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              end: "bottom 65%",
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="showcase-section relative w-full min-h-screen p-10  overflow-hidden"
      >
        <h2
          className=" text-4xl 
    md:text-7xl 
    lg:text-8xl 
      font-medium
      tracking-tighter
    mb-4
    text-neutral-900  text-center"
        >
          Elevate Every <br /> Digital Move
        </h2>
        <p className="text-center text-neutral-700 text-sm sm:text-base tracking-tight md:text-base lg:text-base mb-8 max-w-sm mx-auto px-4 sm:px-0">
          Maven Advert gives you powerful solutions to build, market, and scale
          effortlessly. Unlock your potential, execute your vision, and grow
          with impact.
        </p>
        <div className="relative py-16 flex justify-center items-center gap-4 sm:gap-6">
          {/* Left images */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <SideImage
              src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646866/Assets-05_gjjsbh.jpg"
              className="left-img -rotate-12"
            />
            <SideImage
              src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646864/Assets-03_jli8b0.jpg"
              className="left-img rotate-12"
            />
            <SideImage
              src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646862/Assets-04_dqhuiu.jpg"
              className="left-img -rotate-12"
            />
          </div>

          {/* Center phone mockup */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646746/2_single_phone_p6vyuf.png"
            className="phone-center scale-120 z-10 mx-4 sm:mx-6 md:mx-10"
          />

          {/* Right images */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <SideImage
              src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646860/Assets-02_vr96l1.jpg"
              className="right-img rotate-12"
            />
            <SideImage
              src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646858/Assets-06_noluho.jpg"
              className="right-img -rotate-12"
            />
            <SideImage
              src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646856/Assets-01_nh1xi9.jpg"
              className="right-img rotate-12"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* -----------------
   Phone Mockup (center)
------------------- */
type PhoneMockupProps = {
  screen: string;
  className?: string;
};

function PhoneMockup({ screen, className }: PhoneMockupProps) {
  return (
    <div
      className={`relative 
        w-[200px] h-[200px] 
        sm:w-[220px] sm:h-[440px] 
        md:w-[240px] md:h-[460px] 
        lg:w-[260px] lg:h-[520px] 
        xl:w-[280px] xl:h-[560px] 
        min-w-[180px] min-h-[360px] 
        ${className || ""}`}
    >
      {/* Screen (inside frame, inset applied) */}
      <Image
        src={screen}
        alt="screen"
        fill
        className="object-cover rounded-[1.8rem] z-0"
        style={{
          top: "10px",
          bottom: "12px",
          left: "2px",
          right: "12px",
        }}
      />
    </div>
  );
}

/* -----------------
   Side Images (no frame)
------------------- */
type SideImageProps = {
  src: string;
  className?: string;
};

function SideImage({ src, className }: SideImageProps) {
  return (
    <div
      className={`relative 
        w-[160px] h-[120px] 
        sm:w-[180px] sm:h-[140px] 
        md:w-[200px] md:h-[160px] 
        lg:w-[220px] lg:h-[180px] 
        xl:w-[240px] xl:h-[200px] 
        rounded-2xl overflow-hidden shadow-lg ${className || ""}`}
    >
      <Image src={src} alt="side" fill className="object-contain bg-white" />
    </div>
  );
}
