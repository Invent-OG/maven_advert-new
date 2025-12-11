"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { FaBullhorn, FaRocket } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { LiquidButton } from "../ui/liquid-glass-button";
import { useRouter } from "next/navigation";

function ServicesMainPlan() {
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Smooth up & down animation for smaller image
  useEffect(() => {
    if (floatingRef.current) {
      gsap.to(floatingRef.current, {
        y: -20,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <>
      <section className="bg-white py-24 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-20">
        {/* LEFT SIDE */}
        <div data-aos="fade-down" className="w-full md:w-1/2">
          {/* Subtitle */}
          <p className="text-orange-500 uppercase font-semibold tracking-widest mb-3">
            Strategic Growth Roadmap{" "}
          </p>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-10 leading-none">
            Discover how we <br /> drive brand success
          </h2>

          {/* Steps */}
          <div className="relative flex flex-col gap-">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-gray-800 font-semibold">
                  01
                </div>
                <div className="w-[2px] h-16 bg-gray-200"></div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  Analyzing the Market
                </h4>
                <p className="text-gray-500 text-lg leading-relaxed">
                  We study your industry, competitors, <br /> and audience to
                  uncover opportunities and define clear objectives
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-50 text-black rounded-full flex items-center justify-center font-semibold">
                  02
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  Designing the Strategy
                </h4>
                <p className="text-gray-500 text-lg leading-relaxed">
                  We craft an integrated plan that combines digital solutions
                  and engagement tactics for measurable results
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-6 mt-12">
            {/* <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md text-sm font-medium transition-all duration-300">
              How it works →
            </button> */}
            <LiquidButton
              onClick={() => router.push("/contact")}
              className=""
              size="xl"
            >
              <span className="flex items-center gap-2">How it works →</span>
            </LiquidButton>

            <button className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-orange-500 transition">
              ▶  Play video
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          data-aos="fade-up"
          className="w-full md:w-1/2 relative flex justify-center items-center"
        >
          {/* Large Image */}
          <div className="relative w-[360px] md:w-[420px] lg:w-[460px]">
            <Image
              src="https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/demo-marketing-home-06.jpg.webp"
              alt="Marketing process main image"
              width={460}
              height={500}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>

          {/* Floating small image */}
          <div
            ref={floatingRef}
            className="absolute bottom-0 right-0 w-[180px] md:w-[200px] translate-x-8 translate-y-8"
          >
            <Image
              src="https://crafto.themezaa.com/marketing/wp-content/uploads/sites/10/2023/11/demo-marketing-home-07.jpg.webp"
              alt="Marketing analytics floating image"
              width={200}
              height={150}
              className="rounded-xl shadow-xl object-cover"
            />
          </div>
        </div>
      </section>
      <p className="text-lg font-bold text-center flex items-center justify-center gap-2">
        <FaBullhorn className="text-orange-500 text-2xl" />
        We provide quality marketing services to customers
      </p>
    </>
  );
}

export default ServicesMainPlan;
