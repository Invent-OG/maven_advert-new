"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function StickyShowCaseTwo() {
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
      <section className="showcase-section relative w-full min-h-screen p-10  overflow-hidden">
        <h1 className=" text-4xl text-neutral-900 md:text-7xl font-bold text-center">
          Elevate Every <br /> Digital Move
        </h1>
        <p className="text-center md:text-sm text-gray-600 mt-4 mb-8 max-w-sm mx-auto px-4 sm:px-0 leading-relaxed">
          Maven Advert gives you powerful solutions to build, market, and scale
          effortlessly. Unlock your potential, execute your vision, and grow
          with impact.
        </p>
        <div className="relative py-16 flex justify-center items-center gap-4 sm:gap-6">
          {/* Left images */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <SideImage
              src="https://framerusercontent.com/images/yXQTefuZSquJukQGCEdJtRYAGY.jpg?scale-down-to=1024"
              className="left-img -rotate-12"
            />
            <SideImage
              src="https://framerusercontent.com/images/PNnKht5fkykv5VpkXq45bRjfhGk.jpg?scale-down-to=1024"
              className="left-img rotate-12"
            />
            <SideImage
              src="https://framerusercontent.com/images/q3i7KD0X92kfWz1q2P04yM3Xo.jpg?scale-down-to=512"
              className="left-img -rotate-12"
            />
          </div>

          {/* Center phone mockup */}
          <PhoneMockup
            screen="https://framerusercontent.com/images/3uePkZoyUfBUEH6sP13baAlRo0.jpg?scale-down-to=512"
            className="phone-center scale-110 z-10 mx-4 sm:mx-6 md:mx-10"
          />

          {/* Right images */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <SideImage
              src="https://framerusercontent.com/images/g0DwN5mvHLQB8kirz2aWP8ex9PU.jpg?scale-down-to=512"
              className="right-img rotate-12"
            />
            <SideImage
              src="https://framerusercontent.com/images/PNnKht5fkykv5VpkXq45bRjfhGk.jpg?scale-down-to=1024"
              className="right-img -rotate-12"
            />
            <SideImage
              src="https://framerusercontent.com/images/yXQTefuZSquJukQGCEdJtRYAGY.jpg?scale-down-to=1024"
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

      {/* Frame always above */}
      <Image
        src="/assets/mobileimages/H2xOBKfRU2M06U4j9LF5WN8z6pA.avif"
        alt="frame"
        fill
        className="pointer-events-none select-none z-10"
        priority
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
      <Image src={src} alt="side" fill className="object-cover bg-white" />
    </div>
  );
}
