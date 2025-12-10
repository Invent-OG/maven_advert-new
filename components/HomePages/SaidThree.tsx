"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SaidThree() {
  const phoneRefs = useRef<HTMLDivElement[]>([]);

  /* 
   AOS initialized globally
  */

  // GSAP PHONE ANIMATION (same as MemberShip)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const phones = phoneRefs.current.filter(Boolean);

      phones.forEach((phone, i) => {
        gsap.to(phone, {
          y: -120 - i * 40,
          ease: "power1.out",
          scrollTrigger: {
            trigger: phone,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative max-w-7xl  min-h-screen mx-auto flex flex-col md:flex-row items-center justify-center py-16 md:py-24 overflow-hidden">
      {/* LEFT — TEXT CONTENT (unchanged) */}
      <div
        data-aos="fade-right"
        className="flex-1 flex flex-col justify-center items-start 
        text-start md:text-left p-4 sm:p-8  
        order-2 md:order-1 space-y-6"
      >
        <h2
          className="text-4xl 
    md:text-7xl 
    lg:text-8xl 
      font-medium
      tracking-tighter
    px-4
    text-neutral-900 "
        >
          Make your personal site now.
        </h2>

        <p className="text-lg text-neutral-600   px-4 sm:text-base md:text-lg  leading-relaxed">
          MavenAdvert has partnered with MemberSpace to help you sell members
          only content on your site. Build a thriving community and unlock
          exclusive access for your members.
        </p>
      </div>

      {/* RIGHT — STACKED PHONES WITH ANIMATION */}
      <div
        data-aos="fade-left"
        className="flex-1 flex justify-center inline-block items-start relative 
        order-1 md:order-2 pb-10 pt-12 md:pt-0"
      >
        <div className="relative flex justify-center items-end right-[40px] md:right-[0px]">
          {/* PHONE 1 */}
          <PhoneMockup
            ref={(el) => {
              if (el) phoneRefs.current[0] = el;
            }}
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/phone1_ujwx3x"
            className="phone-anim relative z-0 left-[110px] top-[100px]"
          />

          {/* PHONE 2 */}
          <PhoneMockup
            ref={(el) => {
              if (el) phoneRefs.current[1] = el;
            }}
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/phone2_wqfevl"
            className="phone-anim relative z-10 top-[180px] right-[20px] md:right-[100px] translate-y-[60px]"
          />
        </div>
      </div>
    </section>
  );
}

/* -----------------
   PHONE MOCKUP (same sizes as MemberShip)
------------------- */

type PhoneMockupProps = {
  screen: string;
  className?: string;
};

const PhoneMockup = React.forwardRef<HTMLDivElement, PhoneMockupProps>(
  ({ screen, className }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative 
          w-[220px] h-[440px]
          sm:w-[240px] sm:h-[480px]
          md:w-[300px] md:h-[600px]
          lg:w-[330px] lg:h-[660px]
          xl:w-[360px] xl:h-[720px]
          ${className || ""}`}
      >
        {/* PHONE SCREEN */}
        <Image
          src={screen}
          alt="phone"
          fill
          className="object-cover rounded-[2rem] px-[12px] pt-[10px] pb-[12px]"
        />
      </div>
    );
  }
);

PhoneMockup.displayName = "PhoneMockup";
