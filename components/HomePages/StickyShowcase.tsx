"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import AnimatedButton from "../ui/AnimatedButton";
import { useRouter } from "next/navigation";
import { LiquidButton, MetalButton } from "../ui/liquid-glass-button";

gsap.registerPlugin(ScrollTrigger);

export default function StickyShowcase() {
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for side phones
      gsap.utils.toArray<HTMLElement>(".phone-anim").forEach((phone, i) => {
        gsap.to(phone, {
          y: i === 2 ? -40 : -40,
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
    <section className="showcase-section relative w-full min-h-screen bg-gradient-to-b from-white to-orange-50 overflow-hidden">
      {/* Top content */}
      <div className="sticky top-0 z-10 flex flex-col items-center text-center px-4">
        <div className="md:mt-24 mt-24"></div>

        <h1
          className="
          
    text-4xl 
    md:text-7xl 
    lg:text-8xl 
    font-extrabold 
    text-neutral-900 
    leading-[1.05]
    tracking-tight
    md:py-4 
    mt-20 md:mt-0 
    md:max-w-4xl
drop-shadow-[0_16px_5px_rgba(0,0,0,0.35)] shadow-black/10
  "
        >
          Build a Remarkable Brand Experience
        </h1>

        <p className="text-neutral-900 font-medium mt-2 mb-6">
          Design, Launch, and grow with Maven.
        </p>

        <LiquidButton
          onClick={() => router.push("/contact")}
          className="mt-6"
          size="xl"
        >
          Get Started
        </LiquidButton>
      </div>

      {/* Phones Showcase */}
      <div className="relative py-20">
        <div className="flex justify-center items-end gap-6 flex-nowrap -mx-[40px] sm:-mx-[60px] md:-mx-[80px] lg:-mx-[100px]">
          {/* Phone 1 */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/Social_media_nz1xs1"
            className="phone-anim translate-y-36 hidden sm:block"
          />

          {/* Phone 2 */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/website_pcfebi"
            className="phone-anim translate-y-24"
          />

          {/* Phone 3 */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/main_banner_iz3zq5"
            className="phone-anim scale-110 z-10"
          />

          {/* Phone 4 */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/whats_app_jwltrs"
            className="phone-anim translate-y-24"
          />

          {/* Phone 5 */}
          <PhoneMockup
            screen="https://res.cloudinary.com/dr9gcshs6/image/upload/E_commerce_bxapmz"
            className="phone-anim translate-y-36 hidden sm:block"
          />
        </div>
      </div>
    </section>
  );
}

/* -----------------
   Phone Mockup Component (NO FRAME)
------------------- */
type PhoneMockupProps = {
  screen: string;
  className?: string;
};

function PhoneMockup({ screen, className }: PhoneMockupProps) {
  return (
    <div
      className={`relative 
    w-[180px] h-[340px]             // mobile
    sm:w-[200px] sm:h-[400px]       // small devices
    md:w-[260px] md:h-[500px]       // increased width
    lg:w-[300px] lg:h-[560px]       // increased width
    xl:w-[330px] xl:h-[620px]       // increased width
    ${className || " "}`}
    >
      {/* ONLY SCREEN IMAGE */}
      <Image
        src={screen}
        alt="screen"
        fill
        className="object-cover  rounded-[2rem]"
      />
    </div>
  );
}
