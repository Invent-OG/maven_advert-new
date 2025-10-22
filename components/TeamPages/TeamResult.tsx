"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TeamResult() {
  const valueRef = useRef(null);
  const globalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      valueRef.current,
      { width: "0%" },
      { width: "90%", duration: 1.8, ease: "power2.out", delay: 0.4 }
    );
    gsap.fromTo(
      globalRef.current,
      { width: "0%" },
      { width: "75%", duration: 1.8, ease: "power2.out", delay: 0.6 }
    );
  }, []);

  return (
    <section className="w-full bg-white py-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Text Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
            We&apos;ve amazing skills
            <br /> for marketing agency.
          </h2>
        </div>

        {/* Right Progress Bars */}
        <div className="space-y-8">
          {/* Value for results */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-900 font-medium text-lg">
                Value for results
              </span>
              <div className="bg-[#21222c] text-white text-sm font-semibold px-2 py-1 rounded">
                90%
              </div>
            </div>
            <div className="relative w-full h-[5px] bg-gray-200 rounded-full">
              <div
                ref={valueRef}
                className="absolute left-0 top-0 h-[5px] bg-[#f15d2a] rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>

          {/* Global experience */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-900 font-medium text-lg">
                Global experience
              </span>
              <div className="bg-[#21222c] text-white text-sm font-semibold px-2 py-1 rounded">
                75%
              </div>
            </div>
            <div className="relative w-full h-[5px] bg-gray-200 rounded-full">
              <div
                ref={globalRef}
                className="absolute left-0 top-0 h-[5px] bg-[#f15d2a] rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
