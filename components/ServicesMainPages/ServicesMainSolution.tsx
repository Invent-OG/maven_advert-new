"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { gsap } from "gsap";

function ServicesMainSolution() {
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the small image gently up and down
    if (floatingRef.current) {
      gsap.to(floatingRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <section className="relative w-full bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 md:px-12">
        {/* ---------- LEFT IMAGE SECTION ---------- */}
        <div className="relative flex-1 flex justify-center">
          {/* Main image */}
          <Image
            src="https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/demo-marketing-services-02.jpg.webp"
            alt="Promote Your Business"
            width={600}
            height={500}
            className="rounded-lg object-contain z-10"
            priority
          />

          {/* Floating small image */}
          <div
            ref={floatingRef}
            className="absolute bottom-[-10px] left-[50px] md:left-[80px] w-[220px] md:w-[280px] z-20"
          >
            <Image
              src="https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/demo-marketing-services-03.png.webp"
              alt="Floating stats"
              width={280}
              height={180}
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Decorative gradient arrow shape (optional) */}
          <div className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 w-[120px] h-[40px] bg-gradient-to-r from-orange-500 to-red-400 rotate-[-20deg] rounded-lg opacity-80 hidden md:block"></div>
        </div>

        {/* ---------- RIGHT CONTENT SECTION ---------- */}
        <div className="flex-1">
          <p className="text-orange-500 uppercase font-semibold text-sm tracking-wide mb-3">
            Our Highly Expertise{" "}
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Innovative & <br /> elevate your brand
          </h2>

          <div className="space-y-6 mb-10 ">
            {/* Feature 1 */}
            <div className="flex items-start  gap-3">
              <div className="bg-orange-100 p-5 rounded-full flex-shrink-0">
                <FaCheck className="text-orange-500 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-xl">
                  Brand Identity Crafting{" "}
                </h4>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Transforming logos, visuals, and messaging into a cohesive
                  brand language that drives recognition and audience
                  engagement.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 p-5 rounded-full flex-shrink-0">
                <FaCheck className="text-orange-500 text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-xl">
                  Visual Storytelling & Production{" "}
                </h4>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Creating corporate films, brand shoots, and multimedia content
                  that amplifies your brand’s impact and connects with your
                  audience.
                </p>
              </div>
            </div>
          </div>

          {/* ---------- BUTTONS ---------- */}
          <div className="flex flex-wrap px-4 gap-4">
            <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition flex items-center gap-2">
              Case studies →
            </button>
            <button className="text-gray-900 font-medium flex items-center gap-2 hover:text-orange-500 transition">
              How it works →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesMainSolution;
