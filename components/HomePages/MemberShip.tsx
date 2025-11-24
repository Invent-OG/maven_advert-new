"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { LiquidButton } from "../ui/liquid-glass-button";
import { useRouter } from "next/navigation";

export default function MemberShip() {
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    gsap.from(textRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(imgRef.current, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  return (
    <section className="w-full min-h-screen bg-white flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 py-0 gap-6">
      {/* LEFT SIDE CONTENT */}
      <div ref={textRef} className="w-full md:w-1/2">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
          Automate <br /> Your Digital <br /> Workflow.
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-md">
          Seamlessly connect WhatsApp, CRM, and analytics tools to manage leads,
          nurture customers, and scale smarter.
        </p>

        {/* <button className="mt-8 px-8 py-4 bg-black text-white rounded-full text-lg font-medium hover:opacity-80 transition">
          Get Started
        </button> */}
        <LiquidButton
          onClick={() => router.push("/contact")}
          className="mt-6"
          size="xl"
        >
          Get Started
        </LiquidButton>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div
        ref={imgRef}
        className="w-full md:w-1/2 flex items-center justify-center"
      >
        <Image
          src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763646705/responsive_copy_qpquw8.png"
          alt="Workflow Image"
          width={1800}
          height={1800}
          priority
          className="
            object-contain 
            w-full 
            md:max-w-[750px]   /* large on desktop */
            max-h-[600px]
            mb-6
          "
        />
      </div>
    </section>
  );
}
